package de.adorsys.psd2.sandbox.admin.rest.server.service;

import de.adorsys.ledgers.middleware.api.domain.um.UserRoleTO;
import de.adorsys.ledgers.middleware.api.domain.um.UserTO;
import de.adorsys.ledgers.middleware.client.rest.UserMgmtRestClient;
import de.adorsys.psd2.sandbox.admin.rest.api.domain.BankCodeStructure;
import de.adorsys.psd2.sandbox.admin.rest.server.exception.AdminException;
import de.adorsys.psd2.sandbox.admin.rest.server.model.TppData;
import lombok.RequiredArgsConstructor;
import org.iban4j.CountryCode;
import org.iban4j.Iban;
import org.iban4j.bban.BbanStructure;
import org.iban4j.bban.BbanStructureEntry;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.EnumMap;
import java.util.List;
import java.util.Map;

import static java.util.Objects.requireNonNull;
import static org.iban4j.CountryCode.*;
import static org.iban4j.bban.BbanEntryType.account_number;

@Service
@RequiredArgsConstructor
public class IbanGenerationService {
    private static final List<CountryCode> COUNTRY_CODES = Arrays.asList(AD, AL, AT, BE, BG, CH, CY, CZ, DE, DK, EE, ES, FI, FR, GB, GL, GR, HR, HU, IE, IL, IS, IT, LI, LT, LU, LV, MC, MD, MK, MT, NL, NO, PL, PT, RO, RS, SE, SI, SK, UA, VG, XK);

    private final UserMgmtRestClient userMgmtRestClient;

    public String generateNextIban(String tppId) {
        TppData data = getTppData(tppId);
        return generateIban(data.getCountryCode(), data.getBranchId(), data.getNextAccountNumber());
    }

    public Map<CountryCode, String> getCountryCodes() {
        Map<CountryCode, String> codes = new EnumMap<>(CountryCode.class);
        COUNTRY_CODES.forEach(c -> codes.put(c, c.getName()));
        return TppData.sortMapByValue(codes);
    }

    public BankCodeStructure getBankCodeStructure(CountryCode code) {
        return new BankCodeStructure(code);
    }

    private String generateIban(CountryCode countryCode, String bankCode, long accountNr) {
        int accountNumberLength = BbanStructure.forCountry(countryCode).getEntries().stream()
                                      .filter(e -> e.getEntryType().equals(account_number))
                                      .findFirst()
                                      .map(BbanStructureEntry::getLength)
                                      .orElse(0);
        String formatParam = "%0" + accountNumberLength + "d";
        String accountNumber = String.format(formatParam, accountNr);
        return new Iban.Builder()
                   .countryCode(countryCode)
                   .bankCode(bankCode)
                   .accountNumber(accountNumber)
                   .buildRandom()
                   .toString();
    }

    private TppData getTppData(String tppId) {
        UserTO user = userMgmtRestClient.getUserById(tppId).getBody();
        if (!requireNonNull(user).getUserRoles().contains(UserRoleTO.STAFF)) {
            throw new AdminException("You're trying to generate Iban out of Tpp range", 400);
        }
        return new TppData(user);
    }
}

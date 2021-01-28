package de.adorsys.ledgers.oba.service.api.service;

import de.adorsys.ledgers.middleware.api.domain.sca.GlobalScaResponseTO;
import de.adorsys.ledgers.middleware.api.domain.sca.OpTypeTO;
import de.adorsys.ledgers.middleware.api.domain.sca.SCAResponseTO;

import java.io.IOException;

public interface CmsAspspConsentDataService {
    /**
     * @deprecated shall be removed in v 5.6
     */
    @Deprecated(forRemoval = true, since = "v.5.6")
    GlobalScaResponseTO fromBytes(byte[] tokenBytes) throws IOException;

    <T> String toBase64String(T response);

    <T extends SCAResponseTO> GlobalScaResponseTO mapToGlobalResponse(T source, OpTypeTO type);

    int updateLoginFailedCount(String encryptedId);

    boolean isFailedLogin(String encryptedId);
}

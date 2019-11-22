import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { AccountDetailsTO } from '../../api/models/account-details-to';
import { ObaAisConsent } from '../../api/models/oba-ais-consent';
import { TransactionTO } from '../../api/models/transaction-to';
import { OnlineBankingAccountInformationService } from '../../api/services/online-banking-account-information.service';
import { OnlineBankingAuthorizationService } from '../../api/services/online-banking-authorization.service';
import { OnlineBankingConsentsService } from '../../api/services/online-banking-consents.service';
import { AuthService } from './auth.service';
import {CustomPageImplTransactionTO} from "../../api/models/custom-page-impl-transaction-to";

@Injectable({
    providedIn: 'root'
})
export class OnlineBankingService {

    constructor(private authService: AuthService,
                private onlineBankingAccountInfoService: OnlineBankingAccountInformationService,
                private onlineBankingAuthorizationService: OnlineBankingAuthorizationService,
                private onlineBankingConsentService: OnlineBankingConsentsService) {
    }

    /*****
     *
     * Online banking account infos
     * **/
    public getAccounts(userLogin?: string): Observable<AccountDetailsTO[]> {
        const login = userLogin ? userLogin : this.authService.getAuthorizedUser();
        return this.onlineBankingAccountInfoService.accountsUsingGET(login);
    }

    public getAccount(accountID: string): Observable<AccountDetailsTO> {
        return this.onlineBankingAccountInfoService.accountUsingGET(accountID);
    }

    public getTransactions(params: OnlineBankingAccountInformationService.TransactionsUsingGETParams): Observable<CustomPageImplTransactionTO> {
        return this.onlineBankingAccountInfoService.transactionsUsingGET(params);
    }

    /***
     * Online banking consents
     * */
    public getConsents(userLogin?: string): Observable<ObaAisConsent[]> {
        const login = userLogin ? userLogin : this.authService.getAuthorizedUser();
        return this.onlineBankingConsentService.consentsUsingGET(login);
    }

    public revokeConsent(consentId: string): Observable<boolean> {
        return this.onlineBankingConsentService.revokeConsentUsingPUT(consentId);
    }
}

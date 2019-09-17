import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { map } from 'rxjs/operators';

import { InfoService } from '../../commons/info/info.service';
import { Account } from '../../models/account.model';
import { AccountService } from '../../services/account.service';
import { TppService } from '../../services/tpp.service';

@Component({
    selector: 'app-account',
    templateUrl: './account.component.html',
    styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {

    account: Account;
    accountID: string;

    constructor(
        private accountService: AccountService,
        private tppService: TppService,
        private activatedRoute: ActivatedRoute,
        private infoService: InfoService,
        private router: Router,
        private modalService: NgbModal) {
    }

    ngOnInit() {
        this.activatedRoute.params
            .pipe(
                map(response => {
                    return response.id;
                })
            )
            .subscribe((accountID: string) => {
                this.accountID = accountID;
                this.getAccount();
            });
    }

    public goToAccountDetail() {
        if (this.isAccountDeleted) {
            this.infoService.openFeedback('You can not Grant Accesses to a Deleted/Blocked account', {
                severity: 'error'
            });
        } else {
            this.router.navigate(['/accounts/' + this.account.id + '/access']);
        }
    }

    deleteAccount() {
        this.tppService.deleteAccount(this.account.iban).subscribe(() => {
            this.router.navigate(['/accounts']);
        });
    }

    openDeleteConfirmation(content) {
        this.modalService.open(content).result.then(() => {
            this.deleteAccount();
        }, () => {});
    }

    get isAccountDeleted(): boolean {
        return this.account.accountStatus === 'DELETED' || this.account.accountStatus === 'BLOCKED';
    }

    getAccount() {
        this.accountService.getAccount(this.accountID)
            .subscribe((account: Account) => {
                this.account = account;
            });
    }
}

import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AisRoutingModule} from './ais-routing.module';
import {LoginComponent} from './login/login.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {GrantConsentComponent} from './grant-consent/grant-consent.component';
import {AccountDetailsComponent} from './account-details/account-details.component';
import {SelectScaComponent} from './select-sca/select-sca.component';
import {ResultPageComponent} from './result-page/result-page.component';
import {TanConfirmationComponent} from './tan-confirmation/tan-confirmation.component';
import {NotFoundComponent} from "../not-found/not-found.component";

@NgModule({
  declarations: [
    LoginComponent,
    GrantConsentComponent,
    AccountDetailsComponent,
    SelectScaComponent,
    ResultPageComponent,
    TanConfirmationComponent,
    NotFoundComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    AisRoutingModule
  ]
})
export class AisModule { }

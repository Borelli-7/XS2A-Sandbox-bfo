/*
 * Copyright 2018-2024 adorsys GmbH & Co KG
 *
 * This program is free software: you can redistribute it and/or modify it
 * under the terms of the GNU Affero General Public License as published
 * by the Free Software Foundation, either version 3 of the License, or (at
 * your option) any later version. This program is distributed in the hope that
 * it will be useful, but WITHOUT ANY WARRANTY; without even the implied
 * warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.
 * See the GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program. If not, see https://www.gnu.org/licenses/.
 *
 * This project is also available under a separate commercial license. You can
 * contact us at sales@adorsys.com.
 */

import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { APP_INITIALIZER, ErrorHandler, NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModalModule, NgbPaginationModule, NgbTypeaheadModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgHttpLoaderModule } from 'ng-http-loader';
import { FileUploadModule } from 'ng2-file-upload';
import { FilterPipeModule } from 'ngx-filter-pipe';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DocumentUploadComponent } from './commons/document-upload/document-upload.component';
import { FooterComponent } from './commons/footer/footer.component';
import { IconModule } from './commons/icon/icon.module';
import { InfoModule } from './commons/info/info.module';
import { NavbarComponent } from './commons/navbar/navbar.component';
import { SidebarComponent } from './commons/sidebar/sidebar.component';
import { AccountAccessManagementComponent } from './components/account-access-management/account-access-management.component';
import { AccountDetailComponent } from './components/account-detail/account-detail.component';
import { AccountListComponent } from './components/account-list/account-list.component';
import { AccountComponent } from './components/account/account.component';
import { CertificateComponent } from './components/auth/certificate/certificate.component';
import { ConfirmNewPasswordComponent } from './components/auth/confirm-new-password/confirm-new-password.component';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { ResetPasswordComponent } from './components/auth/reset-password/reset-password.component';
import { CashDepositComponent } from './components/cash-deposit/cash-deposit.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { TestDataGenerationComponent } from './components/testDataGeneration/test-data-generation.component';
import { UserProfileUpdateComponent } from './components/user-profile-update/user-profile-update.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { UserCreateComponent } from './components/users/user-create/user-create.component';
import { UserDetailsComponent } from './components/users/user-details/user-details.component';
import { UserUpdateComponent } from './components/users/user-update/user-update.component';
import { UsersComponent } from './components/users/users.component';
import { AdminsComponent } from './components/admin/admins.component';
import { AuthGuard } from './guards/auth.guard';
import { AuthInterceptor } from './interceptors/auth-interceptor';
import { GlobalErrorsHandler } from './interceptors/global-errors-handler';
import { ConvertBalancePipe } from './pipes/convertBalance.pipe';
import { AutoLogoutService } from './services/auto-logout.service';
import { SettingsHttpService } from './services/settings-http.service';
import { UploadFileComponent } from './uploadFile/uploadFile.component';
import { PaginationContainerComponent } from './commons/pagination-container/pagination-container.component';
import { TppsComponent } from './components/tpps/tpps.component';
import { AdminCreateComponent } from './components/admin/admin-create/admin-create.component';
import { ModalComponent } from './components/modal/modal.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { TypeaheadModule } from 'ngx-bootstrap/typeahead';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { NgxsModule } from '@ngxs/store';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';
import { RecoveryPointState } from './state/recoverypoints.state';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { UserCreateFundsConfirmationComponent } from './components/users/user-create-funds-confirmation/user-create-funds-confirmation.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatDialogModule } from '@angular/material/dialog';
import { ErrorDialogComponent } from './commons/dialog/error-dialog.component';
import { UserFundsConfirmationDetailsComponent } from './components/users/user-funds-confirmation-details/user-funds-confirmation-details.component';

export function app_Init(settingsHttpService: SettingsHttpService) {
  return () => settingsHttpService.initializeApp();
}

@NgModule({
    declarations: [
        AppComponent,
        NavbarComponent,
        SidebarComponent,
        FooterComponent,
        DashboardComponent,
        LoginComponent,
        RegisterComponent,
        AccountListComponent,
        AccountDetailComponent,
        NotFoundComponent,
        CashDepositComponent,
        AdminsComponent,
        AdminCreateComponent,
        UsersComponent,
        UserDetailsComponent,
        UserCreateComponent,
        AccountComponent,
        UploadFileComponent,
        DocumentUploadComponent,
        TestDataGenerationComponent,
        AccountAccessManagementComponent,
        ResetPasswordComponent,
        ConfirmNewPasswordComponent,
        UserUpdateComponent,
        CertificateComponent,
        ConvertBalancePipe,
        UserProfileUpdateComponent,
        UserProfileComponent,
        PaginationContainerComponent,
        TppsComponent,
        ModalComponent,
        UserCreateFundsConfirmationComponent,
        ErrorDialogComponent,
        UserFundsConfirmationDetailsComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
        NgbTypeaheadModule,
        IconModule,
        InfoModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        FileUploadModule,
        FilterPipeModule,
        NgHttpLoaderModule.forRoot(),
        NgbModalModule,
        NgbPaginationModule,
        ModalModule.forRoot(),
        TypeaheadModule.forRoot(),
        NgxsModule.forRoot([RecoveryPointState]),
        NgxsReduxDevtoolsPluginModule.forRoot(),
        NgxsLoggerPluginModule.forRoot(),
        MatIconModule,
        MatButtonModule,
        MatTooltipModule,
        MatSnackBarModule,
        MatDialogModule,
        MatExpansionModule,
        NgbModule,
    ],
    providers: [
        AutoLogoutService,
        BsModalRef,
        AuthGuard,
        {
            provide: APP_INITIALIZER,
            useFactory: app_Init,
            deps: [SettingsHttpService],
            multi: true,
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthInterceptor,
            multi: true,
        },
        {
            provide: ErrorHandler,
            useClass: GlobalErrorsHandler,
        },
    ],
    bootstrap: [AppComponent],
    schemas: [ CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}

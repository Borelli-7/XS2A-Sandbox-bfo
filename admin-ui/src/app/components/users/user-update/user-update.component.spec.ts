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

import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { UserUpdateComponent } from './user-update.component';
import { UserService } from '../../../services/user.service';
import { Router } from '@angular/router';
import { UntypedFormArray, ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { User } from '../../../models/user.model';
import { RouterTestingModule } from '@angular/router/testing';
import { IconModule } from '@commons/icon/icon.module';
import { TppManagementService } from '../../../services/tpp-management.service';
import { InfoService } from '@commons/info/info.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { OverlayModule } from '@angular/cdk/overlay';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('UserUpdateComponent', () => {
  let component: UserUpdateComponent;
  let fixture: ComponentFixture<UserUpdateComponent>;
  let userService: UserService;
  let tppManagementService: TppManagementService;
  let router: Router;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [
          ReactiveFormsModule,
          RouterTestingModule.withRoutes([]),
          HttpClientTestingModule,
          IconModule,
          BrowserAnimationsModule,
          OverlayModule,
        ],
        providers: [UserService, TppManagementService, InfoService],
        declarations: [UserUpdateComponent],
        schemas: [NO_ERRORS_SCHEMA],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(UserUpdateComponent);
    component = fixture.componentInstance;
    userService = TestBed.inject(UserService);
    tppManagementService = TestBed.inject(TppManagementService);
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('submitted should false', () => {
    expect(component.submitted).toBeFalsy();
  });

  it('updateUserForm should be invalid when at least one field is empty', () => {
    expect(component.updateUserForm.valid).toBeFalsy();
  });

  it('email field validity', () => {
    let errors = {};
    const email = component.updateUserForm.controls['email'];
    expect(email.valid).toBeFalsy();

    // email field is required
    errors = email.errors || {};
    expect(errors['required']).toBeTruthy();

    // set email to something incorrect
    email.setValue('testtests.de');
    errors = email.errors || {};
    expect(errors['email']).toBeTruthy();

    // set email to something correct
    email.setValue('test@test.de');
    errors = email.errors || {};
    expect(errors['required']).toBeFalsy();
  });

  it('login field validity', () => {
    let errors = {};
    const login = component.updateUserForm.controls['login'];
    expect(login.valid).toBeFalsy();

    // login field is required
    errors = login.errors || {};
    expect(errors['required']).toBeTruthy();

    // set login to something correct
    login.setValue('test@test.de');
    errors = login.errors || {};
    expect(errors['required']).toBeFalsy();
  });

  it('validate addScaData method', () => {
    const length = (<UntypedFormArray>component.updateUserForm.controls['scaUserData'])
      .length;
    component.addScaDataItem();
    const newLength = (<UntypedFormArray>(
      component.updateUserForm.controls['scaUserData']
    )).length;
    expect(newLength).toEqual(length + 1);
  });

  it('validate removeScaDataItem method', () => {
    component.removeScaDataItem(0);
    const length = (<UntypedFormArray>component.updateUserForm.controls['scaUserData'])
      .length;
    expect(length).toEqual(0);
  });

  it('validate onSubmit method', () => {
    component.onSubmit();
    expect(component.submitted).toEqual(true);
    expect(component.updateUserForm.valid).toBeFalsy();
  });

  it('validate setupUserFormControl method', () => {
    component.setupUserFormControl();
    expect(component.updateUserForm).toBeDefined();
  });

  it('validate formControl method', () => {
    expect(component.formControl).toEqual(component.updateUserForm.controls);
  });

  it('should enable staticTan when useStaticTan is true', () => {
    const scaData = component.initScaData();
    scaData.get('usesStaticTan').setValue(true);
    const enabled = scaData.get('staticTan').enabled;
    expect(enabled).toBe(true);
  });

  it('should enable staticTan when useStaticTan is true', () => {
    const expectedValue = '';
    const scaData = component.initScaData();
    scaData.get('usesStaticTan').setValue(true);
    scaData.get('usesStaticTan').setValue(false);
    const disabled = scaData.get('staticTan').disabled;
    const value = scaData.get('staticTan').value;
    expect(disabled).toBe(true);
    expect(value).toBe(expectedValue);
  });

  it('should init scaUserDataFrom when user has saved scaUserData', () => {
    component.setupUserFormControl();
    const mockUser: User = {
      id: 'XXXXXX',
      email: 'tes@adorsys.de',
      login: 'bob',
      branch: '34256',
      pin: '12345',
      branchLogin: 'branchLogin',
      scaUserData: [
        {
          id: '01',
          scaMethod: '',
          methodValue: '',
          usesStaticTan: false,
          decoupled: false,
          valid: false,
        },
        {
          id: '02',
          scaMethod: '',
          methodValue: '',
          usesStaticTan: false,
          decoupled: false,
          valid: false,
        },
      ],
      accountAccesses: [],
    } as User;
    spyOn(userService, 'getUser').and.returnValue(of(mockUser));
    component.getUserDetails();
    const scaUserDataGroups = <UntypedFormArray>(
      component.updateUserForm.get('scaUserData')
    );
    const length = scaUserDataGroups.length;
    expect(length).toBe(2);
  });

  it('should load actual user and update its details', () => {
    const mockUser: User = {
      id: 'XXXXXX',
      email: 'tes@adorsys.de',
      login: 'bob',
      branch: '34256',
      pin: '12345',
      scaUserData: [],
      accountAccesses: [
        {
          accessType: 'OWNER',
          iban: 'FR87760700254556545403',
        },
      ],
    } as User;

    const getUserSpy = spyOn(userService, 'getUser').and.returnValue(
      of(mockUser)
    );

    component.ngOnInit();
    expect(component.submitted).toBeFalsy();
    expect(component.updateUserForm.valid).toBeTruthy();
    component.user = mockUser;
    component.userId = 'all';
    component.updateUserForm.get('email').setValue('dart.vader@dark-side.com');
    component.updateUserForm.get('login').setValue('dart.vader');

    const sampleResponse = { value: 'sample response' };
    const updateUserDetail = spyOn(
      tppManagementService,
      'updateUserDetails'
    ).and.callFake(() => of(sampleResponse));
    const navigateSpy = spyOn(router, 'navigate');
    component.onSubmit();
    const submittedUser = updateUserDetail.calls.argsFor(0)[0] as User;
    expect(submittedUser.email).toBe('dart.vader@dark-side.com');
    expect(submittedUser.accountAccesses).toEqual(mockUser.accountAccesses);
    expect(component.submitted).toBeTruthy();
    expect(component.updateUserForm.valid).toBeTruthy();
    expect(getUserSpy).toHaveBeenCalled();
    expect(component.user).toEqual(mockUser);
    expect(navigateSpy).toHaveBeenCalledWith(['/users/all']);
  });

  it('should defined getMethodsValues', () => {
    component.getMethodsValues();
    expect(component.methods).toEqual([
      'SMTP_OTP',
      'MOBILE',
      'CHIP_OTP',
      'PHOTO_OTP',
      'PUSH_OTP',
      'SMS_OTP',
      'APP_OTP',
    ]);
  });

  it('should back to users', () => {
    const navigateSpy = spyOn(router, 'navigate');
    component.userId = '123456';
    component.onCancel();
    expect(navigateSpy).toHaveBeenCalledWith(['/users/' + component.userId]);
  });
});

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

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { UntypedFormArray, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

import { IconModule } from '../../../commons/icon/icon.module';
import { InfoModule } from '../../../commons/info/info.module';
import { InfoService } from '../../../commons/info/info.service';
import { UserService } from '../../../services/user.service';
import { UserCreateComponent } from './user-create.component';
import { ScaMethods } from '../../../models/scaMethods';
import { of } from 'rxjs';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('UserCreateComponent', () => {
  let component: UserCreateComponent;
  let fixture: ComponentFixture<UserCreateComponent>;
  let userService: UserService;
  let router: Router;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, InfoModule, RouterTestingModule.withRoutes([]), HttpClientTestingModule, IconModule],
      providers: [UserService, InfoService],
      declarations: [UserCreateComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserCreateComponent);
    component = fixture.componentInstance;
    userService = TestBed.inject(UserService);
    router = TestBed.inject(Router);

    component.admin = 'false';
    component.setupUserFormControl();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('submitted should false', () => {
    expect(component.submitted).toBeFalsy();
  });

  it('userForm should be invalid when at least one field is empty', () => {
    expect(component.userForm.valid).toBeFalsy();
  });

  it('email field validity', () => {
    let errors = {};
    const email = component.userForm.controls['email'];
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
    const login = component.userForm.controls['login'];
    expect(login.valid).toBeFalsy();

    // login field is required
    errors = login.errors || {};
    expect(errors['required']).toBeTruthy();

    // set login to something correct
    login.setValue('test@test.de');
    errors = login.errors || {};
    expect(errors['required']).toBeFalsy();
  });

  it('pin field validity', () => {
    let errors = {};
    const pin = component.userForm.controls['pin'];
    expect(pin.valid).toBeFalsy();

    // pin field is required
    errors = pin.errors || {};
    expect(errors['required']).toBeTruthy();

    // pin should have at least 5 characters
    pin.setValue('1234');
    errors = pin.errors || {};
    expect(errors['required']).toBeFalsy();
    expect(errors['minlength']).toBeTruthy();

    // set pin to something correct
    pin.setValue('12345678');
    errors = pin.errors || {};
    expect(errors['required']).toBeFalsy();
  });

  it('SCA validity', () => {
    let errors = {};
    const sca = component.userForm.controls['scaUserData']['controls'][0].controls['methodValue'];
    expect(sca.valid).toBeTruthy();

    // pin field is required
    errors = sca.errors || {};
    expect(errors['required']).toBeFalsy();

    // set pin to something correct
    sca.setValue('');
    errors = sca.errors || {};
    expect(errors['required']).toBeFalsy();
  });

  it('validate onSubmit method', () => {
    component.onSubmit();
    expect(component.submitted).toEqual(true);
    expect(component.userForm.valid).toBeFalsy();
  });

  it('validate setupUserFormControl method', () => {
    component.setupUserFormControl();
    expect(component.userForm).toBeDefined();
  });

  it('validate formControl method', () => {
    expect(component.formControl).toEqual(component.userForm.controls);
  });

  it('validate addScaData method', () => {
    const length = (<UntypedFormArray>component.userForm.controls['scaUserData']).length;
    component.addScaDataItem();
    const newLength = (<UntypedFormArray>component.userForm.controls['scaUserData']).length;
    expect(newLength).toEqual(length + 1);
  });

  it('validate removeScaDataItem method', () => {
    component.removeScaDataItem(0);
    const length = (<UntypedFormArray>component.userForm.controls['scaUserData']).length;
    expect(length).toEqual(0);
  });

  it('validate initScaData method', () => {
    const formGroup = component.initScaData();
    const data = {
      scaMethod: '',
      methodValue: '',
      pushMethod: '',
      usesStaticTan: false,
    };
    expect(formGroup.value).toEqual(data);
  });

  it('should call user service when form is valid and submitted', () => {
    component.ngOnInit();
    component.admin = 'false';
    expect(component.submitted).toBeFalsy();
    expect(component.userForm.valid).toBeFalsy();

    // populate form
    component.userForm.controls['email'].setValue('dart.vader@dark-side.com');
    component.userForm.controls['login'].setValue('dart.vader');
    component.userForm.controls['pin'].setValue('12345678');
    component.userForm.controls['scaUserData']['controls'][0].controls['methodValue'].setValue('dart.vader@dark-side.com');
    component.userForm.controls['scaUserData']['controls'][0].controls['staticTan'].setValue('12345');
    component.userForm.controls['scaUserData']['controls'][0].controls['usesStaticTan'].setValue(true);
    component.userForm.controls['scaUserData']['controls'][0].controls['scaMethod'].setValue(ScaMethods.SMTP_OTP);

    // create spies and fake call function
    const sampleResponse = { value: 'sample response' };
    const createUserSpy = spyOn(userService, 'createUser').and.callFake(() => of(sampleResponse));
    const navigateSpy = spyOn(router, 'navigateByUrl');
    component.onSubmit();
    expect(component.submitted).toBeTruthy();
    expect(component.userForm.valid).toBeTruthy();
    expect(createUserSpy).toHaveBeenCalled();
    expect(navigateSpy).toHaveBeenCalledWith('/users/all');
  });

  it('should back to users', () => {
    const navigateSpy = spyOn(router, 'navigate');
    component.onCancel();
    expect(navigateSpy).toHaveBeenCalledWith(['/users/all']);
  });
});

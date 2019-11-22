/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { BaseService as __BaseService } from '../base-service';
import { ApiConfiguration as __Configuration } from '../api-configuration';
import { StrictHttpResponse as __StrictHttpResponse } from '../strict-http-response';
import { Observable as __Observable } from 'rxjs';
import { map as __map, filter as __filter } from 'rxjs/operators';


/**
 * Oba Oauth Controller
 */
@Injectable({
  providedIn: 'root',
})
class OnlineBankingOauthAuthorizationService extends __BaseService {
  static readonly oauthCodeUsingPOSTPath = '/oauth/authorise';
  static readonly oauthServerInfoUsingGETPath = '/oauth/authorization-server';
  static readonly oauthTokenUsingPOSTPath = '/oauth/token';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * @param params The `OnlineBankingOauthAuthorizationService.OauthCodeUsingPOSTParams` containing the following parameters:
   *
   * - `redirect_uri`: redirect_uri
   *
   * - `pin`: pin
   *
   * - `login`: login
   */
  oauthCodeUsingPOSTResponse(params: OnlineBankingOauthAuthorizationService.OauthCodeUsingPOSTParams): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (params.redirectUri != null) __params = __params.set('redirect_uri', params.redirectUri.toString());
    if (params.pin != null) __headers = __headers.set('pin', params.pin.toString());
    if (params.login != null) __headers = __headers.set('login', params.login.toString());
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/oauth/authorise`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<null>;
      })
    );
  }
  /**
   * @param params The `OnlineBankingOauthAuthorizationService.OauthCodeUsingPOSTParams` containing the following parameters:
   *
   * - `redirect_uri`: redirect_uri
   *
   * - `pin`: pin
   *
   * - `login`: login
   */
  oauthCodeUsingPOST(params: OnlineBankingOauthAuthorizationService.OauthCodeUsingPOSTParams): __Observable<null> {
    return this.oauthCodeUsingPOSTResponse(params).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * @param params The `OnlineBankingOauthAuthorizationService.OauthServerInfoUsingGETParams` containing the following parameters:
   *
   * - `redirectId`: redirectId
   *
   * - `paymentId`: paymentId
   *
   * - `consentId`: consentId
   *
   * - `cancellationId`: cancellationId
   */
  oauthServerInfoUsingGETResponse(params: OnlineBankingOauthAuthorizationService.OauthServerInfoUsingGETParams): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (params.redirectId != null) __params = __params.set('redirectId', params.redirectId.toString());
    if (params.paymentId != null) __params = __params.set('paymentId', params.paymentId.toString());
    if (params.consentId != null) __params = __params.set('consentId', params.consentId.toString());
    if (params.cancellationId != null) __params = __params.set('cancellationId', params.cancellationId.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/oauth/authorization-server`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<null>;
      })
    );
  }
  /**
   * @param params The `OnlineBankingOauthAuthorizationService.OauthServerInfoUsingGETParams` containing the following parameters:
   *
   * - `redirectId`: redirectId
   *
   * - `paymentId`: paymentId
   *
   * - `consentId`: consentId
   *
   * - `cancellationId`: cancellationId
   */
  oauthServerInfoUsingGET(params: OnlineBankingOauthAuthorizationService.OauthServerInfoUsingGETParams): __Observable<null> {
    return this.oauthServerInfoUsingGETResponse(params).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * @param code code
   */
  oauthTokenUsingPOSTResponse(code: string): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (code != null) __params = __params.set('code', code.toString());
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/oauth/token`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<null>;
      })
    );
  }
  /**
   * @param code code
   */
  oauthTokenUsingPOST(code: string): __Observable<null> {
    return this.oauthTokenUsingPOSTResponse(code).pipe(
      __map(_r => _r.body as null)
    );
  }
}

module OnlineBankingOauthAuthorizationService {

  /**
   * Parameters for oauthCodeUsingPOST
   */
  export interface OauthCodeUsingPOSTParams {

    /**
     * redirect_uri
     */
    redirectUri: string;

    /**
     * pin
     */
    pin: string;

    /**
     * login
     */
    login: string;
  }

  /**
   * Parameters for oauthServerInfoUsingGET
   */
  export interface OauthServerInfoUsingGETParams {

    /**
     * redirectId
     */
    redirectId?: string;

    /**
     * paymentId
     */
    paymentId?: string;

    /**
     * consentId
     */
    consentId?: string;

    /**
     * cancellationId
     */
    cancellationId?: string;
  }
}

export { OnlineBankingOauthAuthorizationService }

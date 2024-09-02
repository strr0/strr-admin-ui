import { request } from '../request';

const BASIC_AUTH = 'Basic ' + window.btoa(import.meta.env.VITE_OAUTH2_CLIENT);

/**
 * https://www.ietf.org/rfc/rfc6749.txt
 * OAuth 协议 4.3.1 要求格式为 form 而不是 JSON 注意！
 */
const FORM_CONTENT_TYPE = 'application/x-www-form-urlencoded';

/**
 * Login
 *
 * @param username User name
 * @param password Password
 */
export function fetchLogin(username: string, password: string) {
  const grantType = 'password'
  const scope = 'resource.all'
  return request<Api.Auth.LoginToken>({
    url: '/auth/oauth2/token',
    method: 'post',
    data: {
      username,
      password,
      grant_type: grantType,
      scope: scope
    },
    headers: {
      Authorization: BASIC_AUTH,
      'Content-Type': FORM_CONTENT_TYPE
    }
  });
}

/** Get user info */
export function fetchGetUserInfo() {
  return request<Api.Auth.UserInfo>({ url: '/system/user/getUserInfo' });
}

/**
 * Refresh token
 *
 * @param refreshToken Refresh token
 */
export function fetchRefreshToken(refreshToken: string) {
  const grantType = 'refresh_token'
  const scope = 'resource.all'
  return request<Api.Auth.LoginToken>({
    url: '/auth/oauth2/token',
    method: 'post',
    data: {
      refreshToken,
      grant_type: grantType,
      scope: scope
    },
    headers: {
      Authorization: BASIC_AUTH,
      'Content-Type': FORM_CONTENT_TYPE
    }
  });
}

/**
 * return custom backend error
 *
 * @param code error code
 * @param msg error message
 */
export function fetchCustomBackendError(code: string, msg: string) {
  return request({ url: '/auth/error', params: { code, msg } });
}

import { request } from '../request';
import { stringify } from 'qs';

/** get role list */
export function fetchGetRoleList(params?: Api.System.RoleSearchParams) {
  return request<Api.System.RoleList>({
    url: '/system/role/page',
    method: 'get',
    params
  });
}

/** get all roles */
export function fetchGetAllRoles() {
  return request<Api.System.AllRole[]>({
    url: '/system/role/list',
    method: 'get'
  });
}

/** save role */
export function fetchSaveRole(data: Api.System.Role) {
  return request<void>({
    url: '/system/role',
    method: 'post',
    data
  });
}

/** update role */
export function fetchUpdateRole(data: Api.System.Role) {
  return request<void>({
    url: '/system/role',
    method: 'put',
    data
  });
}

/** update role */
export function fetchUpdateRoleRel(roleId: number, resourceIds: number[]) {
  return request<void>({
    url: '/system/role/updateRel',
    method: 'post',
    data: stringify({
      roleId,
      resourceIds
    }, {
      arrayFormat: 'repeat'
    }),
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  });
}

/** remove role */
export function fetchRemoveRole(id: number) {
  return request<void>({
    url: '/system/role/' + id,
    method: 'delete'
  });
}

/** get resourceId list */
export function fetchGetResourceId(roleId: number) {
  return request<number[]>({
    url: '/system/role/listResourceId',
    method: 'get',
    params: {
      roleId
    }
  });
}

/** get user list */
export function fetchGetUserList(params?: Api.System.UserSearchParams) {
  return request<Api.System.UserList>({
    url: '/system/user/page',
    method: 'get',
    params
  });
}

/** save user */
export function fetchSaveUser(data: Api.System.User) {
  return request<void>({
    url: '/system/user',
    method: 'post',
    data
  });
}

/** remove user */
export function fetchRemoveUser(id: number) {
  return request<void>({
    url: '/system/user/' + id,
    method: 'delete'
  });
}

/** get roleId list */
export function fetchGetRoleId(userId: number) {
  return request<number[]>({
    url: '/system/user/listRoleId',
    method: 'get',
    params: {
      userId
    }
  });
}

/** get resource tree */
export function fetchGetResourceTree() {
  return request<Api.System.Resource[]>({
    url: '/system/resource/tree',
    method: 'get'
  });
}

/** save resource */
export function fetchSaveResource(data: Api.System.Resource) {
  return request<void>({
    url: '/system/resource',
    method: 'post',
    data
  });
}

/** update resource */
export function fetchUpdateResource(data: Api.System.Resource) {
  return request<void>({
    url: '/system/resource',
    method: 'put',
    data
  });
}

/** remove resource */
export function fetchRemoveResource(id: number) {
  return request<void>({
    url: '/system/resource/' + id,
    method: 'delete'
  });
}

/** get dict type list */
export function fetchGetDictTypeList(params?: Api.System.DictTypeSearchParams) {
  return request<Api.System.DictTypeList>({
    url: '/system/dict/type/page',
    method: 'get',
    params
  });
}

/** save dict type */
export function fetchSaveDictType(data: Api.System.DictType) {
  return request<void>({
    url: '/system/dict/type',
    method: 'post',
    data
  });
}

/** update dict type */
export function fetchUpdateDictType(data: Api.System.DictType) {
  return request<void>({
    url: '/system/dict/type',
    method: 'put',
    data
  });
}

/** remove dict type */
export function fetchRemoveDictType(id: number) {
  return request<void>({
    url: '/system/dict/type/' + id,
    method: 'delete'
  });
}

/** get dict data list */
export function fetchGetDictDataList(params?: Api.System.DictDataSearchParams) {
  return request<Api.System.DictDataList>({
    url: '/system/dict/data/page',
    method: 'get',
    params
  });
}

/** save dict data */
export function fetchSaveDictData(data: Api.System.DictData) {
  return request<void>({
    url: '/system/dict/data',
    method: 'post',
    data
  });
}

/** update dict data */
export function fetchUpdateDictData(data: Api.System.DictData) {
  return request<void>({
    url: '/system/dict/data',
    method: 'put',
    data
  });
}

/** remove dict data */
export function fetchRemoveDictData(id: number) {
  return request<void>({
    url: '/system/dict/data/' + id,
    method: 'delete'
  });
}

/** get oauth client list */
export function fetchGetOauthClientList(params?: Api.System.OauthClientSearchParams) {
  return request<Api.System.OauthClientList>({
    url: '/system/oauth/client/page',
    method: 'get',
    params
  });
}

/** save oauth client */
export function fetchSaveOauthClient(data: Api.System.OauthClient) {
  return request<void>({
    url: '/system/oauth/client',
    method: 'post',
    data
  });
}

/** update oauth client */
export function fetchUpdateOauthClient(data: Api.System.OauthClient) {
  return request<void>({
    url: '/system/oauth/client',
    method: 'put',
    data
  });
}

/** remove oauth client */
export function fetchRemoveOauthClient(id: number) {
  return request<void>({
    url: '/system/oauth/client/' + id,
    method: 'delete'
  });
}

/** get oss config list */
export function fetchGetOssConfigList(params?: Api.System.OssConfigSearchParams) {
  return request<Api.System.OssConfigList>({
    url: '/resource/oss/config/page',
    method: 'get',
    params
  });
}

/** save oss config */
export function fetchSaveOssConfig(data: Api.System.OssConfig) {
  return request<void>({
    url: '/resource/oss/config',
    method: 'post',
    data
  });
}

/** update oss config */
export function fetchUpdateOssConfig(data: Api.System.OssConfig) {
  return request<void>({
    url: '/resource/oss/config',
    method: 'put',
    data
  });
}

/** remove oss config */
export function fetchRemoveOssConfig(id: number) {
  return request<void>({
    url: '/resource/oss/config/' + id,
    method: 'delete'
  });
}

/** get oss list */
export function fetchGetOssList(params?: Api.System.OssSearchParams) {
  return request<Api.System.OssList>({
    url: '/resource/oss/page',
    method: 'get',
    params
  });
}

/** upload file */
export function fetchUploadFile(data: FormData) {
  return request<void>({
    url: '/resource/oss/upload',
    method: 'post',
    data,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  });
}

/** download file */
export function fetchDownloadFile(id: number) {
  return request<void>({
    url: '/resource/oss/download/' + id,
    method: 'get',
    responseType: 'blob'
  });
}

/** remove oss */
export function fetchRemoveOss(id: number) {
  return request<void>({
    url: '/resource/oss/' + id,
    method: 'delete'
  });
}
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
import { request } from '../request';
import { stringify } from 'qs';

/** get table list */
export function fetchGetModuleList(params?: Api.Data.ModuleSearchParams) {
  return request<Api.Data.ModuleList>({
    url: '/data/module/page',
    method: 'get',
    params,
    result: true
  });
}

/** update module */
export function fetchUpdateModuleInfo(data: Api.Data.Module) {
  return request<void>({
    url: '/data/module',
    method: 'put',
    data
  });
}

/** get module */
export function fetchGetModule(id: number) {
  return request<void>({
    url: '/data/module/' + id,
    method: 'get'
  });
}

/** remove table */
export function fetchRemoveModule(tableId: number) {
  return request<void>({
    url: '/data/module/' + tableId,
    method: 'delete'
  });
}

/** get db table list */
export function fetchGetDbTableList(params?: Api.Data.TableSearchParams) {
  return request<Api.Data.TableList>({
    url: '/data/module/db/page',
    method: 'get',
    params,
    result: true
  });
}

/** import table */
export function fetchImportTable(tables: string[]) {
  return request<void>({
    url: '/data/module/import',
    method: 'post',
    data: stringify({
      tables
    }, {
      arrayFormat: 'repeat'
    }),
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  });
}

/** register */
export function fetchRegisterModule(id: number) {
  return request<void>({
    url: '/data/module/register',
    method: 'post',
    data: {
      id
    },
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  });
}
import { request } from '../request';
import { stringify } from 'qs';

/** get table list */
export function fetchGetTableList(params?: Api.Data.TableSearchParams) {
  return request<Api.Data.TableList>({
    url: '/data/table/page',
    method: 'get',
    params,
    result: true
  });
}

/** update module */
export function fetchUpdateModuleInfo(data: Api.Data.Module) {
  return request<void>({
    url: '/data/table',
    method: 'put',
    data
  });
}

/** get module */
export function fetchGetModule(id: number) {
  return request<void>({
    url: '/data/table/' + id,
    method: 'get'
  });
}

/** remove table */
export function fetchRemoveTable(id: number) {
  return request<void>({
    url: '/data/table/' + id,
    method: 'delete'
  });
}

/** get db table list */
export function fetchGetDbTableList(params?: Api.Data.TableSearchParams) {
  return request<Api.Data.TableList>({
    url: '/data/table/db/page',
    method: 'get',
    params,
    result: true
  });
}

/** import table */
export function fetchImportTable(tables: string[]) {
  return request<void>({
    url: '/data/table/import',
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
export function fetchRegisterTable(id: number) {
  return request<void>({
    url: '/data/table/register',
    method: 'post',
    data: {
      id
    },
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  });
}
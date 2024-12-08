import { request } from '../request';

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
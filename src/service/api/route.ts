import { request } from '../request';

/** get user routes */
export function fetchGetRoutes() {
  return request<Api.Route.MenuRoute[]>({ url: '/system/resource/getRoutes' });
}
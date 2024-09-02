import type { CustomRoute } from 'vue-router';
import { transformCustomRoutesToVueRoutes } from './transform';

/** create routes when the auth route mode is static */
export function createStaticRoutes() {
  const customRoutes: CustomRoute[] = [];

  return {
    customRoutes
  };
}

/**
 * Get auth vue routes
 *
 * @param routes Custom routes
 */
export function getAuthVueRoutes(routes: CustomRoute[]) {
  return transformCustomRoutesToVueRoutes(routes);
}

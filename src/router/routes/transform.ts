import type { CustomRoute, RouteComponent, RouteRecordRaw } from 'vue-router';
import { createCustomNameComponent } from '@/utils/component';

const layouts: Record<string, RouteComponent | (() => Promise<RouteComponent>)> = {
  base: () => import('@/layouts/base-layout/index.vue'),
  blank: () => import('@/layouts/blank-layout/index.vue')
};

// 匹配views里面所有的.vue文件
const pattern = /views\/(.*)\.vue/;
const views = import.meta.glob('./../../views/**/*.vue');

const loadView = (component: string, name: string) => {
  let res;
  for (const path of Object.keys(views)) {
    const view = path.match(pattern)?.[1];
    if (view === component) {
      res = createCustomNameComponent(views[path], { name });
    }
  }
  return res;
};

/**
 * transform custom const routes to vue routes
 *
 * @param routes custom const routes
 */
export function transformCustomRoutesToVueRoutes(routes: CustomRoute[]) {
  return routes.flatMap(route => transformCustomRouteToVueRoute(route));
}

/**
 * transform custom route to vue route
 *
 * @param route custom const route
 */
function transformCustomRouteToVueRoute(route: CustomRoute, parentPath: string = '') {
  const DIRECTORY = 'D';
  const MENU = 'M';

  function isLayout(item: CustomRoute) {
    return item.meta?.type === DIRECTORY;
  }

  function isView(item: CustomRoute) {
    return item.meta?.type === MENU;
  }

  function isSingle(item: CustomRoute) {
    return item.meta?.single;
  }

  const vueRoutes: RouteRecordRaw[] = [];

  // add props: true to route
  if (route.path.includes(':') && !route.props) {
    route.props = true;
  }

  const { name, path, component, children, ...rest } = route;

  const vueRoute = {
    name,
    path: parentPath + path,
    ...rest
  } as RouteRecordRaw;

  try {
    if (component) {
      if (isSingle(route)) {
        const singleRoute: RouteRecordRaw = {
          path,
          component: layouts.base,
          meta: {
            title: route.meta?.title || ''
          },
          children: [
            {
              name,
              path: '',
              component: loadView(component, name),
              ...rest
            } as RouteRecordRaw
          ]
        };

        return [singleRoute];
      }

      if (isLayout(route)) {
        vueRoute.component = layouts[component];
      }

      if (isView(route)) {
        vueRoute.component = loadView(component, name);
      }
    }
  } catch (error: any) {
    console.error(`Error transforming route "${route.name}": ${error.toString()}`);
    return [];
  }

  // add redirect to child
  if (children?.length && !vueRoute.redirect) {
    vueRoute.redirect = {
      name: children[0].name
    };
  }

  if (children?.length) {
    const childRoutes = children.flatMap(child => transformCustomRouteToVueRoute(child, vueRoute.path));
    vueRoute.children = childRoutes;
  }

  vueRoutes.unshift(vueRoute);

  return vueRoutes;
}

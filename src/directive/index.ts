import type { App } from 'vue';
import { perms } from './permission';

/** Setup directive plugin */
export function setupDirective(app: App) {
  app.directive('perms', perms);
}

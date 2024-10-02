import { Directive, DirectiveBinding } from 'vue';
import { useAuthStore } from '@/stores/modules/auth';

/**
 * 操作权限处理
 */
export const perms: Directive = {
  mounted(el: HTMLElement, binding: DirectiveBinding) {
    const { userInfo } = useAuthStore();
    // 「其他角色」按钮权限校验
    const { value } = binding;

    if (!value) {
      return true
    }

    if (typeof value === 'string') {
      const hasPerms = userInfo.perms.includes(value);
      if (!hasPerms) {
        el.parentNode && el.parentNode.removeChild(el);
        return false;
      }
      return true;
    }

    if (value instanceof Array && value.length > 0) {
      const hasPerms = userInfo.perms.some((perms: string) => {
        return perms === '*:*:*' || value.includes(perms);
      });
      if (!hasPerms) {
        el.parentNode && el.parentNode.removeChild(el);
        return false;
      }
      return true;
    }

    throw new Error("check perms! Like v-perms=\"['system:user:add','system:user:edit']\"");
  }
};
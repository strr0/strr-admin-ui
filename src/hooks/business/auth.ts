import { useAuthStore } from '@/stores/modules/auth';

export function useAuth() {
  const authStore = useAuthStore();

  function hasAuth(codes: string | string[]) {
    if (!authStore.isLogin) {
      return false;
    }

    if (typeof codes === 'string') {
      return authStore.userInfo.perms.includes(codes);
    }

    return codes.some(code => authStore.userInfo.perms.includes(code));
  }

  return {
    hasAuth
  };
}

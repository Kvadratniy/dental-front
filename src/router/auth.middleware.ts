import { Route } from 'vue-router';
import { checkAccess, isAuthenticated } from '@/core/auth';

export async function authMiddleware(
  to: Route,
  from: Route,
  next: any
): Promise<void> {
  if (to.matched.every((record) => !record.meta?.hasAuth)) {
    next();
    return;
  }

  if (!isAuthenticated.value) {
    try {
      await checkAccess();
      next();
      return;
    } catch (e) {
      console.error(e);
      next({ name: 'auth' });
      return;
    }
  }

  next();
}

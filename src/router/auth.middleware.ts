import { Route } from 'vue-router';
import { checkAccess, isAuthenticated, hasPermissionsNeeded } from '@/core/auth';

export async function authMiddleware(
  to: Route,
  from: Route,
  next: any
): Promise<void> {
  if (to.matched.every((record) => !record.meta?.hasAuth)) {
    next();
    return;
  }

  if (isAuthenticated.value) {
    if (!hasPermissionsNeeded(to)) {
      next({ name: 'account' });
      return;
    } else {
      next();
      return;
    }
  } else {
    const res = await checkAccess();
    if (res) {
      if (!hasPermissionsNeeded(to)) {
        if (to.name === 'account') return next();
        next({ name: 'account' });
        return;
      } else {
        next();
        return;
      }
    } else {
      next({ name: 'auth' });
      return;
    }
  }
}

import { Route } from 'vue-router';
import { checkAccess, isAuthenticated } from '@/core/auth';

export async function authMiddleware(
  to: Route,
  from: Route,
  next: any
): Promise<void> {
  console.log(from);
  console.log(to);
  // if (to.matched.every((record) => !record.meta?.hasAuth)) {
  //   next();
  //   return;
  // }

  // debugger
  // if (!isAuthenticated.value) {
  //   debugger
  //   try {
  //     await checkAccess();
  //     next();
  //     return;
  //   } catch (e) {
  //     console.error(e);
  //     next({ name: 'auth' });
  //     return;
  //   }
  // }

  next();
}

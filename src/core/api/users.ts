import container, { Injectable, Inject } from '@/di';
import HttpService, { HTTP_SERVICE_ID } from '@/core/http';
const URL = '/api/user';

export const USERS_API_SERVICE_ID = Symbol('CashboxCashbillApiService');

@Injectable()
export class UsersApi {
  constructor(
    @Inject(HTTP_SERVICE_ID)
    private http: HttpService
  ) {}

  getAllUsers() {
    return this.http.request({
      method: 'GET',
      url: `${URL}/all`,
    });
  }
}

container
  .bind<UsersApi>(USERS_API_SERVICE_ID)
  .to(UsersApi);

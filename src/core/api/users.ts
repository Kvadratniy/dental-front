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

  // Все пользователи
  getAllUsers() {
    return this.http.request({
      method: 'GET',
      url: `${URL}/all`,
    });
  }

  // Получить пользователя
  getUserById(id: string|number) {
    return this.http.request({
      method: 'GET',
      url: `${URL}/${id}`,
    });
  }

  // Получить текущего пользователя
  getCurrentUser() {
    return this.http.request({
      method: 'GET',
      url: `${URL}/current`,
    });
  }

  // Список скидок текущего пользователя
  getUserDiscounts(id) {
    return this.http.request({
      method: 'GET',
      url: `${URL}/discounts/${id}`,
    });
  }

  getCurrentUserDiscounts() {
    return this.http.request({
      method: 'GET',
      url: `${URL}/discounts`,
    });
  }
}

container
  .bind<UsersApi>(USERS_API_SERVICE_ID)
  .to(UsersApi);

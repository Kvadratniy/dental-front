import container, { Injectable, Inject } from '@/di';
import HttpService, { HTTP_SERVICE_ID } from '@/core/http';

const URL = '/api/';
export const AUTH_API_SERVICE_ID = Symbol('AuthApiService');

@Injectable()
export class AuthApi {
  constructor(
    @Inject(HTTP_SERVICE_ID)
    private http: HttpService
  ) {}

  login(data) {
    return this.http.request({
      method: 'POST',
      url: `${URL}/login`,
      data,
    });
  }

  register(data) {
    return this.http.request({
      method: 'POST',
      url: `${URL}/registration`,
      data,
    });
  }
}

container
  .bind<AuthApi>(AUTH_API_SERVICE_ID)
  .to(AuthApi);

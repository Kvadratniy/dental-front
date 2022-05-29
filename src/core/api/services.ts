import container, { Injectable, Inject } from '@/di';
import HttpService, { HTTP_SERVICE_ID } from '@/core/http';
const URL = '/api/services';

export const SERVICES_API_SERVICE_ID = Symbol('ServicesApiService');

@Injectable()
export class ServicesApi {
  constructor(
    @Inject(HTTP_SERVICE_ID)
    private http: HttpService
  ) {}

  getServices() {
    return this.http.request({
      method: 'GET',
      url: `${URL}/all`,
    });
  }

  createService(data) {
    return this.http.request({
      method: 'POST',
      url: `${URL}`,
      data,
    });
  }
}

container
  .bind<ServicesApi>(SERVICES_API_SERVICE_ID)
  .to(ServicesApi);

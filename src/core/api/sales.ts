import container, { Injectable, Inject } from '@/di';
import HttpService, { HTTP_SERVICE_ID } from '@/core/http';
const URL = '/api/sales';

export const SALES_API_SERVICE_ID = Symbol('SalesApiService');

@Injectable()
export class SalesApi {
  constructor(
    @Inject(HTTP_SERVICE_ID)
    private http: HttpService
  ) {}

  getSales() {
    return this.http.request({
      method: 'GET',
      url: `${URL}`,
    });
  }

  createSale(data) {
    return this.http.request({
      method: 'POST',
      url: `${URL}`,
      data,
    });
  }

  completeSale(data) {
    return this.http.request({
      method: 'PUT',
      url: `${URL}/complete`,
      data,
    });
  }
}

container
  .bind<SalesApi>(SALES_API_SERVICE_ID)
  .to(SalesApi);

import container, { Injectable, Inject } from '@/di';
import HttpService, { HTTP_SERVICE_ID } from '@/core/http';
const URL = '/api/discounts';

export const DISCOUNTS_API_SERVICE_ID = Symbol('CashboxCashbillApiService');

@Injectable()
export class DiscountsApi {
  constructor(
    @Inject(HTTP_SERVICE_ID)
    private http: HttpService
  ) {}

  getAllDiscounts() {
    return this.http.request({
      method: 'GET',
      url: `${URL}`,
    });
  }
}

container
  .bind<DiscountsApi>(DISCOUNTS_API_SERVICE_ID)
  .to(DiscountsApi);

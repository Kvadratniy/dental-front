import container, { Injectable, Inject } from '@/di';
import HttpService, { HTTP_SERVICE_ID } from '@/core/http';
const URL = '/api/purse';

export const PURSE_API_SERVICE_ID = Symbol('PurseApiService');

@Injectable()
export class PurseApi {
  constructor(
    @Inject(HTTP_SERVICE_ID)
    private http: HttpService
  ) {}

  getItems() {
    return this.http.request({
      method: 'GET',
      url: `${URL}/writeoffs`,
    });
  }

  getWriteoffQR() {
    return this.http.request({
      method: 'GET',
      url: `${URL}/qr`
    })
  }

  writeoffSum(data: any) {
    return this.http.request({
      method: 'POST',
      url: `${URL}/writeoff`,
      data,
    })
  }
}

container
  .bind<PurseApi>(PURSE_API_SERVICE_ID)
  .to(PurseApi);

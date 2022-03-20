import qs from 'query-string';
import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import container, { Injectable, Inject } from '@/di';

import ConfigService, { CONFIG_SERVICE_ID } from '@/config';
import { AUTH_KEY } from '@/core/auth';

export const HTTP_SERVICE_ID = Symbol('ApiService');

@Injectable()
export default class HttpService {
  httpClient: AxiosInstance;

  constructor(
    @Inject(CONFIG_SERVICE_ID)
    private configService: ConfigService
  ) {

    const token = window.localStorage.getItem(AUTH_KEY);

    this.httpClient = axios.create({
      baseURL: this.configService.ApiEndpoint,
      timeout: 100000,
      headers: { Authorization: 'Bearer ' +token },
      paramsSerializer: (params) => qs.stringify(params),
    });
  }

  public async request(options: AxiosRequestConfig = {}) {
    const { data } = await this.httpClient(options);
    return data;
  }

  public async requestWithPagination(options: AxiosRequestConfig = {}) {
    const { data } = await this.httpClient(options);
    return data.content;
  }
}

container.bind<HttpService>(HTTP_SERVICE_ID).to(HttpService);

import container, { Injectable } from '@/di';

export const CONFIG_SERVICE_ID = Symbol('configService');

@Injectable()
export class ConfigService {
  public readonly ApiEndpoint = process.env.API_HOST;

  public readonly baseUrl = process.env.BASE_URL;
}

export default ConfigService;

container.bind<ConfigService>(CONFIG_SERVICE_ID).to(ConfigService);

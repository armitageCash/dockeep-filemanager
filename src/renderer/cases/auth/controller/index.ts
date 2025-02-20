import { apiUrl } from '../../../shared/constants';
import { authResponse } from '../../../interfaces';
import HttpService from '../service';
import { Input } from '../types';

export default class AuthController<T extends authResponse> {
  private readonly httpService: HttpService<T>;
  private readonly baseUrl: string;

  constructor(token?: string) {
    this.baseUrl = `${apiUrl}`;
    this.httpService = new HttpService({
      url: this.baseUrl,
      token,
    });
  }

  public async auth(params: Input): Promise<T> {
    try {
      this.httpService.setURL(`${this.baseUrl}auth/login`);
      return await this.httpService.Post(params);
    } catch (error) {
      this.handleError(error, 'Auth error');
      throw error;
    }
  }

  private handleError(error: unknown, context: string): void {
    console.error(`${context}:`, error);
  }
}

import { apiUrl } from '../../../shared/constants';
import HttpService from '../service';
import { DirectusCollectionsResponse } from '../types';

export default class CollectionController<
  T extends DirectusCollectionsResponse,
> {
  private readonly httpService: HttpService<T>;
  private readonly baseUrl: string;

  constructor(token?: string) {
    this.baseUrl = `${apiUrl}`;
    this.httpService = new HttpService({
      url: this.baseUrl,
      token,
    });
  }

  public async getCollections(): Promise<T> {
    try {
      this.httpService.setURL(`${this.baseUrl}items/collections`);
      return await this.httpService.Get();
    } catch (error) {
      this.handleError(error, 'Auth error');
      throw error;
    }
  }

  private handleError(error: unknown, context: string): void {
    console.error(`${context}:`, error);
  }
}

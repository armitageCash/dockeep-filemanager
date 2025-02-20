import axios, { AxiosInstance, AxiosResponse } from 'axios';

interface ServiceConfig {
  url: string;
  token?: string;
}

interface ApiResponse<T> {
  data: T;
  status: number;
  message?: string;
}

export class ApiError extends Error {
  constructor(
    public status: number,
    public message: string,
    public data?: any,
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

export default class HttpService<T> {
  public axiosInstance: AxiosInstance;
  private baseUrl: string;

  constructor(config: ServiceConfig) {
    this.baseUrl = config.url;
    this.axiosInstance = axios.create({
      baseURL: config.url,
      headers: {
        'Content-Type': 'application/json',
        ...(config.token && { Authorization: `Bearer ${config.token}` }),
      },
    });

    this.axiosInstance.interceptors.response.use(
      (response: any) => response,
      (error: any) => {
        const message = error.response?.data?.message || 'An error occurred';
        const status = error.response?.status || 500;
        const data = error.response?.data;

        throw new ApiError(status, message, data);
      },
    );
  }

  public Get = async (): Promise<T> => {
    const response = await this.axiosInstance.get(this.axiosInstance.getUri());
    return response.data.data;
  };

  public setURL(url: string): void {
    this.axiosInstance.defaults.baseURL = url;
  }
}

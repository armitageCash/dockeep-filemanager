import { Input } from '../types';

export default interface AuthManager<T> {
  auth(params: Input): Promise<T | undefined>;
}

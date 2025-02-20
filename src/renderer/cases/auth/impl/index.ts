import AuthManager from '../manager';
import { Input } from '../types';
import AuthController from '../controller';
import { authResponse } from '@renderer/interfaces';

export class AuthImpl implements AuthManager<authResponse> {
  auth(params: Input): Promise<authResponse> {
    return new AuthController().auth(params);
  }
}

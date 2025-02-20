import { authResponse } from '../../../interfaces';
import { Logger } from '../../../shared/logger';
import AuthManager from '../manager';

export type Input = {
  email: string;
  password: string;
};

export interface DependenciesType {
  logger: Logger;
  authService: AuthManager<authResponse>;
}

export type professionalInfoCaseType<T> = (
  input: Input,
  dependencies: DependenciesType,
) => Promise<T | null>;

export enum AuthMessageResponse {
  SUCCESS = 'Use case execution success',
  ERROR = 'Use case execution failed',
}

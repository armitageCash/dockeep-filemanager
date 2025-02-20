import { createApp, UseCaseResult, UsecaseType } from 'urunner-lib';
import { Logger } from '../../shared/logger';
import { Input, DependenciesType, AuthMessageResponse } from '../auth/types';
import { AuthImpl } from '../auth/impl';
import { authResponse } from '@renderer/interfaces';

type AuthsecaseType = UsecaseType<
  Input,
  DependenciesType,
  UseCaseResult<authResponse>
>;

const adapter =
  (fn: AuthsecaseType) =>
  async (params: Input, dependencies: DependenciesType) => {
    return await fn(params, dependencies);
  };

export const doAuth: AuthsecaseType = async (
  params: Input,
  dependencies: DependenciesType,
) => {
  const { logger: log, authService } = dependencies;

  try {
    const response = await authService.auth(params);
    return {
      data: response || null,
      status: 'success',
      message: AuthMessageResponse.SUCCESS,
    };
  } catch (e: any) {
    log.error(e);
    return {
      data: null,
      message: AuthMessageResponse.ERROR,
      status: 'error',
    };
  }
};

const auth = createApp(adapter(doAuth)).attach(
  (dependencies: DependenciesType) => {
    dependencies.logger = new Logger();
    dependencies.authService = new AuthImpl();
  },
);

export default auth;

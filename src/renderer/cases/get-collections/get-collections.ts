import { createApp, UseCaseResult, UsecaseType } from 'urunner-lib';
import { Logger } from '../../shared/logger';
import {
  Input,
  DependenciesType,
  GetCollectionMessageResponse,
  DirectusCollectionsResponse,
} from '../get-collections/types';
import { GetCollectionImpl } from '../get-collections/impl';

type GetCollectionsCaseType = UsecaseType<
  null,
  DependenciesType,
  UseCaseResult<DirectusCollectionsResponse>
>;

const adapter =
  (fn: GetCollectionsCaseType) =>
  async (params: Input, dependencies: DependenciesType) => {
    return await fn(null, dependencies);
  };

export const getCollectionsCase: GetCollectionsCaseType = async (
  params: Input,
  dependencies: DependenciesType,
) => {
  const { logger: log, CollectionService } = dependencies;

  try {
    const response = await CollectionService.getCollections();
    return {
      data: response || null,
      status: 'success',
      message: GetCollectionMessageResponse.SUCCESS,
    };
  } catch (e: any) {
    log.error(e);
    return {
      data: null,
      message: GetCollectionMessageResponse.ERROR,
      status: 'error',
    };
  }
};

const getCollections = createApp(adapter(getCollectionsCase)).attach(
  (dependencies: DependenciesType) => {
    dependencies.logger = new Logger();
    dependencies.CollectionService = new GetCollectionImpl();
  },
);

export default getCollections;

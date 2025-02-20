import { Logger } from '../../../shared/logger';
import CollectionsManager from '../manager';

type DirectusCollection = {
  collection: string;
  meta: {
    collection: string;
    icon: string | null;
    note: string | null;
    display_template: string | null;
    hidden: boolean;
    singleton: boolean;
    translations:
      | null
      | {
          language: string;
          translation: string;
        }[];
    archive_field: string | null;
    archive_app_filter: boolean;
    archive_value: string | null;
    unarchive_value: string | null;
    sort_field: string | null;
    accountability: 'all' | 'activity' | null;
    color: string | null;
    item_duplication_fields: string[] | null;
    sort: number | null;
    group: string | null;
    collapse: 'open' | 'closed' | 'locked';
    preview_url: string | null;
  };
  schema: {
    name: string;
    table: string;
    comment: string | null;
  };
};

export type DirectusCollectionsResponse = {
  data: DirectusCollection[];
};

export type Input = {
  email: string;
  password: string;
};

export interface DependenciesType {
  logger: Logger;
  CollectionService: CollectionsManager<DirectusCollectionsResponse>;
}

export type getCollectionCaseType<T> = (
  input: Input,
  dependencies: DependenciesType,
) => Promise<T | null>;

export enum GetCollectionMessageResponse {
  SUCCESS = 'Use case execution success',
  ERROR = 'Use case execution failed',
}

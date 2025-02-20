import CollectionsManager from '../manager';
import { DirectusCollectionsResponse } from '../types';
import getCollections from '../controller';

export class GetCollectionImpl
  implements CollectionsManager<DirectusCollectionsResponse>
{
  getCollections(): Promise<DirectusCollectionsResponse> {
    return new getCollections().getCollections();
  }
}

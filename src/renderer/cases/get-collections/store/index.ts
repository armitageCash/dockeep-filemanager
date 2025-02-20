import { create } from 'zustand';
import { Input, DirectusCollectionsResponse } from '../types';
import getCollections from '../get-collections';

interface StoreState {
  collectionsResponse: DirectusCollectionsResponse;
  loading: boolean;
  setCollections: (data: DirectusCollectionsResponse) => void;
  getCollections: () => Promise<any | null>;
}

const useStoreGetCollections = create<StoreState>((set) => ({
  collectionsResponse: null,
  loading: false,
  setCollections: (data: DirectusCollectionsResponse) =>
    set({ collectionsResponse: data }),
  getCollections: async (): Promise<[any, any] | null> => {
    try {
      set((state) => ({ loading: true }));
      const result = await getCollections.run();

      set((state) => ({
        loading: false,
        collectionsResponse: result.data,
      }));

      return [result.data, null];
    } catch (error) {
      console.error(error);
      return [null, error];
    }
  },
}));

export default useStoreGetCollections;

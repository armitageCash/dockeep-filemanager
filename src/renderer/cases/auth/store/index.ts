import { create } from 'zustand';
import { Input } from '../types';
import auth from '../auth';
import { authResponse } from '@renderer/interfaces';

interface StoreState {
  authResponse: authResponse | null;
  loading: boolean;
  setAuth: (data: authResponse) => void;
  auth: (data: Input | null) => Promise<any | null>;
}

const useStoreAuth = create<StoreState>((set) => ({
  authResponse: null,
  loading: false,
  setAuth: (data: authResponse) => set({ authResponse: data }),
  auth: async (data: Input): Promise<[any, any] | null> => {
    try {
      if (!data) {
        throw new Error('No login data provided');
      }

      set((state) => ({ loading: true }));
      const result = await auth.run(data);

      set((state) => ({
        loading: false,
        authResponse: result.data,
      }));

      return [result.data, null];
    } catch (error) {
      console.error(error);
      return [null, error];
    }
  },
}));

export default useStoreAuth;

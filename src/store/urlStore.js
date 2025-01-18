
import create from 'zustand';
import { persist } from 'zustand/middleware';

const useUrlStore = create(
  persist(
    (set) => ({
      urls: {},
      addUrl: (shortUrl, longUrl) => 
        set((state) => ({
          urls: { ...state.urls, [shortUrl]: longUrl }
        })),
      getUrl: (shortUrl) => useUrlStore.getState().urls[shortUrl]
    }),
    {
      name: 'url-storage'
    }
  )
);

export default useUrlStore;

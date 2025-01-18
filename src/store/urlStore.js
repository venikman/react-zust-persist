
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useUrlStore = create(
  persist(
    (set) => ({
      urls: {},
      urlCount: 0,
      searchTerm: '',
      setSearchTerm: (term) => set({ searchTerm: term }),
      filteredUrls: {},
      addUrl: (shortUrl, longUrl) => 
        set((state) => ({
          urls: { ...state.urls, [shortUrl]: longUrl },
          urlCount: state.urlCount + 1,
          filteredUrls: state.urls
        })),
      getUrl: (shortUrl) => useUrlStore.getState().urls[shortUrl],
      getTotalUrls: () => useUrlStore.getState().urlCount,
      reset: () => set({ urls: {}, urlCount: 0, searchTerm: '', filteredUrls: {} })
    }),
    {
      name: 'url-storage'
    }
  )
);

export default useUrlStore;

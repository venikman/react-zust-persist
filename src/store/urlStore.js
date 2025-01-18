
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useUrlStore = create(
  persist(
    (set, get) => ({
      urls: {},
      urlCount: 0,
      searchTerm: '',
      setSearchTerm: (term) => set({ searchTerm: term }),
      // Derived state (computed value)
      filteredUrls: () => {
        const state = get();
        if (!state.searchTerm) return state.urls;
        return Object.fromEntries(
          Object.entries(state.urls).filter(([short, long]) => 
            long.includes(state.searchTerm) || short.includes(state.searchTerm)
          )
        );
      },
      addUrl: (shortUrl, longUrl) => 
        set((state) => ({
          urls: { ...state.urls, [shortUrl]: longUrl },
          urlCount: state.urlCount + 1
        })),
      getUrl: (shortUrl) => get().urls[shortUrl],
      getTotalUrls: () => get().urlCount,
      reset: () => set({ urls: {}, urlCount: 0 })
    }),
    {
      name: 'url-storage'
    }
  )
);

export default useUrlStore;

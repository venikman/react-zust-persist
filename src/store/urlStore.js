import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

const useUrlStore = create(
  persist(
    (set) => ({
      urls: {},
      searchTerm: '',
      urlCount: 0,
      addUrl: (shortUrl, longUrl) => set((state) => ({
        urls: { ...state.urls, [shortUrl]: longUrl },
        urlCount: state.urlCount + 1
      })),
      setSearchTerm: (term) => set({ searchTerm: term }),
      reset: () => set({ urls: {}, searchTerm: '', urlCount: 0 })
    }),
    {
      name: 'url-storage',
      storage: createJSONStorage(() => localStorage)
    }
  )
);

export default useUrlStore;
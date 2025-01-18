import { create } from 'zustand';

const useUrlStore = create((set) => ({
  urls: {},
  searchTerm: '',
  urlCount: 0,
  addUrl: (shortUrl, longUrl) => set((state) => ({
    urls: { ...state.urls, [shortUrl]: longUrl },
    urlCount: state.urlCount + 1
  })),
  setSearchTerm: (term) => set({ searchTerm: term }),
  reset: () => set({ urls: {}, searchTerm: '', urlCount: 0 })
}));

export default useUrlStore;
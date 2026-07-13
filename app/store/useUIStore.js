import { create } from 'zustand';

export const useUIStore = create((set) => ({
  // Header state
  scrolled: false,
  setScrolled: (scrolled) => set({ scrolled }),

  mobileMenuOpen: false,
  setMobileMenuOpen: (mobileMenuOpen) => set({ mobileMenuOpen }),

  openDropdown: null,
  setOpenDropdown: (openDropdown) => set({ openDropdown }),
  toggleDropdown: (idx) =>
    set((state) => ({
      openDropdown: state.openDropdown === idx ? null : idx,
    })),

  // Search state
  searchOpen: false,
  setSearchOpen: (searchOpen) => set({ searchOpen }),

  // Helper: Reset menu on route change
  resetMenu: () =>
    set({
      mobileMenuOpen: false,
      openDropdown: null,
    }),
}));

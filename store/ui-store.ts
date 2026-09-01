import { create } from "zustand";

export interface ToastNotification {
  id: string;
  message: string;
  type?: "info" | "success" | "error";
  duration?: number;
}

interface UIState {
  isMobileMenuOpen: boolean;
  isSearchOpen: boolean;
  isProfileOpen: boolean;
  toasts: ToastNotification[];
  openMobileMenu: () => void;
  closeMobileMenu: () => void;
  toggleMobileMenu: () => void;
  openSearch: () => void;
  closeSearch: () => void;
  toggleSearch: () => void;
  openProfile: () => void;
  closeProfile: () => void;
  toggleProfile: () => void;
  addToast: (message: string, type?: "info" | "success" | "error", duration?: number) => void;
  removeToast: (id: string) => void;
}

export const useUIStore = create<UIState>((set) => ({
  isMobileMenuOpen: false,
  isSearchOpen: false,
  isProfileOpen: false,
  toasts: [],
  openMobileMenu: () => set({ isMobileMenuOpen: true }),
  closeMobileMenu: () => set({ isMobileMenuOpen: false }),
  toggleMobileMenu: () => set((state) => ({ isMobileMenuOpen: !state.isMobileMenuOpen })),
  openSearch: () => set({ isSearchOpen: true, isProfileOpen: false, isMobileMenuOpen: false }),
  closeSearch: () => set({ isSearchOpen: false }),
  toggleSearch: () => set((state) => ({ isSearchOpen: !state.isSearchOpen, isProfileOpen: false, isMobileMenuOpen: false })),
  openProfile: () => set({ isProfileOpen: true, isSearchOpen: false, isMobileMenuOpen: false }),
  closeProfile: () => set({ isProfileOpen: false }),
  toggleProfile: () => set((state) => ({ isProfileOpen: !state.isProfileOpen, isSearchOpen: false, isMobileMenuOpen: false })),
  addToast: (message, type = "info", duration = 3000) => {
    const id = `toast-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`;
    set((state) => ({
      toasts: [...state.toasts, { id, message, type, duration }]
    }));
  },
  removeToast: (id) => {
    set((state) => ({
      toasts: state.toasts.filter((t) => t.id !== id)
    }));
  }
}));

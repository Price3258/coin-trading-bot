import { create } from "zustand";

interface AuthStore {
  token: string | null;
  isLoggedIn: boolean;
  setToken: (token: string) => void;
  clearToken: () => void;
  hydrateFromStorage: () => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  token: null,
  isLoggedIn: false,
  setToken: (token) => {
    localStorage.setItem("token", token);
    set({ token, isLoggedIn: true });
  },
  clearToken: () => {
    localStorage.removeItem("token");
    set({ token: null, isLoggedIn: false });
  },
  hydrateFromStorage: () => {
    const token = localStorage.getItem("token");
    if (token) {
      set({ token, isLoggedIn: true });
    }
  },
}));

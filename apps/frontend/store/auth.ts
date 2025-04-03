import { create } from "zustand";

interface AuthState {
  isLoggedIn: boolean;
  user: { email: string; name: string } | null;
  setUser: (user: AuthState["user"]) => void;
  clear: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  isLoggedIn: false,
  user: null,
  setUser: (user) => set({ isLoggedIn: true, user }),
  clear: () => set({ isLoggedIn: false, user: null }),
}));

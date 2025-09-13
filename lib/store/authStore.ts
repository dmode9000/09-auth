// створіть Zustand-стор, який зберігає інформацію про користувача (user)
// та булеве значення isAuthenticated. Стор має методи setUser для запису
// даних користувача після успішного логіну та clearIsAuthenticated
// для очищення стану під час виходу.
// Це дозволить в будь-якому компоненті отримувати актуальний стан авторизації.

import { create } from "zustand";
import { User } from "@/types/user";

type AuthStore = {
  isAuthenticated: boolean;
  user: User | null;
  setUser: (user: User) => void;
  clearIsAuthenticated: () => void;
};

export const useAuthStore = create<AuthStore>((set) => ({
  isAuthenticated: false,
  user: null,
  setUser: (user: User) => {
    set(() => ({ user, isAuthenticated: true }));
  },
  clearIsAuthenticated: () => {
    set(() => ({ user: null, isAuthenticated: false }));
  },
}));

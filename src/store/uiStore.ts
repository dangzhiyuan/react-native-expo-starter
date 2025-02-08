import { create } from "zustand";

interface UIState {
  isHeaderVisible: boolean;
  toggleHeader: () => void;
}

export const useUIStore = create<UIState>((set) => ({
  isHeaderVisible: true,
  toggleHeader: () =>
    set((state) => ({ isHeaderVisible: !state.isHeaderVisible })),
}));

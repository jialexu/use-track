import { create } from 'zustand';

interface AppState {
  // UI State
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;

  // Current view
  currentYear: number;
  currentMonth: number;
  setCurrentMonth: (month: number, year: number) => void;

  // Refresh trigger
  refreshTransactions: number;
  triggerRefreshTransactions: () => void;
  refreshItems: number;
  triggerRefreshItems: () => void;
  refreshWatchlists: number;
  triggerRefreshWatchlists: () => void;
}

export const useAppStore = create<AppState>((set) => ({
  sidebarOpen: true,
  setSidebarOpen: (open) => set({ sidebarOpen: open }),

  currentYear: new Date().getFullYear(),
  currentMonth: new Date().getMonth() + 1,
  setCurrentMonth: (month, year) => set({ currentMonth: month, currentYear: year }),

  refreshTransactions: 0,
  triggerRefreshTransactions: () =>
    set((state) => ({ refreshTransactions: state.refreshTransactions + 1 })),
  refreshItems: 0,
  triggerRefreshItems: () =>
    set((state) => ({ refreshItems: state.refreshItems + 1 })),
  refreshWatchlists: 0,
  triggerRefreshWatchlists: () =>
    set((state) => ({ refreshWatchlists: state.refreshWatchlists + 1 })),
}));

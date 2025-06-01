import { devtools } from 'zustand/middleware';
import { create } from 'zustand/react';

import type { ICounterStore } from '../types/ICounterStore.ts';

// Sans chrome devtools
// export const useCounterStore = create<ICounterStore>((set) => ({
//   count: 0,
//   increment: () => set((state) => ({ count: state.count + 1 })),
//   decrement: () => set((state) => ({ count: state.count - 1 })),
//   reset: () => set({ count: 0 }),
// }));

// Avec chrome devtools
export const useCounterStore = create<ICounterStore>()(
  devtools(
    (set) => ({
      count: 0,
      increment: () =>
        set((state) => ({ count: state.count + 1 }), false, 'increment'),
      decrement: () =>
        set((state) => ({ count: state.count - 1 }), false, 'decrement'),
      reset: () => set({ count: 0 }, false, 'reset'),
    }),
    {
      name: 'counter-store',
    },
  ),
);

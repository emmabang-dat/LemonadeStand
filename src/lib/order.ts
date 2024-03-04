import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface Order {
  id: number;
  items: any[];
  totalRevenue: number;
  addOrder: (cart: any, cartSubTotal: number) => void;
}

export const useOrderStore = create(
  persist<Order>(
    (set, get) => ({
      id: 0,
      items: [],
      totalRevenue: 0,
      addOrder: (cart: any, cartSubTotal: number) => {
        const currentItems = get().items;
        const newItem = {
          id: get().id + 1,
          cart,
          cartSubTotal,
        };
        set({
          id: get().id + 1,
          items: [...currentItems, newItem],
          totalRevenue: get().totalRevenue + cartSubTotal,
        });
      },
    }),
    {
      name: "order-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

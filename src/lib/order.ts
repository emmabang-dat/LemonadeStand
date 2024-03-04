import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface Order {
  id: number;
  items: any[];
  totalRevenue: number;
  orderId: number;
  addOrder: (cart: any, cartSubTotal: number, orderId: number) => void;
}

export const useOrderStore = create(
  persist<Order>(
    (set, get) => ({
      id: 0,
      items: [],
      totalRevenue: 0,
      orderId: 0,
      addOrder: (cart: any, cartSubTotal: number, orderId: number) => {
        const currentItems = get().items;
        const newItem = {
          id: get().id + 1,
          cart,
          cartSubTotal,
          orderId,
        };
        set({
          id: get().id + 1,
          items: [...currentItems, newItem],
          totalRevenue: get().totalRevenue + cartSubTotal,
          orderId: get().orderId + 1,
        });
      },
    }),
    {
      name: "order-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

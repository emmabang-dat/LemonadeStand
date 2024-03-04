import { Drink } from "@/interface/cocktail";
import create from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface CartState {
  items: Drink[];

  addToCart: (cocktail: Drink) => void;
  removeFromCart: (drinkId: string) => void;
  clearCart: () => void;
  allOrders: () => void;
}

export const useCartStore = create(
  persist<CartState>(
    (set, get) => ({
      items: [],
      addToCart: (cocktail: Drink) => {
        const currentItems = get().items;
        const existingItemIndex = currentItems.findIndex(
          (item) => item.idDrink === cocktail.idDrink
        );

        if (existingItemIndex >= 0) {
          // The item already exists in the cart
          const newItems = [...currentItems];
          newItems[existingItemIndex].quantity! += 1;
          set({ items: newItems });
        } else {
          // The item does not exist in the cart
          cocktail.quantity = 1;
          set({ items: [...currentItems, cocktail] });
        }
      },

      removeFromCart: (drinkId: string) => {
        const currentItems = get().items;
        const existingItemIndex = currentItems.findIndex(
          (item) => item.idDrink === drinkId
        );

        if (
          existingItemIndex >= 0 &&
          currentItems[existingItemIndex].quantity! !== 1
        ) {
          const newItems = [...currentItems];
          newItems[existingItemIndex].quantity! -= 1;
          set({ items: newItems });
        } else if (
          existingItemIndex >= 0 &&
          currentItems[existingItemIndex].quantity === 1
        ) {
          const newItems = [...currentItems];
          newItems.splice(existingItemIndex, 1);
          set({ items: newItems });
        }
      },

      allOrders: () => {
        const allOrders = JSON.parse(localStorage.getItem("allOrders") || "[]");
        const currentItems = get().items;
        let orderIdCounter = parseInt(
          localStorage.getItem("orderIdCounter") || "0"
        );

        orderIdCounter++;

        const newOrder = {
          orderId: orderIdCounter.toString(),
          cocktails: currentItems,
        };

        allOrders.push(newOrder);
        localStorage.setItem("allOrders", JSON.stringify(allOrders));

        set({ items: [] });
      },

      clearCart: () => {
        set({ items: [] });
      },
    }),

    {
      name: "cart-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

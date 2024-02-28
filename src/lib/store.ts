import create from "zustand";

interface CartState {
  cart: Map<string, number>;
  setCocktails: (cart: Map<string, number>) => void;
  addToCart: (drinkId: string) => void;
  removeFromCart: (drinkId: string) => void;
}

export const useCartStore = create<CartState>((set) => ({
  cart: new Map(),
  setCocktails: (cart) => set({ cart }),
  addToCart: (drinkId) =>
    set((state) => {
      const updatedCart = new Map(state.cart);
      const quantity = updatedCart.get(drinkId) || 0;
      updatedCart.set(drinkId, quantity + 1);
      return { cart: updatedCart };
    }),

  removeFromCart: (drinkId) =>
    set((state) => {
      const updatedCart = new Map(state.cart);
      const quantity = updatedCart.get(drinkId) || 0;
      if (quantity > 1) {
        updatedCart.set(drinkId, quantity - 1);
      } else {
        updatedCart.delete(drinkId);
      }
      return { cart: updatedCart };
    }),
}));

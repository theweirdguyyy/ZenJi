import { create } from "zustand";
import { CartItem } from "@/types/commerce";
import { Product, Color, Size } from "@/types/product";

interface CartState {
  items: CartItem[];
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  addItem: (product: Product, selectedColor: Color, selectedSize: Size, quantity?: number) => void;
  removeItem: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  updateSize: (itemId: string, newSize: Size) => void;
  clearCart: () => void;
  getItemCount: () => number;
  getSubtotal: () => number;
}

export const useCartStore = create<CartState>((set, get) => ({
  items: [],
  isOpen: false,
  openCart: () => set({ isOpen: true }),
  closeCart: () => set({ isOpen: false }),
  toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),

  addItem: (product, selectedColor, selectedSize, quantity = 1) => {
    const itemId = `${product.id}-${selectedColor.hex}-${selectedSize}`;
    set((state) => {
      const existingIndex = state.items.findIndex((item) => item.id === itemId);
      if (existingIndex > -1) {
        const updated = [...state.items];
        updated[existingIndex].quantity += quantity;
        return { items: updated };
      }
      return {
        items: [...state.items, { id: itemId, product, selectedColor, selectedSize, quantity }]
      };
    });
  },

  removeItem: (itemId) => {
    set((state) => ({
      items: state.items.filter((item) => item.id !== itemId)
    }));
  },

  updateQuantity: (itemId, quantity) => {
    if (quantity <= 0) {
      get().removeItem(itemId);
      return;
    }
    set((state) => ({
      items: state.items.map((item) =>
        item.id === itemId ? { ...item, quantity } : item
      )
    }));
  },

  updateSize: (itemId, newSize) => {
    set((state) => {
      const itemToUpdate = state.items.find((item) => item.id === itemId);
      if (!itemToUpdate || itemToUpdate.selectedSize === newSize) return state;

      const newId = `${itemToUpdate.product.id}-${itemToUpdate.selectedColor.hex}-${newSize}`;
      const existingIndex = state.items.findIndex((item) => item.id === newId);

      if (existingIndex > -1) {
        // Merge quantities if item with target size already exists in cart
        const existingItem = state.items[existingIndex];
        return {
          items: state.items
            .filter((item) => item.id !== itemId)
            .map((item) =>
              item.id === newId
                ? { ...item, quantity: item.quantity + itemToUpdate.quantity }
                : item
            )
        };
      }

      // Update size and new unique ID
      return {
        items: state.items.map((item) =>
          item.id === itemId
            ? { ...item, id: newId, selectedSize: newSize }
            : item
        )
      };
    });
  },

  clearCart: () => set({ items: [] }),

  getItemCount: () => {
    return get().items.reduce((total, item) => total + item.quantity, 0);
  },

  getSubtotal: () => {
    return get().items.reduce((total, item) => total + item.product.price * item.quantity, 0);
  }
}));

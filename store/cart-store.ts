import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { Database } from '@/types/supabase';

type Product = Database['public']['Tables']['products']['Row'];

export interface CartItem extends Product {
    quantity: number;
}

interface CartState {
    items: CartItem[];
    addItem: (product: Product) => void;
    removeItem: (productId: string) => void;
    clearCart: () => void;
    totalPrice: () => number;
}

export const useCartStore = create<CartState>()(
    persist(
        (set, get) => ({
            items: [],
            addItem: (product) => {
                set((state) => {
                    const existingItem = state.items.find((item) => item.id === product.id);
                    if (existingItem) {
                        return {
                            items: state.items.map((item) =>
                                item.id === product.id
                                    ? { ...item, quantity: item.quantity + 1 }
                                    : item
                            ),
                        };
                    }
                    return { items: [...state.items, { ...product, quantity: 1 }] };
                });
            },
            removeItem: (productId) => {
                set((state) => ({
                    items: state.items.filter((item) => item.id !== productId),
                }));
            },
            clearCart: () => set({ items: [] }),
            totalPrice: () => {
                return get().items.reduce(
                    (total, item) => total + item.price * item.quantity,
                    0
                );
            },
        }),
        {
            name: 'cart-storage',
            storage: createJSONStorage(() => localStorage),
        }
    )
);

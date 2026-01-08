import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface CartItem {
    id: string
    name: string
    price: number
    quantity: number
}

interface CartStore {
    items: CartItem[]
    addItem: (product: { id: string; name: string; price: number }) => void
    removeItem: (id: string) => void
    updateQuantity: (id: string, delta: number) => void
    clearCart: () => void
    getTotal: () => number
    getItemCount: () => number
}

export const useCart = create<CartStore>()(
    persist(
        (set, get) => ({
            items: [],
            addItem: (product) => {
                const { items } = get()
                const existingItem = items.find((item) => item.id === product.id)

                if (existingItem) {
                    set({
                        items: items.map((item) =>
                            item.id === product.id
                                ? { ...item, quantity: item.quantity + 1 }
                                : item
                        ),
                    })
                } else {
                    set({ items: [...items, { ...product, quantity: 1 }] })
                }
            },
            removeItem: (id) => {
                set({ items: get().items.filter((item) => item.id !== id) })
            },
            updateQuantity: (id, delta) => {
                const { items } = get()
                const updatedItems = items
                    .map((item) =>
                        item.id === id ? { ...item, quantity: item.quantity + delta } : item
                    )
                    .filter((item) => item.quantity > 0)
                set({ items: updatedItems })
            },
            clearCart: () => set({ items: [] }),
            getTotal: () => {
                return get().items.reduce(
                    (total, item) => total + item.price * item.quantity,
                    0
                )
            },
            getItemCount: () => {
                return get().items.reduce((count, item) => count + item.quantity, 0)
            },
        }),
        {
            name: 'menufacil-cart',
        }
    )
)

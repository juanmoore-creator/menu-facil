'use client'

import { useCart } from '@/store/useCart'
import { Plus } from 'lucide-react'

interface AddToCartButtonProps {
    product: {
        id: string
        name: string
        price: number
    }
}

export function AddToCartButton({ product }: AddToCartButtonProps) {
    const addItem = useCart((state) => state.addItem)

    return (
        <button
            onClick={() => addItem(product)}
            className="bg-[var(--primary)] text-white px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1 active:scale-95 transition-transform"
        >
            <Plus className="w-3 h-3" />
            Agregar
        </button>
    )
}

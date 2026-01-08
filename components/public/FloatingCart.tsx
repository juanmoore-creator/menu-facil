'use client'

import { useState } from 'react'
import { useCart } from '@/store/useCart'
import { ShoppingBag, Send, User, Hash } from 'lucide-react'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface FloatingCartProps {
    whatsappNumber: string
}

export function FloatingCart({ whatsappNumber }: FloatingCartProps) {
    const { items, getTotal, getItemCount, clearCart } = useCart()
    const [name, setName] = useState('')
    const [table, setTable] = useState('')
    const [isSending, setIsSending] = useState(false)

    const itemCount = getItemCount()
    const total = getTotal()

    if (itemCount === 0) return null

    const handleCheckout = () => {
        if (!name || !table) {
            alert('Por favor completa tu nombre y número de mesa')
            return
        }

        setIsSending(true)

        // Format message
        const itemsList = items
            .map((item) => `- ${item.quantity}x ${item.name} ($${item.price * item.quantity})`)
            .join('\n')

        const message = `*Nuevo Pedido*\n\n` +
            `*Cliente:* ${name}\n` +
            `*Mesa:* ${table}\n\n` +
            `*Detalle:*\n${itemsList}\n\n` +
            `*Total: $${total}*`

        const encodedMessage = encodeURIComponent(message)
        const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`

        window.open(whatsappUrl, '_blank')
        setIsSending(false)
    }

    return (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 w-full max-w-sm px-4 z-50">
            <Dialog>
                <DialogTrigger asChild>
                    <Button
                        className="w-full h-14 rounded-full shadow-2xl bg-[var(--primary)] hover:bg-[var(--primary)] brightness-110 text-white flex justify-between px-8 text-lg font-bold transition-all active:scale-95"
                    >
                        <div className="flex items-center gap-2">
                            <ShoppingBag className="w-5 h-5" />
                            <span>Ver pedido</span>
                        </div>
                        <span>${total.toLocaleString()}</span>
                    </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle>Tu Pedido</DialogTitle>
                    </DialogHeader>

                    <div className="py-4 space-y-4">
                        <div className="space-y-2 max-h-48 overflow-y-auto pr-2">
                            {items.map((item) => (
                                <div key={item.id} className="flex justify-between items-center text-sm border-b pb-2">
                                    <div className="flex gap-2">
                                        <span className="font-bold">{item.quantity}x</span>
                                        <span>{item.name}</span>
                                    </div>
                                    <span className="font-medium">${(item.price * item.quantity).toLocaleString()}</span>
                                </div>
                            ))}
                        </div>

                        <div className="flex justify-between font-bold text-lg pt-2">
                            <span>Total</span>
                            <span>${total.toLocaleString()}</span>
                        </div>

                        <hr className="my-4" />

                        <div className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="name" className="flex items-center gap-2">
                                    <User className="w-4 h-4" /> Nombre
                                </Label>
                                <Input
                                    id="name"
                                    placeholder="Tu nombre completo"
                                    value={name}
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="table" className="flex items-center gap-2">
                                    <Hash className="w-4 h-4" /> Mesa
                                </Label>
                                <Input
                                    id="table"
                                    placeholder="Número de mesa"
                                    value={table}
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTable(e.target.value)}
                                />
                            </div>
                        </div>
                    </div>

                    <DialogFooter>
                        <Button
                            onClick={handleCheckout}
                            className="w-full bg-[var(--primary)] hover:bg-[var(--primary)] brightness-90 text-white h-12 rounded-xl flex gap-2 font-bold"
                            disabled={isSending}
                        >
                            <Send className="w-4 h-4" />
                            {isSending ? 'Enviando...' : 'Enviar Pedido por WhatsApp'}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    )
}

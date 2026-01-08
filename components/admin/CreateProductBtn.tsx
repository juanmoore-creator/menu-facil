'use client'

import { useState } from 'react'
import { createProduct } from '@/app/admin/actions'
import { Button } from '@/components/ui/button'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Plus } from 'lucide-react'

interface CreateProductBtnProps {
    categoryId: string
}

export function CreateProductBtn({ categoryId }: CreateProductBtnProps) {
    const [open, setOpen] = useState(false)

    async function handleSubmit(formData: FormData) {
        const result = await createProduct(categoryId, formData)

        if (result?.error) {
            alert(result.error)
        } else {
            setOpen(false)
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="outline" size="sm" className="ml-auto">
                    <Plus className="h-4 w-4 mr-1" /> Agregar Producto
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Crear Producto</DialogTitle>
                </DialogHeader>
                <form action={handleSubmit} className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="name" className="text-right">
                            Nombre
                        </Label>
                        <Input
                            id="name"
                            name="name"
                            className="col-span-3"
                            required
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="price" className="text-right">
                            Precio
                        </Label>
                        <Input
                            id="price"
                            name="price"
                            type="number"
                            step="0.01"
                            className="col-span-3"
                            required
                        />
                    </div>
                    <DialogFooter>
                        <Button type="submit">Guardar</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}

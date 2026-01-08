'use client'

import { useState, useEffect } from 'react'
import {
    DndContext,
    closestCenter,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
    DragEndEvent,
} from '@dnd-kit/core'
import {
    arrayMove,
    SortableContext,
    sortableKeyboardCoordinates,
    verticalListSortingStrategy,
    useSortable,
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { GripVertical, Pencil, Trash2 } from 'lucide-react'
import { updateCategoryOrder, deleteCategory, deleteProduct } from '@/app/admin/actions'
import { Database } from '@/types/supabase'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { CreateProductBtn } from './CreateProductBtn'

type Category = Database['public']['Tables']['categories']['Row']
type Product = Database['public']['Tables']['products']['Row']

export type CategoryWithProducts = Category & {
    products: Product[]
}

interface CategoryListProps {
    initialCategories: CategoryWithProducts[]
}

export function CategoryList({ initialCategories }: CategoryListProps) {
    const [items, setItems] = useState(initialCategories)

    // Sync with server data if initialCategories changes (revalidation)
    useEffect(() => {
        setItems(initialCategories)
    }, [initialCategories])


    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                distance: 8,
            },
        }),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    )

    function handleDragEnd(event: DragEndEvent) {
        const { active, over } = event

        if (over && active.id !== over.id) {
            setItems((items) => {
                const oldIndex = items.findIndex((item) => item.id === active.id)
                const newIndex = items.findIndex((item) => item.id === over.id)

                const newItems = arrayMove(items, oldIndex, newIndex)

                // Optimistic update for database
                const updates = newItems.map((item, index) => ({
                    id: item.id,
                    sort_order: index
                }))

                updateCategoryOrder(updates)

                return newItems
            })
        }
    }

    return (
        <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
        >
            <SortableContext
                items={items}
                strategy={verticalListSortingStrategy}
            >
                <div className="space-y-4">
                    {items.map((category) => (
                        <CategoryItem key={category.id} category={category} />
                    ))}
                </div>
            </SortableContext>
        </DndContext>
    )
}

function CategoryItem({ category }: { category: CategoryWithProducts }) {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging
    } = useSortable({ id: category.id })

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        zIndex: isDragging ? 50 : 'auto',
        position: 'relative' as const,
    }

    // Sort products by some criteria if needed, or rely on server order.
    // Server query was: .order('id', { foreignTable: 'products' })

    return (
        <div ref={setNodeRef} style={style}>
            <Card className={`p-4 ${isDragging ? 'shadow-lg ring-2 ring-primary opacity-80' : ''}`}>
                <div className="flex items-center mb-4">
                    <div
                        {...attributes}
                        {...listeners}
                        className="cursor-grab p-1 mr-3 text-muted-foreground hover:text-foreground active:cursor-grabbing outline-none rounded hover:bg-muted"
                    >
                        <GripVertical size={20} />
                    </div>

                    <div className="flex-1 font-medium text-lg">
                        {category.name}
                    </div>

                    <div className="flex gap-2">
                        <CreateProductBtn categoryId={category.id} />
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => console.log('Edit', category.id)}
                        >
                            <Pencil size={18} />
                        </Button>
                        <Button
                            variant="ghost"
                            size="icon"
                            className="text-destructive hover:text-destructive hover:bg-destructive/10"
                            onClick={async () => {
                                if (confirm('¿Seguro que deseas eliminar esta categoría?')) {
                                    await deleteCategory(category.id)
                                }
                            }}
                        >
                            <Trash2 size={18} />
                        </Button>
                    </div>
                </div>

                <div className="pl-10">
                    {category.products && category.products.length > 0 ? (
                        <ul className="space-y-2">
                            {category.products.map(product => (
                                <li key={product.id} className="flex items-center justify-between p-2 bg-muted/50 rounded-md">
                                    <span>{product.name} - ${product.price}</span>
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        className="h-8 w-8 text-destructive p-0"
                                        onClick={async () => {
                                            if (confirm('¿Eliminar producto?')) {
                                                await deleteProduct(product.id)
                                            }
                                        }}
                                    >
                                        <Trash2 size={14} />
                                    </Button>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="text-sm text-muted-foreground italic">No hay productos en esta categoría</p>
                    )}
                </div>
            </Card>
        </div>
    )
}

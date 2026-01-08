'use client'

import { useState } from 'react'
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
import { updateCategoryOrder } from '@/app/admin/actions'
import { Database } from '@/types/supabase'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'

type Category = Database['public']['Tables']['categories']['Row']

interface CategoryListProps {
    initialCategories: Category[]
}

export function CategoryList({ initialCategories }: CategoryListProps) {
    const [items, setItems] = useState(initialCategories)

    const sensors = useSensors(
        useSensor(PointerSensor),
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
                <div className="space-y-2">
                    {items.map((category) => (
                        <CategoryItem key={category.id} category={category} />
                    ))}
                </div>
            </SortableContext>
        </DndContext>
    )
}

function CategoryItem({ category }: { category: Category }) {
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

    return (
        <div ref={setNodeRef} style={style}>
            <Card className={`flex items-center p-4 ${isDragging ? 'shadow-lg ring-2 ring-primary opacity-80' : ''}`}>
                <div
                    {...attributes}
                    {...listeners}
                    className="cursor-grab p-1 mr-3 text-muted-foreground hover:text-foreground active:cursor-grabbing outline-none rounded hover:bg-muted"
                >
                    <GripVertical size={20} />
                </div>

                <div className="flex-1 font-medium">
                    {category.name}
                </div>

                <div className="flex gap-2">
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
                        onClick={() => console.log('Delete', category.id)}
                    >
                        <Trash2 size={18} />
                    </Button>
                </div>
            </Card>
        </div>
    )
}

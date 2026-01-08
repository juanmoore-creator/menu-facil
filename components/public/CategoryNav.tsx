'use client'

import { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'

interface CategoryNavProps {
    categories: { id: string; name: string }[]
}

export function CategoryNav({ categories }: CategoryNavProps) {
    const [activeCategory, setActiveCategory] = useState<string>('')

    useEffect(() => {
        const observers = new Map()

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveCategory(entry.target.id)
                    }
                })
            },
            { rootMargin: '-10% 0px -80% 0px' }
        )

        categories.forEach((cat) => {
            const el = document.getElementById(cat.name.toLowerCase().replace(/\s+/g, '-'))
            if (el) {
                observer.observe(el)
                observers.set(cat.id, el)
            }
        })

        return () => observer.disconnect()
    }, [categories])

    const scrollTo = (id: string) => {
        const el = document.getElementById(id.toLowerCase().replace(/\s+/g, '-'))
        if (el) {
            window.scrollTo({
                top: el.offsetTop - 120,
                behavior: 'smooth'
            })
        }
    }

    return (
        <nav className="sticky top-[64px] z-40 bg-white/80 backdrop-blur-md border-b overflow-x-auto no-scrollbar">
            <div className="flex px-4 py-3 gap-4 min-w-max">
                {categories.map((category) => {
                    const id = category.name.toLowerCase().replace(/\s+/g, '-')
                    const isActive = activeCategory === id

                    return (
                        <button
                            key={category.id}
                            onClick={() => scrollTo(category.name)}
                            className={cn(
                                "text-sm font-medium whitespace-nowrap px-1 pb-1 border-b-2 transition-colors",
                                isActive
                                    ? "border-[var(--primary)] text-[var(--primary)] font-bold"
                                    : "border-transparent text-muted-foreground"
                            )}
                        >
                            {category.name}
                        </button>
                    )
                })}
            </div>
        </nav>
    )
}

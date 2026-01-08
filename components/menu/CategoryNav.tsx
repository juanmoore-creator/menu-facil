'use client';
import { Database } from '@/types/supabase';

type Category = Database['public']['Tables']['categories']['Row'];

export default function CategoryNav({ categories }: { categories: Category[] }) {
    const scrollToCategory = (id: string) => {
        const el = document.getElementById(`category-${id}`);
        if (el) {
            const headerOffset = 140; // Adjust for sticky header/nav height
            const elementPosition = el.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.scrollY - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth',
            });
        }
    };

    return (
        <div className="sticky top-0 z-20 bg-white border-b shadow-sm overflow-x-auto no-scrollbar">
            <div className="flex px-4 py-3 space-x-3">
                {categories.map((cat) => (
                    <button
                        key={cat.id}
                        onClick={() => scrollToCategory(cat.id)}
                        className="whitespace-nowrap px-4 py-1.5 rounded-full text-sm font-medium bg-gray-100 text-gray-700 hover:bg-[var(--primary-color)] hover:text-white transition-all active:scale-95"
                    >
                        {cat.name}
                    </button>
                ))}
            </div>
        </div>
    );
}

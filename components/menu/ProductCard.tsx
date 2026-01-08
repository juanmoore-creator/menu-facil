'use client';
import { Database } from '@/types/supabase';
import { useCartStore } from '@/store/cart-store';
import { Plus } from 'lucide-react';

type Product = Database['public']['Tables']['products']['Row'];

export default function ProductCard({ product }: { product: Product }) {
    const addItem = useCartStore((state) => state.addItem);

    if (!product.is_available) return null;

    return (
        <article className="flex bg-white rounded-xl shadow-sm border border-gray-100 p-3 gap-3 hover:shadow-md transition-shadow">
            {/* Image placeholder - structured to support valid image_url later */}
            <div className="w-24 h-24 bg-gray-100 rounded-lg flex-shrink-0 relative overflow-hidden">
                {product.image_url ? (
                    <img
                        src={product.image_url}
                        alt={product.name}
                        className="object-cover w-full h-full"
                        loading="lazy"
                    />
                ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center text-gray-300 bg-gray-50">
                        <span className="text-[10px] font-medium uppercase tracking-wider">Sin foto</span>
                    </div>
                )}
            </div>

            <div className="flex-1 flex flex-col justify-between">
                <div>
                    <h3 className="font-semibold text-gray-900 leading-tight mb-1">
                        {product.name}
                    </h3>
                    <p className="text-gray-500 text-xs line-clamp-2 leading-relaxed">
                        {product.description}
                    </p>
                </div>

                <div className="flex justify-between items-center mt-2">
                    <span className="font-bold text-gray-900">
                        ${product.price.toLocaleString('es-AR', { minimumFractionDigits: 2 })}
                    </span>
                    <button
                        onClick={() => {
                            addItem(product);
                            console.log('Added to cart:', product.name);
                        }}
                        className="flex items-center justify-center w-8 h-8 rounded-full bg-[var(--primary-color)] text-white hover:opacity-90 active:scale-95 transition-all shadow-sm"
                        aria-label={`Agregar ${product.name} al carrito`}
                    >
                        <Plus size={18} strokeWidth={2.5} />
                    </button>
                </div>
            </div>
        </article>
    );
}

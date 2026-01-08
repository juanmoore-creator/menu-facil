import { Database } from '@/types/supabase';
import ProductCard from './ProductCard';

type Category = Database['public']['Tables']['categories']['Row'];
type Product = Database['public']['Tables']['products']['Row'];

export interface CategoryWithProducts extends Category {
    products: Product[];
}

export default function ProductList({
    categories,
}: {
    categories: CategoryWithProducts[];
}) {
    return (
        <div className="bg-gray-50 min-h-screen pb-24">
            {categories.map((cat) => (
                <section
                    key={cat.id}
                    id={`category-${cat.id}`}
                    className="py-6 px-4 border-b border-gray-100 last:border-0"
                >
                    <h2 className="text-xl font-bold text-gray-800 mb-4 sticky top-14">
                        {cat.name}
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {cat.products.map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                    {cat.products.length === 0 && (
                        <p className="text-gray-400 text-sm italic">
                            No hay productos disponibles en esta categoría.
                        </p>
                    )}
                </section>
            ))}
        </div>
    );
}

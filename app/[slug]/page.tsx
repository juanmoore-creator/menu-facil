import { notFound } from 'next/navigation';
import { createClient } from '@/utils/supabase-server';
import { fontMap, inter } from '@/fonts';
import Header from '@/components/menu/Header';
import CategoryNav from '@/components/menu/CategoryNav';
import ProductList, { CategoryWithProducts } from '@/components/menu/ProductList';

export default async function MenuPage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;
    const supabase = await createClient();

    // 1. Fetch Profile
    const { data: profile } = await supabase
        .from('profiles')
        .select('*')
        .eq('slug', slug)
        .single();

    if (!profile || !profile.is_active) {
        notFound();
    }

    // 2. Fetch Categories with Products
    // We filter products by is_available: true.
    // Note: inner filters on joined tables in Supabase can be tricky.
    // We will fetch and then filter empty categories if needed, or rely on correct data.
    const { data: categoriesData, error } = await supabase
        .from('categories')
        .select('*, products(*)')
        .eq('profile_id', profile.id)
        .eq('products.is_available', true)
        .order('sort_order', { ascending: true });
    // .order('id', { foreignTable: 'products', ascending: true }); // Product sorting if supported directly or we sort in JS

    if (error) {
        console.error('Error fetching menu:', error);
        // Handle error gracefully, maybe 500 or just empty
    }

    const categories = (categoriesData || []) as CategoryWithProducts[];

    // 3. Select Font
    // Default to Inter if font_family is not found or null
    const selectedFont =
        profile.font_family && fontMap[profile.font_family]
            ? fontMap[profile.font_family]
            : inter;

    // 4. Inject Theme Color
    // CSS variable --primary-color
    const themeStyle = {
        '--primary-color': profile.theme_color || '#000000',
    } as React.CSSProperties;

    return (
        <main className={`min-h-screen bg-gray-50 ${selectedFont.className}`} style={themeStyle}>
            <Header profile={profile} />
            <CategoryNav categories={categories} />
            <ProductList categories={categories} />
        </main>
    );
}

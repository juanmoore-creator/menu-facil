import { createClient } from '@/utils/supabase-server'
import { CategoryList, CategoryWithProducts } from '@/components/admin/CategoryList'
import { CreateCategoryBtn } from '@/components/admin/CreateCategoryBtn'

export default async function AdminDashboard() {
    const supabase = await createClient()

    const { data: categories } = await supabase
        .from('categories')
        .select('*, products(*)')
        .order('sort_order', { ascending: true })
        .order('id', { foreignTable: 'products', ascending: true })

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold tracking-tight">Mi Menú</h1>
                <CreateCategoryBtn />
            </div>

            <CategoryList initialCategories={(categories || []) as unknown as CategoryWithProducts[]} />
        </div>
    )
}

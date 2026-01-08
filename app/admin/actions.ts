'use server'

import { createClient } from '@/utils/supabase-server'
import { revalidatePath } from 'next/cache'

export async function updateCategoryOrder(items: { id: string; sort_order: number }[]) {
    const supabase = await createClient()

    const updates = items.map((item) =>
        supabase.from('categories').update({ sort_order: item.sort_order }).eq('id', item.id)
    )

    await Promise.all(updates)
    revalidatePath('/admin')
}

export async function createCategory(formData: FormData) {
    const supabase = await createClient()
    const name = formData.get('name') as string

    if (!name) return

    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
        throw new Error("Unauthorized")
    }

    await supabase.from('categories').insert({
        name,
        profile_id: user.id,
        sort_order: 9999
    })

    revalidatePath('/admin')
}

export async function createProduct(categoryId: string, formData: FormData) {
    const supabase = await createClient()
    const name = formData.get('name') as string
    const price = Number(formData.get('price'))

    if (!name || !categoryId) return

    await supabase.from('products').insert({
        name,
        price: isNaN(price) ? 0 : price,
        category_id: categoryId,
        is_available: true
    })

    revalidatePath('/admin')
}

export async function deleteCategory(id: string) {
    const supabase = await createClient()
    await supabase.from('categories').delete().eq('id', id)
    revalidatePath('/admin')
}

export async function deleteProduct(id: string) {
    const supabase = await createClient()
    await supabase.from('products').delete().eq('id', id)
    revalidatePath('/admin')
}

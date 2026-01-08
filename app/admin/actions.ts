'use server'

import { createClient } from '@/utils/supabase-server'

export async function updateCategoryOrder(items: { id: string; sort_order: number }[]) {
    const supabase = await createClient()

    const updates = items.map((item) =>
        supabase.from('categories').update({ sort_order: item.sort_order }).eq('id', item.id)
    )

    await Promise.all(updates)
}

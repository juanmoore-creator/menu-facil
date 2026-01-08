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
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
        return { error: "No autorizado" }
    }

    const name = formData.get('name') as string
    const price = Number(formData.get('price'))

    if (!name || !categoryId) {
        return { error: "Nombre y categoría son requeridos" }
    }

    const { error } = await supabase.from('products').insert({
        name,
        price: isNaN(price) ? 0 : price,
        category_id: categoryId,
        profile_id: user.id,
        is_available: true
    })

    if (error) {
        console.error("Error creating product:", error)
        return { error: "Error al crear el producto: " + error.message }
    }

    revalidatePath('/admin')
    return { success: true }
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

export async function updateProfile(prevState: any, formData: FormData) {
    console.log("Updating profile starts...");
    const supabase = await createClient()
    const { data: { user }, error: authError } = await supabase.auth.getUser()

    if (authError || !user) {
        console.error("Auth error:", authError);
        return { error: "No autorizado o sesión expirada." }
    }

    const name = formData.get('name') as string
    const slug = formData.get('slug') as string
    const whatsapp_number = formData.get('whatsapp_number') as string
    const theme_color = formData.get('theme_color') as string
    const font_family = formData.get('font_family') as string

    console.log("Data to update:", { name, slug, whatsapp_number, theme_color, font_family, userId: user.id });

    // Validate slug
    const slugRegex = /^[a-z0-9-]+$/
    if (!slugRegex.test(slug)) {
        return { error: "El URL solo puede contener letras minúsculas, números y guiones." }
    }

    // Check slug uniqueness
    const { data: existingSlug, error: slugCheckError } = await supabase
        .from('profiles')
        .select('id')
        .eq('slug', slug)
        .neq('id', user.id)
        .single()

    // .single() returns error if no rows found which is GOOD here, or if multiple found
    // We only care if we FOUND a row (data is not null)

    if (existingSlug) {
        return { error: "Este URL ya está en uso. Por favor elige otro." }
    }

    const { error, data } = await supabase.from('profiles').update({
        name,
        slug,
        whatsapp_number,
        theme_color,
        font_family,
        updated_at: new Date().toISOString()
    }).eq('id', user.id).select()

    if (error) {
        console.error("Supabase Update Error:", error);
        return { error: `Error al actualizar el perfil: ${error.message} (${error.code})` }
    }

    if (data && data.length === 0) {
        console.log("No rows updated. Profile might not exist. Attempting insert...");

        // If update returned 0 rows, it means the row with id=user.id doesn't exist.
        // We should try to insert it.
        const { error: insertError, data: insertData } = await supabase.from('profiles').insert({
            id: user.id,
            name,
            slug,
            whatsapp_number,
            theme_color,
            font_family,
            updated_at: new Date().toISOString()
        }).select();

        if (insertError) {
            console.error("Supabase Insert Error:", insertError);
            return { error: `Error al crear el perfil: ${insertError.message}` }
        }
        console.log("Insert success:", insertData);
        revalidatePath('/admin/settings')
        return { success: "Perfil creado correctamente." }
    }

    console.log("Update success:", data);

    revalidatePath('/admin/settings')
    return { success: "Perfil actualizado correctamente." }
}

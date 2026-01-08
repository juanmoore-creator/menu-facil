export type Json =
    | string
    | number
    | boolean
    | null
    | { [key: string]: Json | undefined }
    | Json[]

export interface Database {
    public: {
        Tables: {
            profiles: {
                Row: {
                    id: string
                    slug: string
                    name: string
                    theme_color: string
                    font_family: string
                    whatsapp_number: string
                    is_active: boolean
                }
                Insert: {
                    id: string
                    slug: string
                    name: string
                    theme_color?: string
                    font_family?: string
                    whatsapp_number: string
                    is_active?: boolean
                }
                Update: {
                    id?: string
                    slug?: string
                    name?: string
                    theme_color?: string
                    font_family?: string
                    whatsapp_number?: string
                    is_active?: boolean
                }
            }
            categories: {
                Row: {
                    id: string
                    profile_id: string
                    name: string
                    sort_order: number
                }
                Insert: {
                    id?: string
                    profile_id: string
                    name: string
                    sort_order?: number
                }
                Update: {
                    id?: string
                    profile_id?: string
                    name?: string
                    sort_order?: number
                }
            }
            products: {
                Row: {
                    id: string
                    category_id: string
                    name: string
                    price: number
                    description: string | null
                    is_available: boolean
                    image_url: string | null
                }
                Insert: {
                    id?: string
                    category_id: string
                    name: string
                    price: number
                    description?: string | null
                    is_available?: boolean
                    image_url?: string | null
                }
                Update: {
                    id?: string
                    category_id?: string
                    name?: string
                    price?: number
                    description?: string | null
                    is_available?: boolean
                    image_url?: string | null
                }
            }
        }
    }
}

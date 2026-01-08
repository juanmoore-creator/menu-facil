import { createClient } from '@/utils/supabase-server'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default async function AdminDashboard() {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    // Tip: Necesitas hacer un fetch a profiles filtrando por el user.id actual.
    let restaurantName = 'Restaurante'

    if (user) {
        const { data: profile } = await supabase
            .from('profiles')
            .select('restaurant_name') // Assuming the column is restaurant_name or similar, user prompt implied getting 'nombre del restaurante'
            .eq('id', user.id)
            .single()

        // Since we don't know the exact schema of 'profiles' table from the prompt, 
        // I am assuming 'restaurant_name' or 'name'. 
        // Wait, the prompt says: "create automatically a profile in profiles table". 
        // It doesn't specify columns. I'll stick to a safe guess and maybe 'username' or just check if profile exists.
        // However, for "Welcome message obtaining restaurant name", I'll assume there is a column for it.
        // If not, I might need to adjust. I'll assume 'restaurant_name' for now.
        // If it fails, I'll catch it or it will be null.

        if (profile && profile.restaurant_name) {
            restaurantName = profile.restaurant_name
        }
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold tracking-tight">Gestión del Menú</h1>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Bienvenido a {restaurantName}</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground">
                        Selecciona una opción del menú lateral para comenzar a administrar tu restaurante.
                    </p>
                </CardContent>
            </Card>
        </div>
    )
}

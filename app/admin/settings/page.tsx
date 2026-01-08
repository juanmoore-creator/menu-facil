import { createClient } from '@/utils/supabase-server'
import { redirect } from 'next/navigation'
import SettingsForm from './settings-form'

export const dynamic = 'force-dynamic'

export default async function SettingsPage() {
    const supabase = await createClient()

    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
        redirect('/login')
    }

    const { data: profile } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single()

    if (!profile) {
        // Should ideally handle this case (create profile if missing or error)
        return <div>Error: Perfil no encontrado</div>
    }

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-3xl font-bold tracking-tight">Configuración</h2>
                <p className="text-muted-foreground">
                    Administra la información de tu restaurante y personaliza tu página.
                </p>
            </div>

            <SettingsForm initialData={profile} key={profile.id + '-' + profile.slug} />
        </div>
    )
}

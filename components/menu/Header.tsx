import { Database } from '@/types/supabase';

type Profile = Database['public']['Tables']['profiles']['Row'];

export default function Header({ profile }: { profile: Profile }) {
    return (
        <div className="bg-[var(--primary-color)] text-white pt-8 pb-6 px-6 text-center">
            <div className="w-24 h-24 mx-auto bg-white/20 rounded-full mb-4 flex items-center justify-center overflow-hidden border-2 border-white/30 backdrop-blur-sm shadow-lg">
                {/* Placeholder for now as image_url is missing in schema, user asked for image but schema doesn't have it yet */}
                <span className="text-4xl font-bold">{profile.name.charAt(0)}</span>
            </div>
            <h1 className="text-2xl font-bold tracking-tight">{profile.name}</h1>
            <p className="text-sm opacity-90 mt-1">¡Bienvenido!</p>
        </div>
    );
}

'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { createClient } from '@/utils/supabase'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { Menu, List, Settings, CreditCard, LogOut } from 'lucide-react'

const navItems = [
    { href: '/admin', label: 'Mi Menú', icon: List },
    { href: '/admin/settings', label: 'Personalización', icon: Settings },
    { href: '/admin/subscription', label: 'Suscripción', icon: CreditCard },
]

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname()
    const router = useRouter()
    const supabase = createClient()
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

    const handleSignOut = async () => {
        await supabase.auth.signOut()
        router.push('/login')
        router.refresh()
    }

    const NavContent = () => (
        <div className="flex flex-col h-full">
            <div className="p-6">
                <h1 className="text-2xl font-bold">Panel Admin</h1>
            </div>
            <nav className="flex-1 px-4 space-y-2">
                {navItems.map((item) => {
                    const Icon = item.icon
                    const isActive = pathname === item.href

                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${isActive
                                    ? 'bg-primary text-primary-foreground'
                                    : 'hover:bg-accent hover:text-accent-foreground'
                                }`}
                        >
                            <Icon className="h-5 w-5" />
                            <span>{item.label}</span>
                        </Link>
                    )
                })}
            </nav>
            <div className="p-4 border-t">
                <Button
                    variant="outline"
                    className="w-full justify-start gap-3"
                    onClick={handleSignOut}
                >
                    <LogOut className="h-5 w-5" />
                    <span>Cerrar Sesión</span>
                </Button>
            </div>
        </div>
    )

    return (
        <div className="min-h-screen flex bg-gray-100 dark:bg-gray-900">
            {/* Desktop Sidebar */}
            <aside className="hidden md:block w-64 bg-white dark:bg-gray-800 border-r">
                <NavContent />
            </aside>

            {/* Mobile Header & Content */}
            <div className="flex-1 flex flex-col">
                <header className="md:hidden flex items-center p-4 bg-white dark:bg-gray-800 border-b">
                    <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
                        <SheetTrigger asChild>
                            <Button variant="ghost" size="icon">
                                <Menu className="h-6 w-6" />
                                <span className="sr-only">Menu</span>
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="left" className="p-0 w-64">
                            <NavContent />
                        </SheetContent>
                    </Sheet>
                    <span className="ml-4 font-semibold text-lg">Panel Admin</span>
                </header>

                <main className="flex-1 p-6 overflow-auto">
                    {children}
                </main>
            </div>
        </div>
    )
}

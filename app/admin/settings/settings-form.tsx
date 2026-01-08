'use client'

import { useState, useEffect, useActionState } from 'react'
import { updateProfile } from '../actions'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Loader2, Save, ExternalLink, Download } from "lucide-react"
import Link from 'next/link'
import { toast } from 'sonner'

const fontOptions = [
    { value: 'Inter', label: 'Inter' },
    { value: 'Lato', label: 'Lato' },
    { value: 'Playfair Display', label: 'Playfair Display' },
    { value: 'Roboto Mono', label: 'Roboto Mono' },
]

interface SettingsFormProps {
    initialData: {
        name: string
        slug: string
        whatsapp_number: string
        theme_color: string
        font_family: string
    }
}

export default function SettingsForm({ initialData }: SettingsFormProps) {
    const [state, formAction, isPending] = useActionState(updateProfile, null)
    const [name, setName] = useState(initialData.name)
    const [slug, setSlug] = useState(initialData.slug)
    const [whatsapp, setWhatsapp] = useState(initialData.whatsapp_number)
    const [themeColor, setThemeColor] = useState(initialData.theme_color || '#000000')
    const [fontFamily, setFontFamily] = useState(initialData.font_family || 'Inter')
    const [currentUrl, setCurrentUrl] = useState('')
    const [mounted, setMounted] = useState(false)

    // Update URL preview when slug changes
    const handleSlugChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSlug(e.target.value)
    }

    // Set current URL and mounted state on mount
    useEffect(() => {
        setMounted(true)
        if (typeof window !== 'undefined') {
            setCurrentUrl(window.location.origin)
        }
    }, [])

    // Show toast on state change
    useEffect(() => {
        if (state?.error) {
            toast.error(state.error)
        } else if (state?.success) {
            toast.success(state.success)
        }
    }, [state])

    const publicUrl = `${currentUrl}/${slug}`
    const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(publicUrl)}`

    return (
        <div className="grid gap-6 lg:grid-cols-2">
            <div className="lg:col-span-1">
                <form action={formAction}>
                    <Card>
                        <CardHeader>
                            <CardTitle>Configuración del Restaurante</CardTitle>
                            <CardDescription>
                                Personaliza la apariencia y los datos de contacto de tu menú digital.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="name">Nombre del Restaurante</Label>
                                <Input
                                    id="name"
                                    name="name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                    placeholder="Ej: Tacos El Rey"
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="slug">URL del Menú (Slug)</Label>
                                <div className="flex items-center space-x-2">
                                    <span className="text-sm text-muted-foreground">{currentUrl}/</span>
                                    <Input
                                        id="slug"
                                        name="slug"
                                        value={slug}
                                        onChange={handleSlugChange}
                                        required
                                        placeholder="tacos-el-rey"
                                        pattern="[a-z0-9\-]+"
                                        title="Solo letras minúsculas, números y guiones"
                                    />
                                </div>
                                <p className="text-xs text-muted-foreground">
                                    Esta será la dirección web única de tu menú.
                                </p>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="whatsapp_number">Número de WhatsApp</Label>
                                <Input
                                    id="whatsapp_number"
                                    name="whatsapp_number"
                                    value={whatsapp || ''}
                                    onChange={(e) => setWhatsapp(e.target.value)}
                                    required
                                    placeholder="5491112345678"
                                    type="tel"
                                />
                                <p className="text-xs text-muted-foreground">
                                    Incluye el código de país sin espacios ni símbolos (Ej: 54911...).
                                </p>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="theme_color">Color del Tema</Label>
                                    <div className="flex gap-2">
                                        <Input
                                            id="theme_color"
                                            name="theme_color"
                                            type="color"
                                            value={themeColor}
                                            onChange={(e) => setThemeColor(e.target.value)}
                                            className="w-12 h-10 p-1 cursor-pointer"
                                        />
                                        <Input
                                            value={themeColor}
                                            onChange={(e) => setThemeColor(e.target.value)}
                                            className="flex-1"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="font_family">Tipografía</Label>
                                    <input type="hidden" name="font_family" value={fontFamily} />
                                    <Select
                                        defaultValue={fontFamily}
                                        onValueChange={setFontFamily}
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Selecciona una fuente" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {fontOptions.map((font) => (
                                                <SelectItem key={font.value} value={font.value} style={{ fontFamily: font.value }}>
                                                    {font.label}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>

                            <Button type="submit" className="w-full" disabled={isPending}>
                                {isPending ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        Guardando...
                                    </>
                                ) : (
                                    <>
                                        <Save className="mr-2 h-4 w-4" />
                                        Guardar Cambios
                                    </>
                                )}
                            </Button>
                        </CardContent>
                    </Card>
                </form>
            </div>

            <div className="lg:col-span-1 space-y-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Código QR</CardTitle>
                        <CardDescription>
                            Escanea este código para ver tu menú. Descárgalo e imprímelo para tus mesas.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="flex flex-col items-center space-y-4">
                        <div className="bg-white p-4 rounded-lg border shadow-sm flex items-center justify-center min-h-[200px] min-w-[200px]">
                            {mounted ? (
                                /* eslint-disable-next-line @next/next/no-img-element */
                                <img
                                    src={qrCodeUrl}
                                    alt={`QR Code para ${publicUrl}`}
                                    className="w-48 h-48 object-contain"
                                />
                            ) : (
                                <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                            )}
                        </div>
                        <div className="space-y-1 text-center">
                            <p className="text-sm font-medium">Enlace público:</p>
                            <Link href={`/${slug}`} target="_blank" className="text-sm text-blue-600 hover:underline flex items-center justify-center gap-1">
                                {mounted ? publicUrl : '...'} <ExternalLink className="h-3 w-3" />
                            </Link>
                        </div>
                        <Button variant="outline" onClick={() => {
                            fetch(qrCodeUrl)
                                .then(response => response.blob())
                                .then(blob => {
                                    const url = window.URL.createObjectURL(blob);
                                    const a = document.createElement('a');
                                    a.href = url;
                                    a.download = `qr-${slug}.png`;
                                    document.body.appendChild(a);
                                    a.click();
                                    window.URL.revokeObjectURL(url);
                                    document.body.removeChild(a);
                                });
                        }}>
                            <Download className="mr-2 h-4 w-4" />
                            Descargar QR
                        </Button>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Vista Previa</CardTitle>
                        <CardDescription>
                            Así es como se ve tu configuración actual.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="rounded-lg border p-4 space-y-4 bg-gray-50/50">
                            <div className="h-8 w-32 rounded animate-pulse" style={{ backgroundColor: themeColor }}></div>
                            <div className="space-y-2">
                                <div className="h-4 w-3/4 bg-gray-200 rounded" style={{ fontFamily }}>{name || 'Nombre del Restaurante'}</div>
                                <div className="h-4 w-1/2 bg-gray-200 rounded">WhatsApp: {whatsapp}</div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}

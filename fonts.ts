import { Inter, Playfair_Display, Lato, Roboto_Mono } from 'next/font/google'

export const inter = Inter({
    subsets: ['latin'],
    display: 'swap',
    variable: '--font-inter',
})

export const playfair = Playfair_Display({
    subsets: ['latin'],
    display: 'swap',
    variable: '--font-playfair',
})

export const lato = Lato({
    weight: ['400', '700'],
    subsets: ['latin'],
    display: 'swap',
    variable: '--font-lato',
})

export const robotoMono = Roboto_Mono({
    subsets: ['latin'],
    display: 'swap',
    variable: '--font-roboto-mono',
})

export const fonts = {
    inter,
    playfair,
    lato,
    robotoMono,
}

export const fontMap: Record<string, any> = {
    'Inter': inter,
    'Playfair Display': playfair,
    'Lato': lato,
    'Roboto Mono': robotoMono,
}

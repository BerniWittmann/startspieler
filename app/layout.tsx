import type { Metadata } from 'next'
import { Cinzel, Exo_2 } from 'next/font/google'
import './globals.css'

const cinzel = Cinzel({
  variable: '--font-cinzel',
  subsets: ['latin'],
  weight: ['400', '700', '900'],
})

const exo2 = Exo_2({
  variable: '--font-exo2',
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
})

export const metadata: Metadata = {
  title: 'Startspieler',
  description: 'Terraforming Mars Starting Player Picker',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${cinzel.variable} ${exo2.variable} h-full`}>
      <body className="min-h-dvh flex flex-col">{children}</body>
    </html>
  )
}

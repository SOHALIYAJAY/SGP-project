import React from "react"
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'
import { LenisProvider } from '@/components/lenis-provider'
import { Navigation } from '@/components/navigation'
import { Header } from '@/components/header'

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: 'Business Analysis & Prediction System',
  description: 'AI-powered business intelligence platform for comprehensive company analysis and predictions',
  generator: 'v0.app',
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} font-sans antialiased bg-background text-foreground min-h-screen`}>
        <LenisProvider>
          <Header />
          <div className="flex min-h-[calc(100vh-4rem)]">
            <Navigation />
            <main className="flex-1 min-w-0">
              <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                {children}
              </div>
            </main>
          </div>
        </LenisProvider>
        <Analytics />
      </body>
    </html>
  )
}

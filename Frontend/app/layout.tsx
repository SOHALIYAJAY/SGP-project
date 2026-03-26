import React from "react"
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'
import { LenisProvider } from '@/components/lenis-provider'
import { Navigation } from '@/components/navigation'
import { Header } from '@/components/header'
import { ConditionalFooter } from '@/components/conditional-footer'

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: 'NexusAI - Intelligent Business Analytics',
  description: 'AI-powered platform for comprehensive company analysis, growth forecasting, and strategic business insights',
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
      <body className={`${inter.variable} font-sans antialiased bg-background text-foreground`}>
        <LenisProvider>
          <div className="flex min-h-screen">
            <Navigation />
            <div className="flex-1 min-w-0 flex flex-col">
              <Header />
              <main className="flex-1 px-6 lg:px-10 xl:px-16 py-6">
                {/* Enhanced content wrapper with subtle background */}
                <div className="relative">
                  {/* Subtle animated background pattern */}
                  <div className="absolute inset-0 opacity-30">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
                    <div className="absolute inset-0" style={{
                      backgroundImage: `radial-gradient(circle at 20% 50%, rgba(6, 182, 212, 0.1) 0%, transparent 50%), 
                                   radial-gradient(circle at 80% 80%, rgba(168, 85, 247, 0.1) 0%, transparent 50%), 
                                   radial-gradient(circle at 40% 20%, rgba(6, 182, 212, 0.05) 0%, transparent 50%)`,
                    }} />
                  </div>
                  <div className="relative z-10">
                    {children}
                  </div>
                </div>
              </main>
              <ConditionalFooter />
            </div>
          </div>
        </LenisProvider>
        <Analytics />
      </body>
    </html>
  )
}

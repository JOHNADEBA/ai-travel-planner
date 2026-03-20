import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { cn } from '@/lib/utils'

const inter = Inter({ subsets: ['latin'] })

const websiteUrl = process.env.NEXT_PUBLIC_WEBSITE_URL || 'https://ai-travel-planner.vercel.app'

export const metadata: Metadata = {
  title: 'AI Travel Planner | Your Intelligent Travel Companion',
  description: 'Plan your perfect trip with AI-powered personalized itineraries, flight recommendations, and weather forecasts.',
  keywords: 'travel planner, AI travel, itinerary generator, vacation planner, trip planning',
  authors: [{ name: 'John Adeba' }],
  metadataBase: new URL(websiteUrl),
  openGraph: {
    title: 'AI Travel Planner',
    description: 'Your Intelligent Travel Companion',
    url: websiteUrl,
    siteName: 'AI Travel Planner',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'AI Travel Planner',
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI Travel Planner',
    description: 'Your Intelligent Travel Companion',
    images: ['/og-image.png'],
  },
  alternates: {
    canonical: websiteUrl,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body className={cn(inter.className, 'bg-secondary-950 text-white antialiased')}>
        <div className="min-h-screen flex flex-col">
          <Header />
          <main className="flex-1 pt-16 md:pt-20">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  )
}
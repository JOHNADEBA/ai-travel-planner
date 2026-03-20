'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Plane, Compass, Home, ArrowLeft, Globe, MapPin } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'

export default function NotFound() {
  const popularDestinations = [
    { name: "Paris", emoji: "🗼" },
    { name: "Tokyo", emoji: "🗾" },
    { name: "Rome", emoji: "🏛️" },
    { name: "Bali", emoji: "🏝️" },
    { name: "New York", emoji: "🗽" },
    { name: "Swiss Alps", emoji: "🏔️" }
  ]

  return (
    <main className="min-h-screen bg-gradient-to-b from-secondary-900 to-secondary-950 flex items-center justify-center px-4">
      <div className="container mx-auto max-w-4xl py-20">
        <div className="text-center">
          <motion.div
            initial={{ x: -100, opacity: 0, rotate: -15 }}
            animate={{ x: 0, opacity: 1, rotate: 0 }}
            transition={{ duration: 0.6, type: "spring" }}
            className="mb-8"
          >
            <div className="relative inline-block">
              <div className="absolute inset-0 bg-primary-500/20 rounded-full blur-xl animate-pulse" />
              <Plane size={80} className="text-primary-400 relative z-10 rotate-45" />
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-8xl md:text-9xl font-bold mb-4"
          >
            <span className="gradient-text">404</span>
          </motion.h1>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-2xl md:text-3xl font-bold text-white mb-4"
          >
            Oops! This Destination Doesn't Exist
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-secondary-400 text-lg max-w-2xl mx-auto mb-8"
          >
            The page you're looking for seems to have wandered off the map. 
            Don't worry, we'll help you find your way back to your travel planning adventure.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
          >
            <Link href="/">
              <Button variant="primary" size="lg" className="w-full sm:w-auto">
                <Home size={18} className="mr-2" />
                Back to Home
              </Button>
            </Link>
            <Link href="/">
              <Button variant="outline" size="lg" className="w-full sm:w-auto">
                <ArrowLeft size={18} className="mr-2" />
                Plan a Trip
              </Button>
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <Card className="p-6 max-w-2xl mx-auto">
              <div className="flex items-center justify-center gap-2 mb-4">
                <Compass size={20} className="text-primary-400" />
                <h3 className="text-white font-semibold">Popular Destinations</h3>
                <Globe size={20} className="text-primary-400" />
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {popularDestinations.map((dest) => (
                  <Link
                    key={dest.name}
                    href={`/?destination=${encodeURIComponent(dest.name)}`}
                    className="group"
                  >
                    <div className="flex items-center justify-center gap-2 px-4 py-2 bg-secondary-800/50 rounded-lg border border-secondary-700 hover:border-primary-500/50 transition-all group-hover:bg-secondary-800">
                      <span className="text-xl">{dest.emoji}</span>
                      <span className="text-secondary-300 group-hover:text-primary-400 text-sm transition-colors">
                        {dest.name}
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </Card>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="text-secondary-500 text-sm mt-8"
          >
            Need help finding something? <Link href="/contact" className="text-primary-400 hover:underline">Contact our travel experts</Link>
          </motion.p>
        </div>
      </div>
    </main>
  )
}
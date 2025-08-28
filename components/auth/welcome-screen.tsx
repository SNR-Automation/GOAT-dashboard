"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { Mountain, Sparkles } from "lucide-react"
import { motivationalQuotes } from "@/lib/demo-data"
import { BorderBeam } from "@/components/ui/border-beam"

interface User {
  name: string
  role: 'employee' | 'executive'
}

export function WelcomeScreen() {
  const [user, setUser] = useState<User | null>(null)
  const [currentQuote, setCurrentQuote] = useState(0)
  const [progress, setProgress] = useState(0)
  const router = useRouter()

  useEffect(() => {
    // Get user data from localStorage
    const userData = localStorage.getItem('user_data')
    if (userData) {
      setUser(JSON.parse(userData))
    }

    // Rotate quotes every 1 second
    const quoteInterval = setInterval(() => {
      setCurrentQuote(prev => (prev + 1) % motivationalQuotes.length)
    }, 1000)

    // Progress bar animation
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval)
          clearInterval(quoteInterval)
          
          // Redirect based on role
          setTimeout(() => {
            if (user?.role === 'executive') {
              router.push('/executive')
            } else {
              router.push('/employee')
            }
          }, 500)
          
          return 100
        }
        return prev + 2
      })
    }, 60) // 3 seconds total (100 / 2 * 60ms)

    return () => {
      clearInterval(quoteInterval)
      clearInterval(progressInterval)
    }
  }, [user, router])

  if (!user) {
    return null
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-yellow-400 via-yellow-500 to-orange-500 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-64 h-64 bg-white/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-black/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
      </div>

      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 text-center max-w-2xl mx-4"
      >
        <div className="relative bg-white/95 backdrop-blur-sm rounded-3xl p-12 shadow-2xl border border-white/20 overflow-hidden">
          <BorderBeam duration={4} size={150} colorFrom="#FFD700" colorTo="#FF8C00" />
          
          {/* Logo Section */}
          <motion.div
            initial={{ y: -30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-8"
          >
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="p-4 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-2xl">
                <Mountain className="h-12 w-12 text-black" />
              </div>
              <div className="text-left">
                <h1 className="text-4xl font-bold text-black">GOAT Media</h1>
                <p className="text-lg text-gray-700">Powered by SNR AI Automation</p>
              </div>
            </div>
          </motion.div>

          {/* Welcome Message */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mb-8"
          >
            <h2 className="text-3xl font-bold text-black mb-2">
              Welcome back, {user.name}!
            </h2>
            <div className="flex items-center justify-center gap-2 mb-4">
              <Sparkles className="h-5 w-5 text-yellow-600" />
              <p className="text-xl text-gray-700 capitalize">
                {user.role} Dashboard
              </p>
              <Sparkles className="h-5 w-5 text-yellow-600" />
            </div>
          </motion.div>

          {/* Rotating Quotes */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mb-8 h-16 flex items-center justify-center"
          >
            <AnimatePresence mode="wait">
              <motion.p
                key={currentQuote}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="text-lg text-gray-600 italic text-center max-w-lg"
              >
                "{motivationalQuotes[currentQuote]}"
              </motion.p>
            </AnimatePresence>
          </motion.div>

          {/* Progress Bar */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="mb-6"
          >
            <div className="relative w-full h-2 bg-gray-200 rounded-full overflow-hidden">
              <motion.div
                className="absolute top-0 left-0 h-full bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full"
                style={{ width: `${progress}%` }}
                transition={{ duration: 0.1 }}
              />
              <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse" />
            </div>
            <p className="text-sm text-gray-600 mt-2 text-center">
              Preparing your dashboard... {Math.round(progress)}%
            </p>
          </motion.div>

          {/* Loading Animation */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1 }}
            className="flex justify-center"
          >
            <div className="flex gap-1">
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  className="w-3 h-3 bg-yellow-500 rounded-full"
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0.5, 1, 0.5],
                  }}
                  transition={{
                    duration: 1,
                    repeat: Infinity,
                    delay: i * 0.2,
                  }}
                />
              ))}
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  )
}
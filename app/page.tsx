"use client"

export default function Home() {
  const router = useRouter()
import { useEffect } from "react"
  useEffect(() => {
    // Check if user is authenticated
    const token = localStorage.getItem("auth_token")
    
    if (token) {
      // Verify token and redirect to appropriate dashboard
      const userData = localStorage.getItem("user_data")
      if (userData) {
        const user = JSON.parse(userData)
        if (user.role === 'executive') {
          router.push("/executive")
        } else {
          router.push("/employee")
        }
      }
    } else {
      router.push("/login")
    }
  }, [router])
import { useRouter } from "next/navigation"
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-yellow-50 to-white">
      <div className="text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-yellow-500 mx-auto mb-4"></div>
        <h1 className="text-2xl font-bold text-gray-900">GOAT Media</h1>
        <p className="text-gray-600">Loading your dashboard...</p>
      </div>
    </div>
  )
}
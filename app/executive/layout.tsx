"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { ExecutiveSidebar } from "@/components/executive/executive-sidebar"
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import { SNRChatbot } from "@/components/shared/snr-chatbot"

export default function ExecutiveLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [user, setUser] = useState<any>(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const token = localStorage.getItem('auth_token')
    const userData = localStorage.getItem('user_data')
    
    if (!token || !userData) {
      router.push('/login')
      return
    }

    const parsedUser = JSON.parse(userData)
    
    // Check if user is executive
    if (parsedUser.role !== 'executive') {
      router.push('/login')
      return
    }

    setUser(parsedUser)
    setIsAuthenticated(true)
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem('auth_token')
    localStorage.removeItem('user_data')
    router.push('/login')
  }

  if (!isAuthenticated || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-yellow-500"></div>
      </div>
    )
  }

  return (
    <SidebarProvider>
      <ExecutiveSidebar user={user} onLogout={handleLogout} />
      <SidebarInset>
        <main className="flex-1 space-y-4 p-6 bg-gradient-to-br from-gray-900 via-black to-gray-900 min-h-screen text-white">
          {children}
        </main>
      </SidebarInset>
      <SNRChatbot userRole="executive" />
    </SidebarProvider>
  )
}
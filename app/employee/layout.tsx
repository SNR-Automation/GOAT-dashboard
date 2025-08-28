"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { EmployeeSidebar } from "@/components/employee/employee-sidebar"
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import { SNRChatbot } from "@/components/shared/snr-chatbot"

export default function EmployeeLayout({
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
    
    // Check if user is employee
    if (parsedUser.role !== 'employee') {
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
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-yellow-500"></div>
      </div>
    )
  }

  return (
    <SidebarProvider>
      <EmployeeSidebar user={user} onLogout={handleLogout} />
      <SidebarInset>
        <main className="flex-1 space-y-4 p-6 bg-gradient-to-br from-yellow-50/30 via-white to-yellow-50/30 min-h-screen">
          {children}
        </main>
      </SidebarInset>
      <SNRChatbot userRole="employee" />
    </SidebarProvider>
  )
}
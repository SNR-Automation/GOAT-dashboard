"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion } from "framer-motion"
import {
  Home,
  Users,
  TrendingUp,
  BarChart3,
  DollarSign,
  Bell,
  HelpCircle,
  Settings,
  Mountain,
  LogOut,
  Target
} from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

const navigationItems = [
  {
    title: "Executive Home",
    url: "/executive",
    icon: Home,
  },
  {
    title: "Lead Management",
    url: "/executive/leads",
    icon: Target,
  },
  {
    title: "Team Performance",
    url: "/executive/team",
    icon: Users,
  },
  {
    title: "Revenue Management",
    url: "/executive/revenue",
    icon: DollarSign,
  },
  {
    title: "Analytics",
    url: "/executive/analytics",
    icon: BarChart3,
  },
  {
    title: "Notifications",
    url: "/executive/notifications",
    icon: Bell,
  },
  {
    title: "Help Center",
    url: "/executive/help",
    icon: HelpCircle,
  },
  {
    title: "Settings",
    url: "/executive/settings",
    icon: Settings,
  },
]

interface ExecutiveSidebarProps {
  user: any
  onLogout: () => void
}

export function ExecutiveSidebar({ user, onLogout }: ExecutiveSidebarProps) {
  const pathname = usePathname()

  return (
    <motion.div
      initial={{ x: -300, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <Sidebar className="border-r border-gray-800 bg-gradient-to-b from-black to-gray-900">
        <SidebarHeader className="border-b border-gray-800 bg-black/50">
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton size="lg" asChild>
                <Link href="/executive">
                  <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-gradient-to-r from-yellow-400 to-yellow-600">
                    <Mountain className="size-4 text-black" />
                  </div>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-bold text-white">GOAT Media</span>
                    <span className="truncate text-xs text-gray-400">Executive Portal</span>
                  </div>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader>

        <SidebarContent className="bg-gradient-to-b from-gray-900/50 to-black/50">
          <SidebarMenu className="gap-2 p-2">
            {navigationItems.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton 
                  asChild
                  className={`
                    transition-all duration-200 hover:bg-yellow-500/20 hover:text-yellow-400
                    ${pathname === item.url 
                      ? 'bg-yellow-500/30 text-yellow-400 font-semibold border-l-4 border-yellow-500' 
                      : 'text-gray-300'
                    }
                  `}
                >
                  <Link href={item.url}>
                    <item.icon className="h-4 w-4" />
                    <span>{item.title}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarContent>

        <SidebarFooter className="border-t border-gray-800 bg-black/50 p-4">
          <div className="flex items-center gap-3 mb-3">
            <Avatar className="h-10 w-10 border-2 border-yellow-400">
              <AvatarFallback className="bg-yellow-500 text-black font-semibold">
                {user?.name?.split(' ').map((n: string) => n[0]).join('') || 'U'}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-white truncate">{user?.name}</p>
              <p className="text-sm text-gray-400 truncate">{user?.designation}</p>
            </div>
          </div>
          <Button 
            onClick={onLogout}
            variant="outline" 
            className="w-full border-gray-700 text-gray-300 hover:bg-yellow-500/20 hover:text-yellow-400 hover:border-yellow-500"
          >
            <LogOut className="h-4 w-4 mr-2" />
            Sign Out
          </Button>
        </SidebarFooter>
      </Sidebar>
    </motion.div>
  )
}
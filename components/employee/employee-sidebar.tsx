"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion } from "framer-motion"
import {
  Home,
  CheckSquare,
  PenTool,
  Calendar,
  Edit,
  Bell,
  HelpCircle,
  Settings,
  Mountain,
  LogOut
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
    title: "Home",
    url: "/employee",
    icon: Home,
  },
  {
    title: "Task Management",
    url: "/employee/tasks",
    icon: CheckSquare,
  },
  {
    title: "Content Studio",
    url: "/employee/content",
    icon: PenTool,
  },
  {
    title: "Shoot Planning",
    url: "/employee/shoots",
    icon: Calendar,
  },
  {
    title: "Editing Workflow",
    url: "/employee/editing",
    icon: Edit,
  },
  {
    title: "Notifications",
    url: "/employee/notifications",
    icon: Bell,
  },
  {
    title: "Help Center",
    url: "/employee/help",
    icon: HelpCircle,
  },
  {
    title: "Settings",
    url: "/employee/settings",
    icon: Settings,
  },
]

interface EmployeeSidebarProps {
  user: any
  onLogout: () => void
}

export function EmployeeSidebar({ user, onLogout }: EmployeeSidebarProps) {
  const pathname = usePathname()

  return (
    <motion.div
      initial={{ x: -300, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <Sidebar className="border-r border-yellow-200 bg-gradient-to-b from-yellow-50 to-white">
        <SidebarHeader className="border-b border-yellow-200 bg-white/50">
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton size="lg" asChild>
                <Link href="/employee">
                  <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-gradient-to-r from-yellow-400 to-yellow-600">
                    <Mountain className="size-4 text-black" />
                  </div>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-bold text-black">GOAT Media</span>
                    <span className="truncate text-xs text-gray-600">Employee Portal</span>
                  </div>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader>

        <SidebarContent className="bg-gradient-to-b from-yellow-50/50 to-white/50">
          <SidebarMenu className="gap-2 p-2">
            {navigationItems.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton 
                  asChild
                  className={`
                    transition-all duration-200 hover:bg-yellow-100 hover:text-black
                    ${pathname === item.url 
                      ? 'bg-yellow-200 text-black font-semibold border-l-4 border-yellow-500' 
                      : 'text-gray-700'
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

        <SidebarFooter className="border-t border-yellow-200 bg-white/50 p-4">
          <div className="flex items-center gap-3 mb-3">
            <Avatar className="h-10 w-10 border-2 border-yellow-300">
              <AvatarFallback className="bg-yellow-100 text-black font-semibold">
                {user?.name?.split(' ').map((n: string) => n[0]).join('') || 'U'}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-black truncate">{user?.name}</p>
              <p className="text-sm text-gray-600 truncate">{user?.designation}</p>
            </div>
          </div>
          <Button 
            onClick={onLogout}
            variant="outline" 
            className="w-full border-yellow-300 text-gray-700 hover:bg-yellow-100"
          >
            <LogOut className="h-4 w-4 mr-2" />
            Sign Out
          </Button>
        </SidebarFooter>
      </Sidebar>
    </motion.div>
  )
}
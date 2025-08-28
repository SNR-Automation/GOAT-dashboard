"use client"

import * as React from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import {
  BarChart3,
  TrendingUp,
  Users,
  UserCheck,
  Film,
  Calendar,
  DollarSign,
  Mountain,
  Settings,
} from "lucide-react"

import { NavMain } from "@/components/dashboard/nav-main"
import { NavSecondary } from "@/components/dashboard/nav-secondary"
import { NavUser } from "@/components/dashboard/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

const data = {
  user: {
    name: "Admin User",
    email: "admin@thegoatmedia.com",
    avatar: "/avatars/admin.jpg",
  },
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: BarChart3,
    },
    {
      title: "Lead Management",
      url: "/dashboard/lead-management",
      icon: Users,
    },
    {
      title: "Sales Pipeline",
      url: "/dashboard/sales-pipeline",
      icon: TrendingUp,
    },
    {
      title: "Team Management",
      url: "/dashboard/team-management",
      icon: UserCheck,
    },
    {
      title: "Content Studio",
      url: "/dashboard/content-studio",
      icon: Film,
    },
    {
      title: "Shoot Schedule",
      url: "/dashboard/shoot-schedule",
      icon: Calendar,
    },
    {
      title: "Executive View",
      url: "/dashboard/executive-view",
      icon: DollarSign,
    },
  ],
  navSecondary: [
    {
      title: "Settings",
      url: "/dashboard/settings",
      icon: Settings,
    },
  ],
}

export function AppSidebar({ onLogout, ...props }: React.ComponentProps<typeof Sidebar> & { onLogout?: () => void }) {
  return (
    <motion.div
      initial={{ x: -300, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <Sidebar collapsible="offcanvas" {...props}>
            <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href="/dashboard">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-accent text-accent-foreground">
                  <Mountain className="size-4" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">The GOAT Media</span>
                  <span className="truncate text-xs">Executive Dashboard</span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} onLogout={onLogout} />
      </SidebarFooter>
    </Sidebar>
    </motion.div>
  )
}

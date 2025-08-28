"use client"

import { motion } from "framer-motion"
import { DivideIcon as LucideIcon } from "lucide-react"

interface PageHeaderProps {
  title: string
  description?: string
  icon?: LucideIcon
  children?: React.ReactNode
}

export function PageHeader({ title, description, icon: Icon, children }: PageHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex items-center justify-between mb-8"
    >
      <div>
        <div className="flex items-center gap-3 mb-2">
          {Icon && (
            <div className="p-2 bg-yellow-100 rounded-lg">
              <Icon className="h-6 w-6 text-yellow-700" />
            </div>
          )}
          <h1 className="text-3xl font-bold text-gray-900">{title}</h1>
        </div>
        {description && (
          <p className="text-gray-600">{description}</p>
        )}
      </div>
      {children}
    </motion.div>
  )
}
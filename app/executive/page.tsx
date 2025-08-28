"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { NumberTicker } from "@/components/ui/number-ticker"
import { BorderBeam } from "@/components/ui/border-beam"
import { PageHeader } from "@/components/shared/page-header"
import { 
  Home, 
  DollarSign, 
  Users, 
  TrendingUp,
  Target,
  Bell,
  CheckCircle,
  BarChart3
} from "lucide-react"
import {
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { demoLeads, demoRevenue, chartData, motivationalQuotes } from "@/lib/demo-data"

const revenueByClientConfig = {
  value: {
    label: "Revenue",
    color: "#FFD700",
  },
}

const revenueGrowthConfig = {
  revenue: {
    label: "Revenue",
    color: "#FFD700",
  },
}

const expensesProfitConfig = {
  expenses: {
    label: "Expenses",
    color: "#ef4444",
  },
  profit: {
    label: "Profit",
    color: "#22c55e",
  },
}

export default function ExecutiveHomePage() {
  const [user, setUser] = useState<any>(null)
  const [currentQuote, setCurrentQuote] = useState(0)

  useEffect(() => {
    const userData = localStorage.getItem('user_data')
    if (userData) {
      setUser(JSON.parse(userData))
    }

    // Rotate motivational quotes
    const interval = setInterval(() => {
      setCurrentQuote(prev => (prev + 1) % motivationalQuotes.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  const weeklyLeads = demoLeads.length
  const monthlyRevenue = demoRevenue.reduce((sum, rev) => sum + rev.amount, 0)
  const activeCampaigns = 8
  const pendingApprovals = 5

  return (
    <div className="space-y-8">
      <PageHeader 
        title={`Executive Overview`}
        description={`Welcome back, ${user?.name?.split(' ')[0] || 'Executive'}. Here's your business intelligence dashboard.`}
        icon={Home}
      />

      {/* Motivational Quote */}
      <motion.div
        key={currentQuote}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <Card className="bg-gradient-to-r from-gray-900 to-black border-gray-700">
          <CardContent className="p-6">
            <p className="text-lg italic text-yellow-400">
              "{motivationalQuotes[currentQuote]}"
            </p>
          </CardContent>
        </Card>
      </motion.div>

      {/* Summary Cards */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <div className="grid gap-6 md:grid-cols-4">
          <Card className="relative overflow-hidden bg-gradient-to-br from-green-900 to-green-800 border-green-700">
            <BorderBeam duration={15} size={80} colorFrom="#22c55e" colorTo="#16a34a" />
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-green-200">Weekly Leads</p>
                  <p className="text-3xl font-bold text-white">
                    <NumberTicker value={weeklyLeads} />
                  </p>
                  <p className="text-sm text-green-300">+23% from last week</p>
                </div>
                <Target className="h-8 w-8 text-green-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="relative overflow-hidden bg-gradient-to-br from-yellow-600 to-yellow-500 border-yellow-400">
            <BorderBeam duration={18} size={90} colorFrom="#FFD700" colorTo="#FFA500" />
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-yellow-100">Monthly Revenue</p>
                  <p className="text-3xl font-bold text-black">
                    $<NumberTicker value={Math.round(monthlyRevenue / 1000)} />K
                  </p>
                  <p className="text-sm text-yellow-200">+18% from last month</p>
                </div>
                <DollarSign className="h-8 w-8 text-black" />
              </div>
            </CardContent>
          </Card>

          <Card className="relative overflow-hidden bg-gradient-to-br from-blue-900 to-blue-800 border-blue-700">
            <BorderBeam duration={20} size={100} colorFrom="#3b82f6" colorTo="#1d4ed8" />
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-blue-200">Active Campaigns</p>
                  <p className="text-3xl font-bold text-white">
                    <NumberTicker value={activeCampaigns} />
                  </p>
                  <p className="text-sm text-blue-300">All performing well</p>
                </div>
                <BarChart3 className="h-8 w-8 text-blue-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="relative overflow-hidden bg-gradient-to-br from-purple-900 to-purple-800 border-purple-700">
            <BorderBeam duration={22} size={85} colorFrom="#8b5cf6" colorTo="#7c3aed" />
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-purple-200">Pending Approvals</p>
                  <p className="text-3xl font-bold text-white">
                    <NumberTicker value={pendingApprovals} />
                  </p>
                  <p className="text-sm text-purple-300">Require attention</p>
                </div>
                <Bell className="h-8 w-8 text-purple-400" />
              </div>
            </CardContent>
          </Card>
        </div>
      </motion.div>

      {/* Executive Charts */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Revenue by Client */}
          <Card className="relative overflow-hidden bg-gray-900 border-gray-700">
            <BorderBeam duration={25} size={110} colorFrom="#FFD700" colorTo="#FFA500" />
            <CardHeader>
              <CardTitle className="text-white">Revenue by Client</CardTitle>
              <p className="text-sm text-gray-400">Distribution of total revenue by client</p>
            </CardHeader>
            <CardContent>
              <ChartContainer config={revenueByClientConfig}>
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie
                      data={chartData.revenueByClient}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      dataKey="value"
                      label={({ name, percent }) => `${(percent * 100).toFixed(0)}%`}
                    >
                      {chartData.revenueByClient.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <ChartTooltip 
                      formatter={(value: number) => [`$${(value / 1000).toFixed(0)}K`, "Revenue"]}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>

          {/* Revenue Growth Trend */}
          <Card className="relative overflow-hidden bg-gray-900 border-gray-700">
            <BorderBeam duration={30} size={120} colorFrom="#22c55e" colorTo="#16a34a" />
            <CardHeader>
              <CardTitle className="text-white">Revenue Growth Trend</CardTitle>
              <p className="text-sm text-gray-400">Month-over-month revenue trends</p>
            </CardHeader>
            <CardContent>
              <ChartContainer config={revenueGrowthConfig}>
                <ResponsiveContainer width="100%" height={250}>
                  <LineChart data={chartData.revenueGrowth}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis dataKey="month" stroke="#9ca3af" />
                    <YAxis stroke="#9ca3af" />
                    <ChartTooltip 
                      content={<ChartTooltipContent />}
                      contentStyle={{ backgroundColor: '#1f2937', border: '1px solid #374151' }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="revenue" 
                      stroke="#FFD700" 
                      strokeWidth={3}
                      dot={{ fill: '#FFD700', strokeWidth: 2, r: 5 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>

          {/* Expenses vs Profit */}
          <Card className="relative overflow-hidden bg-gray-900 border-gray-700">
            <BorderBeam duration={28} size={100} colorFrom="#ef4444" colorTo="#dc2626" />
            <CardHeader>
              <CardTitle className="text-white">Expenses vs Profit</CardTitle>
              <p className="text-sm text-gray-400">Compare income with operational costs</p>
            </CardHeader>
            <CardContent>
              <ChartContainer config={expensesProfitConfig}>
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={chartData.expensesVsProfit}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis dataKey="month" stroke="#9ca3af" />
                    <YAxis stroke="#9ca3af" />
                    <ChartTooltip 
                      content={<ChartTooltipContent />}
                      contentStyle={{ backgroundColor: '#1f2937', border: '1px solid #374151' }}
                    />
                    <Bar dataKey="expenses" fill="#ef4444" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="profit" fill="#22c55e" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>
        </div>
      </motion.div>

      {/* Pipeline Preview */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <Card className="relative overflow-hidden bg-gray-900 border-gray-700">
          <BorderBeam duration={40} size={150} colorFrom="#8b5cf6" colorTo="#7c3aed" />
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Sales Pipeline Preview
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-4">
              {demoLeads.slice(0, 4).map((lead) => (
                <div key={lead.id} className="p-4 bg-gray-800 rounded-lg border border-gray-700">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-white">{lead.name}</h3>
                    <Badge 
                      variant={lead.status === 'qualified' ? 'default' : 'secondary'}
                      className={lead.status === 'qualified' ? 'bg-yellow-500 text-black' : ''}
                    >
                      {lead.status}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-400 mb-2">{lead.company}</p>
                  <p className="text-lg font-bold text-yellow-400">
                    ${(lead.value / 1000).toFixed(0)}K
                  </p>
                  <p className="text-xs text-gray-500">{lead.source}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { NumberTicker } from "@/components/ui/number-ticker"
import { BorderBeam } from "@/components/ui/border-beam"
import { PageHeader } from "@/components/shared/page-header"
import { 
  Home, 
  CheckSquare, 
  Calendar, 
  Bell,
  TrendingUp,
  Clock,
  Star,
  Target,
  Award
} from "lucide-react"
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { demoTasks, demoShoots, demoNotifications, chartData, motivationalQuotes } from "@/lib/demo-data"

const taskCompletionConfig = {
  completed: {
    label: "Completed",
    color: "#22c55e",
  },
  total: {
    label: "Total",
    color: "#e5e7eb",
  },
}

const workloadConfig = {
  tasks: {
    label: "Tasks",
    color: "#f59e0b",
  },
}

export default function EmployeeHomePage() {
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

  const todayTasks = demoTasks.filter(task => 
    new Date(task.deadline).toDateString() === new Date().toDateString()
  ).length

  const pendingApprovals = demoTasks.filter(task => task.status === 'pending').length
  const thisWeekShoots = demoShoots.filter(shoot => {
    const shootDate = new Date(shoot.date)
    const today = new Date()
    const weekFromNow = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000)
    return shootDate >= today && shootDate <= weekFromNow
  }).length

  const completionRate = Math.round(
    (demoTasks.filter(task => task.status === 'completed').length / demoTasks.length) * 100
  )

  return (
    <div className="space-y-8">
      <PageHeader 
        title={`Welcome back, ${user?.name?.split(' ')[0] || 'Employee'}!`}
        description="Here's your daily overview and upcoming tasks"
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
        <Card className="bg-gradient-to-r from-yellow-50 to-orange-50 border-yellow-200">
          <CardContent className="p-6">
            <p className="text-lg italic text-gray-700">
              "{motivationalQuotes[currentQuote]}"
            </p>
          </CardContent>
        </Card>
      </motion.div>

      {/* Employee Information Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <Card className="relative overflow-hidden">
          <BorderBeam duration={20} size={120} colorFrom="#FFD700" colorTo="#FFA500" />
          <CardContent className="p-6">
            <div className="flex items-center gap-6">
              <div className="w-20 h-20 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center">
                <span className="text-2xl font-bold text-black">
                  {user?.name?.split(' ').map((n: string) => n[0]).join('') || 'U'}
                </span>
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-gray-900">{user?.name}</h2>
                <p className="text-lg text-gray-600">{user?.designation}</p>
                <p className="text-sm text-gray-500">{user?.department} Department</p>
                <p className="text-sm text-gray-500">
                  Joined: {user?.join_date ? new Date(user.join_date).toLocaleDateString() : 'N/A'}
                </p>
              </div>
              <div className="text-right">
                <div className="flex items-center gap-2 mb-2">
                  <Award className="h-5 w-5 text-yellow-600" />
                  <span className="font-semibold text-gray-900">Performance Score</span>
                </div>
                <div className="text-3xl font-bold text-yellow-600">
                  <NumberTicker value={94} />%
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Quick Statistics */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <div className="grid gap-4 md:grid-cols-3">
          <Card className="relative overflow-hidden">
            <BorderBeam duration={15} size={80} colorFrom="#22c55e" colorTo="#16a34a" />
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Tasks Due Today</p>
                  <p className="text-3xl font-bold text-gray-900">
                    <NumberTicker value={todayTasks} />
                  </p>
                  <p className="text-sm text-green-600">On track</p>
                </div>
                <CheckSquare className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Pending Approvals</p>
                  <p className="text-3xl font-bold text-gray-900">
                    <NumberTicker value={pendingApprovals} />
                  </p>
                  <p className="text-sm text-orange-600">Awaiting review</p>
                </div>
                <Bell className="h-8 w-8 text-orange-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="relative overflow-hidden">
            <BorderBeam duration={18} size={90} colorFrom="#3b82f6" colorTo="#1d4ed8" />
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Shoots This Week</p>
                  <p className="text-3xl font-bold text-gray-900">
                    <NumberTicker value={thisWeekShoots} />
                  </p>
                  <p className="text-sm text-blue-600">Scheduled</p>
                </div>
                <Calendar className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>
        </div>
      </motion.div>

      {/* Interactive Charts */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <div className="grid gap-6 md:grid-cols-2">
          <Card className="relative overflow-hidden">
            <BorderBeam duration={25} size={100} colorFrom="#8b5cf6" colorTo="#7c3aed" />
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart className="h-5 w-5" />
                Task Completion Rate
              </CardTitle>
              <p className="text-sm text-gray-600">Your weekly task completion progress</p>
            </CardHeader>
            <CardContent>
              <ChartContainer config={taskCompletionConfig}>
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={chartData.taskCompletion}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="day" />
                    <YAxis />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Bar dataKey="completed" fill="#22c55e" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="total" fill="#e5e7eb" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>

          <Card className="relative overflow-hidden">
            <BorderBeam duration={22} size={110} colorFrom="#f59e0b" colorTo="#d97706" />
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Upcoming Workload
              </CardTitle>
              <p className="text-sm text-gray-600">Your deadlines over the next 7 days</p>
            </CardHeader>
            <CardContent>
              <ChartContainer config={workloadConfig}>
                <ResponsiveContainer width="100%" height={250}>
                  <LineChart data={chartData.upcomingWorkload}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Line 
                      type="monotone" 
                      dataKey="tasks" 
                      stroke="#f59e0b" 
                      strokeWidth={3}
                      dot={{ fill: '#f59e0b', strokeWidth: 2, r: 4 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>
        </div>
      </motion.div>

      {/* Preview Panels */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <div className="grid gap-6 md:grid-cols-3">
          {/* Latest Notifications */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5" />
                Latest Notifications
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {demoNotifications.employee.slice(0, 3).map((notification) => (
                <div key={notification.id} className="flex items-start gap-3 p-3 rounded-lg bg-gray-50">
                  <div className={`w-2 h-2 rounded-full mt-2 ${
                    notification.type === 'urgent' ? 'bg-red-500' :
                    notification.type === 'approval' ? 'bg-green-500' : 'bg-blue-500'
                  }`} />
                  <div className="flex-1">
                    <p className="font-medium text-sm">{notification.title}</p>
                    <p className="text-xs text-gray-600">{notification.message}</p>
                    <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Scripts in Review */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5" />
                Scripts in Review
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {demoTasks.filter(task => task.status === 'pending').slice(0, 3).map((task) => (
                <div key={task.id} className="p-3 rounded-lg bg-gray-50">
                  <div className="flex items-center justify-between mb-2">
                    <p className="font-medium text-sm">{task.title}</p>
                    <Badge variant="secondary">Pending</Badge>
                  </div>
                  <p className="text-xs text-gray-600">Due: {new Date(task.deadline).toLocaleDateString()}</p>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Today's Shoots */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Today's Shoots
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {demoShoots.filter(shoot => 
                new Date(shoot.date).toDateString() === new Date().toDateString()
              ).slice(0, 3).map((shoot) => (
                <div key={shoot.id} className="p-3 rounded-lg bg-gray-50">
                  <div className="flex items-center justify-between mb-2">
                    <p className="font-medium text-sm">{shoot.title}</p>
                    <Badge variant="outline">{shoot.time}</Badge>
                  </div>
                  <p className="text-xs text-gray-600">{shoot.location} • {shoot.client}</p>
                </div>
              ))}
              {demoShoots.filter(shoot => 
                new Date(shoot.date).toDateString() === new Date().toDateString()
              ).length === 0 && (
                <div className="text-center py-4">
                  <p className="text-sm text-gray-500">No shoots scheduled for today</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </motion.div>

      {/* Performance Summary */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        <Card className="relative overflow-hidden">
          <BorderBeam duration={30} size={140} colorFrom="#ec4899" colorTo="#be185d" />
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Star className="h-5 w-5" />
              Your Performance Summary
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6 md:grid-cols-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900 mb-1">
                  <NumberTicker value={completionRate} />%
                </div>
                <p className="text-sm text-gray-600">Task Completion</p>
                <Progress value={completionRate} className="mt-2" />
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900 mb-1">
                  <NumberTicker value={demoTasks.length} />
                </div>
                <p className="text-sm text-gray-600">Total Tasks</p>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900 mb-1">
                  <NumberTicker value={1.8} />
                </div>
                <p className="text-sm text-gray-600">Avg Days/Task</p>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-yellow-600 mb-1">
                  <NumberTicker value={94} />%
                </div>
                <p className="text-sm text-gray-600">Quality Score</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
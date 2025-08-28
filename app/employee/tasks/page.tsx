"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { 
  CheckSquare, 
  Plus, 
  Filter,
  Eye,
  Upload,
  Calendar,
  User,
  FileText,
  Clock,
  AlertTriangle
} from "lucide-react"
import { PageHeader } from "@/components/shared/page-header"
import { BorderBeam } from "@/components/ui/border-beam"
import { demoTasks } from "@/lib/demo-data"

export default function TaskManagementPage() {
  const [tasks, setTasks] = useState(demoTasks)
  const [filter, setFilter] = useState<'all' | 'pending' | 'completed' | 'overdue'>('all')
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [selectedTask, setSelectedTask] = useState<any>(null)

  const filteredTasks = tasks.filter(task => {
    if (filter === 'all') return true
    return task.status === filter
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'default'
      case 'in_progress': return 'secondary'
      case 'pending': return 'outline'
      case 'overdue': return 'destructive'
      default: return 'outline'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckSquare className="h-4 w-4" />
      case 'in_progress': return <Clock className="h-4 w-4" />
      case 'pending': return <Calendar className="h-4 w-4" />
      case 'overdue': return <AlertTriangle className="h-4 w-4" />
      default: return <FileText className="h-4 w-4" />
    }
  }

  const handleCreateTask = (e: React.FormEvent) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget as HTMLFormElement)
    
    const newTask = {
      id: (tasks.length + 1).toString(),
      title: formData.get('title') as string,
      description: formData.get('description') as string,
      status: 'pending' as const,
      deadline: formData.get('deadline') as string,
      assigned_to: '1',
      assigned_by: '2',
      created_at: new Date().toISOString(),
      attachments: []
    }

    setTasks([...tasks, newTask])
    setIsCreateDialogOpen(false)
  }

  return (
    <div className="space-y-6">
      <PageHeader 
        title="Task Management"
        description="Manage your assigned tasks and track progress"
        icon={CheckSquare}
      >
        <div className="flex gap-3">
          <div className="flex gap-2">
            {(['all', 'pending', 'completed', 'overdue'] as const).map((filterType) => (
              <Button
                key={filterType}
                variant={filter === filterType ? "default" : "outline"}
                size="sm"
                onClick={() => setFilter(filterType)}
                className={filter === filterType ? "bg-yellow-500 text-black hover:bg-yellow-600" : ""}
              >
                <Filter className="h-4 w-4 mr-2" />
                {filterType.charAt(0).toUpperCase() + filterType.slice(1)}
              </Button>
            ))}
          </div>
          
          <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-yellow-500 hover:bg-yellow-600 text-black">
                <Plus className="h-4 w-4 mr-2" />
                Create Task
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>Create New Task</DialogTitle>
                <DialogDescription>
                  Add a new task to your workflow
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleCreateTask} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Task Title</Label>
                  <Input
                    id="title"
                    name="title"
                    placeholder="Enter task title"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    name="description"
                    placeholder="Describe the task details"
                    rows={3}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="deadline">Deadline</Label>
                  <Input
                    id="deadline"
                    name="deadline"
                    type="date"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="file">Attachments (Optional)</Label>
                  <div className="flex items-center gap-2">
                    <Input
                      id="file"
                      name="file"
                      type="file"
                      multiple
                      className="flex-1"
                    />
                    <Button type="button" variant="outline" size="icon">
                      <Upload className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit" className="bg-yellow-500 hover:bg-yellow-600 text-black">
                    Create Task
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </PageHeader>

      {/* Tasks Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <Card className="relative overflow-hidden">
          <BorderBeam duration={35} size={120} colorFrom="#06b6d4" colorTo="#0891b2" />
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Task Name</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Deadline</TableHead>
                  <TableHead>Assigned By</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTasks.map((task) => (
                  <TableRow key={task.id} className="hover:bg-yellow-50">
                    <TableCell>
                      <div>
                        <p className="font-medium">{task.title}</p>
                        <p className="text-sm text-gray-600 truncate max-w-xs">
                          {task.description}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={getStatusColor(task.status)} className="gap-1">
                        {getStatusIcon(task.status)}
                        {task.status.replace('_', ' ')}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-gray-500" />
                        {new Date(task.deadline).toLocaleDateString()}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4 text-gray-500" />
                        Executive Team
                      </div>
                    </TableCell>
                    <TableCell>
                      <Sheet>
                        <SheetTrigger asChild>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => setSelectedTask(task)}
                          >
                            <Eye className="h-4 w-4 mr-2" />
                            View Details
                          </Button>
                        </SheetTrigger>
                        <SheetContent className="w-[600px] sm:w-[600px]">
                          <SheetHeader>
                            <SheetTitle>{selectedTask?.title}</SheetTitle>
                            <SheetDescription>
                              Task details and attachments
                            </SheetDescription>
                          </SheetHeader>
                          {selectedTask && (
                            <div className="space-y-6 mt-6">
                              <div>
                                <Label className="text-base font-semibold">Description</Label>
                                <p className="mt-2 text-sm text-gray-700 bg-gray-50 p-3 rounded-lg">
                                  {selectedTask.description}
                                </p>
                              </div>
                              
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <Label className="text-base font-semibold">Status</Label>
                                  <div className="mt-2">
                                    <Badge variant={getStatusColor(selectedTask.status)} className="gap-1">
                                      {getStatusIcon(selectedTask.status)}
                                      {selectedTask.status.replace('_', ' ')}
                                    </Badge>
                                  </div>
                                </div>
                                <div>
                                  <Label className="text-base font-semibold">Deadline</Label>
                                  <p className="mt-2 text-sm text-gray-700">
                                    {new Date(selectedTask.deadline).toLocaleDateString()}
                                  </p>
                                </div>
                              </div>

                              {selectedTask.attachments && selectedTask.attachments.length > 0 && (
                                <div>
                                  <Label className="text-base font-semibold">Attachments</Label>
                                  <div className="mt-2 space-y-2">
                                    {selectedTask.attachments.map((attachment: string, idx: number) => (
                                      <div key={idx} className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg">
                                        <FileText className="h-4 w-4 text-gray-500" />
                                        <span className="text-sm">{attachment}</span>
                                        <Button variant="outline" size="sm" className="ml-auto">
                                          Download
                                        </Button>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              )}

                              <div className="flex gap-3">
                                <Button className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-black">
                                  Mark Complete
                                </Button>
                                <Button variant="outline" className="flex-1">
                                  Request Extension
                                </Button>
                              </div>
                            </div>
                          )}
                        </SheetContent>
                      </Sheet>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
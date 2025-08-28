"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { 
  Target, 
  Eye,
  CheckCircle,
  XCircle,
  UserPlus,
  Phone,
  Mail,
  Building,
  DollarSign,
  Calendar,
  MessageSquare
} from "lucide-react"
import { PageHeader } from "@/components/shared/page-header"
import { BorderBeam } from "@/components/ui/border-beam"
import { demoLeads } from "@/lib/demo-data"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"

export default function LeadManagementPage() {
  const [leads, setLeads] = useState(demoLeads)
  const [selectedLead, setSelectedLead] = useState<any>(null)

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new': return 'destructive'
      case 'contacted': return 'secondary'
      case 'qualified': return 'default'
      case 'proposal': return 'outline'
      case 'closed_won': return 'default'
      case 'closed_lost': return 'destructive'
      default: return 'secondary'
    }
  }

  const handleLeadAction = (leadId: string, action: 'approve' | 'reject' | 'reassign') => {
    setLeads(leads.map(lead => 
      lead.id === leadId 
        ? { 
            ...lead, 
            status: action === 'approve' ? 'qualified' : action === 'reject' ? 'closed_lost' : lead.status 
          }
        : lead
    ))
  }

  return (
    <div className="space-y-6">
      <PageHeader 
        title="Lead Management"
        description="Manage and track all sales leads through the pipeline"
        icon={Target}
      />

      {/* Lead Statistics */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <div className="grid gap-4 md:grid-cols-5">
          {[
            { label: 'New Leads', count: leads.filter(l => l.status === 'new').length, color: 'bg-red-900' },
            { label: 'Contacted', count: leads.filter(l => l.status === 'contacted').length, color: 'bg-yellow-900' },
            { label: 'Qualified', count: leads.filter(l => l.status === 'qualified').length, color: 'bg-green-900' },
            { label: 'Proposal', count: leads.filter(l => l.status === 'proposal').length, color: 'bg-blue-900' },
            { label: 'Closed Won', count: leads.filter(l => l.status === 'closed_won').length, color: 'bg-purple-900' }
          ].map((stat, idx) => (
            <Card key={stat.label} className={`${stat.color} border-gray-700`}>
              <CardContent className="p-4 text-center">
                <p className="text-2xl font-bold text-white">{stat.count}</p>
                <p className="text-sm text-gray-300">{stat.label}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </motion.div>

      {/* Leads Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <Card className="relative overflow-hidden bg-gray-900 border-gray-700">
          <BorderBeam duration={35} size={140} colorFrom="#06b6d4" colorTo="#0891b2" />
          <CardHeader>
            <CardTitle className="text-white">All Leads</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow className="border-gray-700">
                  <TableHead className="text-gray-300">Lead Name</TableHead>
                  <TableHead className="text-gray-300">Company</TableHead>
                  <TableHead className="text-gray-300">Status</TableHead>
                  <TableHead className="text-gray-300">Value</TableHead>
                  <TableHead className="text-gray-300">Assigned Employee</TableHead>
                  <TableHead className="text-gray-300">Date</TableHead>
                  <TableHead className="text-gray-300">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {leads.map((lead) => (
                  <TableRow key={lead.id} className="border-gray-700 hover:bg-gray-800">
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center">
                          <span className="text-xs font-bold text-black">
                            {lead.name.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                        <div>
                          <p className="font-medium text-white">{lead.name}</p>
                          <p className="text-sm text-gray-400">{lead.email}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Building className="h-4 w-4 text-gray-500" />
                        <span className="text-white">{lead.company}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={getStatusColor(lead.status)}>
                        {lead.status.replace('_', ' ')}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <DollarSign className="h-4 w-4 text-yellow-500" />
                        <span className="font-semibold text-yellow-400">
                          ${(lead.value / 1000).toFixed(0)}K
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className="text-white">Sarah Johnson</span>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-gray-500" />
                        <span className="text-gray-300">
                          {new Date(lead.created_at).toLocaleDateString()}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Sheet>
                          <SheetTrigger asChild>
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => setSelectedLead(lead)}
                              className="border-gray-600 text-gray-300 hover:bg-gray-800"
                            >
                              <Eye className="h-4 w-4 mr-2" />
                              Details
                            </Button>
                          </SheetTrigger>
                          <SheetContent className="w-[700px] sm:w-[700px] bg-gray-900 border-gray-700">
                            <SheetHeader>
                              <SheetTitle className="text-white">{selectedLead?.name}</SheetTitle>
                              <SheetDescription className="text-gray-400">
                                Lead details and interaction history
                              </SheetDescription>
                            </SheetHeader>
                            {selectedLead && (
                              <div className="space-y-6 mt-6">
                                {/* Contact Information */}
                                <div className="grid grid-cols-2 gap-4">
                                  <div>
                                    <Label className="text-white">Company</Label>
                                    <p className="text-gray-300">{selectedLead.company}</p>
                                  </div>
                                  <div>
                                    <Label className="text-white">Value</Label>
                                    <p className="text-yellow-400 font-semibold">
                                      ${(selectedLead.value / 1000).toFixed(0)}K
                                    </p>
                                  </div>
                                  <div>
                                    <Label className="text-white">Email</Label>
                                    <p className="text-gray-300">{selectedLead.email}</p>
                                  </div>
                                  <div>
                                    <Label className="text-white">Phone</Label>
                                    <p className="text-gray-300">{selectedLead.phone}</p>
                                  </div>
                                </div>

                                {/* Notes */}
                                <div>
                                  <Label className="text-white">Notes</Label>
                                  <p className="text-gray-300 bg-gray-800 p-3 rounded-lg mt-2">
                                    {selectedLead.notes}
                                  </p>
                                </div>

                                {/* Interaction History */}
                                <div>
                                  <Label className="text-white">Interaction History</Label>
                                  <div className="space-y-2 mt-2">
                                    <div className="p-3 bg-gray-800 rounded-lg">
                                      <div className="flex items-center gap-2 mb-1">
                                        <Phone className="h-4 w-4 text-green-400" />
                                        <span className="text-sm text-white">Initial Contact Call</span>
                                        <Badge variant="outline">Completed</Badge>
                                      </div>
                                      <p className="text-xs text-gray-400">
                                        Sarah Johnson • 2 days ago
                                      </p>
                                    </div>
                                    <div className="p-3 bg-gray-800 rounded-lg">
                                      <div className="flex items-center gap-2 mb-1">
                                        <Mail className="h-4 w-4 text-blue-400" />
                                        <span className="text-sm text-white">Follow-up Email Sent</span>
                                        <Badge variant="outline">Delivered</Badge>
                                      </div>
                                      <p className="text-xs text-gray-400">
                                        Sarah Johnson • 1 day ago
                                      </p>
                                    </div>
                                  </div>
                                </div>

                                {/* Action Buttons */}
                                <div className="flex gap-3">
                                  <Button 
                                    className="flex-1 bg-green-600 hover:bg-green-700"
                                    onClick={() => handleLeadAction(selectedLead.id, 'approve')}
                                  >
                                    <CheckCircle className="h-4 w-4 mr-2" />
                                    Approve
                                  </Button>
                                  <Button 
                                    variant="destructive" 
                                    className="flex-1"
                                    onClick={() => handleLeadAction(selectedLead.id, 'reject')}
                                  >
                                    <XCircle className="h-4 w-4 mr-2" />
                                    Reject
                                  </Button>
                                  <Button 
                                    variant="outline" 
                                    className="flex-1 border-gray-600 text-gray-300 hover:bg-gray-800"
                                    onClick={() => handleLeadAction(selectedLead.id, 'reassign')}
                                  >
                                    <UserPlus className="h-4 w-4 mr-2" />
                                    Reassign
                                  </Button>
                                </div>

                                {/* Add Notes */}
                                <div>
                                  <Label className="text-white">Add Notes</Label>
                                  <Textarea 
                                    placeholder="Add interaction notes or follow-up reminders..."
                                    className="mt-2 bg-gray-800 border-gray-600 text-white"
                                    rows={3}
                                  />
                                  <Button className="mt-2 bg-yellow-500 hover:bg-yellow-600 text-black">
                                    <MessageSquare className="h-4 w-4 mr-2" />
                                    Save Notes
                                  </Button>
                                </div>
                              </div>
                            )}
                          </SheetContent>
                        </Sheet>
                      </div>
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
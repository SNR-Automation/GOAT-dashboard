// Demo data for the GOAT Media dashboard

export const motivationalQuotes = [
  "Excellence is not a skill, it's an attitude. - Ralph Marston",
  "Success is where preparation and opportunity meet. - Bobby Unser",
  "The future belongs to those who believe in the beauty of their dreams. - Eleanor Roosevelt",
  "Innovation distinguishes between a leader and a follower. - Steve Jobs",
  "Quality is not an act, it is a habit. - Aristotle",
  "The only way to do great work is to love what you do. - Steve Jobs"
]

export const demoTasks = [
  {
    id: '1',
    title: 'Create Instagram Reel Script for TechCorp',
    description: 'Develop a 30-second engaging script highlighting their new AI automation features. Focus on benefits and ROI.',
    status: 'pending' as const,
    deadline: '2025-01-20',
    assigned_to: '1',
    assigned_by: '2',
    created_at: '2025-01-15',
    attachments: ['brief.pdf', 'brand-guidelines.pdf']
  },
  {
    id: '2',
    title: 'Edit Product Demo Video',
    description: 'Complete final edit of the 2-minute product demonstration video including color grading and sound mixing.',
    status: 'in_progress' as const,
    deadline: '2025-01-18',
    assigned_to: '1',
    assigned_by: '2',
    created_at: '2025-01-14',
    attachments: ['raw-footage.mp4']
  },
  {
    id: '3',
    title: 'Design Thumbnail Set',
    description: 'Create 5 thumbnail variations for the upcoming YouTube series launch.',
    status: 'completed' as const,
    deadline: '2025-01-16',
    assigned_to: '1',
    assigned_by: '2',
    created_at: '2025-01-12',
    attachments: ['thumbnails-v1.zip']
  },
  {
    id: '4',
    title: 'Client Testimonial Shoot Prep',
    description: 'Prepare equipment and location setup for tomorrow\'s testimonial shoot with Innovation Labs.',
    status: 'overdue' as const,
    deadline: '2025-01-15',
    assigned_to: '1',
    assigned_by: '2',
    created_at: '2025-01-13',
    attachments: []
  }
]

export const demoLeads = [
  {
    id: '1',
    name: 'David Rodriguez',
    company: 'TechFlow Solutions',
    email: 'david@techflow.com',
    phone: '+1 (555) 123-4567',
    status: 'new' as const,
    assigned_to: '1',
    value: 75000,
    source: 'LinkedIn',
    created_at: '2025-01-15',
    notes: 'Interested in complete automation package. Budget confirmed.'
  },
  {
    id: '2',
    name: 'Lisa Wang',
    company: 'Digital Dynamics',
    email: 'lisa@digitaldynamics.com',
    phone: '+1 (555) 234-5678',
    status: 'contacted' as const,
    assigned_to: '1',
    value: 120000,
    source: 'Referral',
    created_at: '2025-01-14',
    notes: 'Follow-up scheduled for next week. Very interested in content automation.'
  },
  {
    id: '3',
    name: 'James Miller',
    company: 'Innovation Labs',
    email: 'james@innovationlabs.com',
    phone: '+1 (555) 345-6789',
    status: 'qualified' as const,
    assigned_to: '1',
    value: 95000,
    source: 'Website',
    created_at: '2025-01-13',
    notes: 'Ready for proposal. Decision maker confirmed.'
  },
  {
    id: '4',
    name: 'Emma Thompson',
    company: 'Growth Ventures',
    email: 'emma@growthventures.com',
    phone: '+1 (555) 456-7890',
    status: 'proposal' as const,
    assigned_to: '1',
    value: 150000,
    source: 'Cold Outreach',
    created_at: '2025-01-12',
    notes: 'Proposal sent. Waiting for board approval.'
  }
]

export const demoShoots = [
  {
    id: '1',
    title: 'TechCorp Product Demo',
    client: 'TechCorp Solutions',
    date: '2025-01-20',
    time: '10:00',
    location: 'Studio A',
    type: 'Product Demo',
    assigned_team: ['Sarah Johnson', 'Mike Davis'],
    status: 'scheduled' as const,
    created_at: '2025-01-15'
  },
  {
    id: '2',
    title: 'Innovation Labs Testimonial',
    client: 'Innovation Labs',
    date: '2025-01-22',
    time: '14:00',
    location: 'Client Office',
    type: 'Testimonial',
    assigned_team: ['Sarah Johnson', 'Alex Wilson'],
    status: 'scheduled' as const,
    created_at: '2025-01-14'
  },
  {
    id: '3',
    title: 'Behind the Scenes Content',
    client: 'GOAT Media',
    date: '2025-01-18',
    time: '09:00',
    location: 'Office',
    type: 'Behind the Scenes',
    assigned_team: ['Mike Davis'],
    status: 'in_progress' as const,
    created_at: '2025-01-13'
  }
]

export const demoRevenue = [
  {
    id: '1',
    client: 'TechCorp Solutions',
    amount: 75000,
    month: 'January',
    year: 2025,
    status: 'paid' as const,
    created_at: '2025-01-15'
  },
  {
    id: '2',
    client: 'Digital Dynamics',
    amount: 120000,
    month: 'January',
    year: 2025,
    status: 'pending' as const,
    created_at: '2025-01-14'
  },
  {
    id: '3',
    client: 'Innovation Labs',
    amount: 95000,
    month: 'December',
    year: 2024,
    status: 'paid' as const,
    created_at: '2024-12-28'
  }
]

export const demoNotifications = {
  employee: [
    {
      id: '1',
      type: 'urgent' as const,
      title: 'Deadline Approaching',
      message: 'TechCorp Instagram script due in 2 hours',
      time: '10 minutes ago',
      read: false
    },
    {
      id: '2',
      type: 'approval' as const,
      title: 'Script Approved',
      message: 'Your Digital Dynamics video script has been approved',
      time: '2 hours ago',
      read: false
    },
    {
      id: '3',
      type: 'system' as const,
      title: 'New Shoot Scheduled',
      message: 'Innovation Labs testimonial shoot added for Jan 22',
      time: '1 day ago',
      read: true
    }
  ],
  executive: [
    {
      id: '1',
      type: 'urgent' as const,
      title: 'High-Value Lead',
      message: 'New $150K lead from Growth Ventures requires immediate attention',
      time: '30 minutes ago',
      read: false
    },
    {
      id: '2',
      type: 'approval' as const,
      title: 'Content Pending Review',
      message: '3 scripts awaiting your approval',
      time: '1 hour ago',
      read: false
    },
    {
      id: '3',
      type: 'financial' as const,
      title: 'Revenue Milestone',
      message: 'Monthly revenue target exceeded by 15%',
      time: '3 hours ago',
      read: true
    }
  ]
}

export const chartData = {
  taskCompletion: [
    { day: 'Mon', completed: 8, total: 10 },
    { day: 'Tue', completed: 12, total: 15 },
    { day: 'Wed', completed: 9, total: 12 },
    { day: 'Thu', completed: 15, total: 18 },
    { day: 'Fri', completed: 11, total: 14 },
    { day: 'Sat', completed: 6, total: 8 },
    { day: 'Sun', completed: 4, total: 5 }
  ],
  upcomingWorkload: [
    { date: 'Jan 16', tasks: 5 },
    { date: 'Jan 17', tasks: 8 },
    { date: 'Jan 18', tasks: 12 },
    { date: 'Jan 19', tasks: 6 },
    { date: 'Jan 20', tasks: 9 },
    { date: 'Jan 21', tasks: 4 },
    { date: 'Jan 22', tasks: 7 }
  ],
  revenueByClient: [
    { name: 'TechCorp Solutions', value: 285000, color: '#FFD700' },
    { name: 'Digital Dynamics', value: 220000, color: '#FFA500' },
    { name: 'Innovation Labs', value: 180000, color: '#FF8C00' },
    { name: 'Growth Ventures', value: 150000, color: '#FF7F50' },
    { name: 'Others', value: 95000, color: '#FF6347' }
  ],
  revenueGrowth: [
    { month: 'Aug', revenue: 180000 },
    { month: 'Sep', revenue: 220000 },
    { month: 'Oct', revenue: 195000 },
    { month: 'Nov', revenue: 240000 },
    { month: 'Dec', revenue: 280000 },
    { month: 'Jan', revenue: 320000 }
  ],
  expensesVsProfit: [
    { month: 'Aug', expenses: 120000, profit: 60000 },
    { month: 'Sep', expenses: 140000, profit: 80000 },
    { month: 'Oct', expenses: 125000, profit: 70000 },
    { month: 'Nov', expenses: 150000, profit: 90000 },
    { month: 'Dec', revenue: 160000, profit: 120000 },
    { month: 'Jan', expenses: 180000, profit: 140000 }
  ],
  workloadDistribution: [
    { department: 'Creative', tasks: 45 },
    { department: 'Production', tasks: 32 },
    { department: 'Strategy', tasks: 28 },
    { department: 'Client Success', tasks: 22 }
  ],
  productivity: [
    { week: 'Week 1', completed: 89, assigned: 95 },
    { week: 'Week 2', completed: 94, assigned: 98 },
    { week: 'Week 3', completed: 87, assigned: 92 },
    { week: 'Week 4', completed: 96, assigned: 100 }
  ]
}
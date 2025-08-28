import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Demo database schema types
export interface User {
  id: string
  email: string
  name: string
  role: 'employee' | 'executive'
  profile_picture?: string
  join_date: string
  department?: string
  designation?: string
}

export interface Task {
  id: string
  title: string
  description: string
  status: 'pending' | 'in_progress' | 'completed' | 'overdue'
  deadline: string
  assigned_to: string
  assigned_by: string
  created_at: string
  attachments?: string[]
}

export interface Lead {
  id: string
  name: string
  company: string
  email: string
  phone: string
  status: 'new' | 'contacted' | 'qualified' | 'proposal' | 'closed_won' | 'closed_lost'
  assigned_to: string
  value: number
  source: string
  created_at: string
  notes?: string
}

export interface Shoot {
  id: string
  title: string
  client: string
  date: string
  time: string
  location: string
  type: string
  assigned_team: string[]
  status: 'scheduled' | 'in_progress' | 'completed' | 'cancelled'
  created_at: string
}

export interface Revenue {
  id: string
  client: string
  amount: number
  month: string
  year: number
  status: 'paid' | 'pending' | 'overdue'
  created_at: string
}
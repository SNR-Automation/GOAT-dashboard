import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'

const JWT_SECRET = process.env.JWT_SECRET || 'demo-secret'

// Demo users database
const demoUsers = [
  {
    id: '1',
    email: 'employee@goatmedia.com',
    password: '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', // password
    name: 'Sarah Johnson',
    role: 'employee' as const,
    profile_picture: '/avatars/sarah.jpg',
    join_date: '2023-06-15',
    department: 'Creative',
    designation: 'Senior Content Creator'
  },
  {
    id: '2',
    email: 'executive@goatmedia.com',
    password: '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', // password
    name: 'Michael Chen',
    role: 'executive' as const,
    profile_picture: '/avatars/michael.jpg',
    join_date: '2022-01-10',
    department: 'Leadership',
    designation: 'Chief Executive Officer'
  },
  {
    id: '3',
    email: 'demo@goatmedia.com',
    password: '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', // password
    name: 'Demo User',
    role: 'employee' as const,
    profile_picture: '/avatars/demo.jpg',
    join_date: '2024-01-01',
    department: 'Demo',
    designation: 'Demo Account'
  }
]

export async function authenticateUser(email: string, password: string) {
  const user = demoUsers.find(u => u.email === email)
  
  if (!user) {
    throw new Error('User not found')
  }

  const isValidPassword = await bcrypt.compare(password, user.password)
  
  if (!isValidPassword) {
    throw new Error('Invalid password')
  }

  const token = jwt.sign(
    { userId: user.id, email: user.email, role: user.role },
    JWT_SECRET,
    { expiresIn: '7d' }
  )

  return {
    token,
    user: {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
      profile_picture: user.profile_picture,
      join_date: user.join_date,
      department: user.department,
      designation: user.designation
    }
  }
}

export function verifyToken(token: string) {
  try {
    return jwt.verify(token, JWT_SECRET) as any
  } catch (error) {
    throw new Error('Invalid token')
  }
}

export function getUserById(id: string) {
  const user = demoUsers.find(u => u.id === id)
  if (!user) return null
  
  return {
    id: user.id,
    email: user.email,
    name: user.name,
    role: user.role,
    profile_picture: user.profile_picture,
    join_date: user.join_date,
    department: user.department,
    designation: user.designation
  }
}
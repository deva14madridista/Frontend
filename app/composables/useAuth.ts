export type UserRole = 'admin' | 'finance' | 'hrd' | 'pegawai' | 'atasan'

export interface User {
  id: string
  name: string
  email: string
  role: UserRole
  department?: string
  position?: string
  avatar?: string
}

const isUserRole = (role: unknown): role is UserRole =>
  role === 'admin'
  || role === 'finance'
  || role === 'hrd'
  || role === 'pegawai'
  || role === 'atasan'

const STORAGE_KEY = 'eduabsen_user'

const DEFAULT_USERS: Record<string, User> = {
  'admin@eduabsen.com': {
    id: '1',
    name: 'Deva Fauzan Nuraqli',
    email: 'admin@eduabsen.com',
    role: 'admin',
    department: 'IT',
    position: 'Administrator',
  },
  'finance@eduabsen.com': {
    id: '2',
    name: 'Budi Santoso',
    email: 'finance@eduabsen.com',
    role: 'finance',
    department: 'Finance',
    position: 'Staff Keuangan',
  },
  'hrd@eduabsen.com': {
    id: '3',
    name: 'Dewi Lestari',
    email: 'hrd@eduabsen.com',
    role: 'hrd',
    department: 'HRD',
    position: 'Staff HRD',
  },
  'pegawai@eduabsen.com': {
    id: '4',
    name: 'Andi Saputra',
    email: 'pegawai@eduabsen.com',
    role: 'pegawai',
    department: 'Marketing',
    position: 'Staff Marketing',
  },
  'atasan@eduabsen.com': {
    id: '5',
    name: 'Atasan Demo',
    email: 'atasan@eduabsen.com',
    role: 'atasan',
    department: 'Manajemen',
    position: 'Atasan',
  },
}

export const useAuth = () => {
  const user = useState<User | null>('user', () => null)
  const isAuthenticated = useState<boolean>('isAuthenticated', () => false)

  const login = (email: string, password: string): Promise<User> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const foundUser = DEFAULT_USERS[email.toLowerCase()]
        if (foundUser && password === 'password123') {
          user.value = { ...foundUser }
          isAuthenticated.value = true
          if (import.meta.client) {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(foundUser))
          }
          resolve(foundUser)
        } else {
          reject(new Error('Email atau password salah'))
        }
      }, 500)
    })
  }

  const register = (userData: Omit<User, 'id'>): Promise<User> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const newUser: User = {
          ...userData,
          id: Date.now().toString(),
        }
        user.value = newUser
        isAuthenticated.value = true
        if (import.meta.client) {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(newUser))
        }
        resolve(newUser)
      }, 500)
    })
  }

  const logout = () => {
    user.value = null
    isAuthenticated.value = false
    if (import.meta.client) {
      localStorage.removeItem(STORAGE_KEY)
    }
    navigateTo('/admin/login')
  }

  const initAuth = () => {
    if (import.meta.client) {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) {
        let parsed: unknown
        try {
          parsed = JSON.parse(stored)
        } catch {
          localStorage.removeItem(STORAGE_KEY)
          return
        }

        if (
          !parsed
          || typeof parsed !== 'object'
          || !('id' in parsed)
          || !('name' in parsed)
          || !('email' in parsed)
          || !('role' in parsed)
          || typeof parsed.id !== 'string'
          || typeof parsed.name !== 'string'
          || typeof parsed.email !== 'string'
          || !isUserRole(parsed.role)
        ) {
          localStorage.removeItem(STORAGE_KEY)
          return
        }

        user.value = parsed
        isAuthenticated.value = true
      }
    }
  }

  const hasRole = (roles: UserRole | UserRole[]) => {
    if (!user.value) return false
    const roleArray = Array.isArray(roles) ? roles : [roles]
    return roleArray.includes(user.value.role)
  }

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2)
  }

  return {
    user: readonly(user),
    isAuthenticated: readonly(isAuthenticated),
    login,
    register,
    logout,
    initAuth,
    hasRole,
    getInitials,
  }
}
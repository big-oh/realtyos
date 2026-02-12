import { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import { User } from '@/types'
import { supabase, getCurrentUser } from '@/lib/supabase'

interface AuthContextType {
  user: User | null
  isLoading: boolean
  isAuthenticated: boolean
  login: (email: string, password: string) => Promise<void>
  signup: (email: string, password: string, firstName: string, lastName: string) => Promise<void>
  logout: () => Promise<void>
  refreshUser: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Demo user for testing without Supabase
const DEMO_USER: User = {
  id: 'demo-user-123',
  email: 'demo@realtyos.com',
  firstName: 'Demo',
  lastName: 'User',
  avatarUrl: null,
  brokerage: 'Demo Realty',
  licenseNumber: '12345',
  phone: '(416) 555-0123',
  createdAt: new Date().toISOString(),
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Check for saved session on mount
  useEffect(() => {
    const savedUser = localStorage.getItem('realtyos_user')
    if (savedUser) {
      setUser(JSON.parse(savedUser))
    }
    setIsLoading(false)

    // Try Supabase auth if available
    const initAuth = async () => {
      try {
        const currentUser = await getCurrentUser()
        if (currentUser) {
          setUser(currentUser)
          localStorage.setItem('realtyos_user', JSON.stringify(currentUser))
        }
      } catch (error) {
        // Supabase not configured, use local auth
        console.log('Supabase not configured, using local auth')
      }
    }
    
    initAuth()

    const { data: { subscription } } = supabase.auth.onAuthStateChange(() => {
      refreshUser()
    })

    return () => subscription.unsubscribe()
  }, [])

  async function login(email: string, password: string) {
    // Demo login
    if (email === 'demo@realtyos.com' && password === 'demo123') {
      setUser(DEMO_USER)
      localStorage.setItem('realtyos_user', JSON.stringify(DEMO_USER))
      return
    }

    // Try Supabase login
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      throw new Error(error.message)
    }

    await refreshUser()
  }

  async function signup(email: string, password: string, firstName: string, lastName: string) {
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          first_name: firstName,
          last_name: lastName,
        },
      },
    })

    if (error) {
      throw new Error(error.message)
    }

    await refreshUser()
  }

  async function logout() {
    localStorage.removeItem('realtyos_user')
    setUser(null)
    
    const { error } = await supabase.auth.signOut()
    if (error) {
      console.error('Logout error:', error)
    }
  }

  async function refreshUser() {
    try {
      const currentUser = await getCurrentUser()
      setUser(currentUser)
      if (currentUser) {
        localStorage.setItem('realtyos_user', JSON.stringify(currentUser))
      }
    } catch (error) {
      console.error('Error fetching user:', error)
      // Don't clear user on error - keep local session
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated: !!user,
        login,
        signup,
        logout,
        refreshUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

import { createContext, useContext, useEffect, useState } from 'react'
import { loginUser, logoutUser, getUserRole, onAuthChange } from '../supabase/auth'

const AuthContext = createContext()

export const useAuth = () => {
  return useContext(AuthContext)
}

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null)
  const [userRole, setUserRole] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = onAuthChange(async (user) => {
      if (user) {
        setCurrentUser(user)
        const role = await getUserRole(user.id)
        setUserRole(role)
      } else {
        setCurrentUser(null)
        setUserRole(null)
      }
      setLoading(false)
    })
    return unsubscribe
  }, [])

  const login = async (email, password) => {
    const user = await loginUser(email, password)
    const role = await getUserRole(user.id)
    setUserRole(role)
    return { user, role }
  }

  const logout = async () => {
    await logoutUser()
    setCurrentUser(null)
    setUserRole(null)
  }

  const isSuperAdmin = userRole === 'superadmin'
  const isMember = userRole === 'member'

  const value = {
    currentUser,
    userRole,
    isSuperAdmin,
    isMember,
    login,
    logout,
    loading
  }

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}
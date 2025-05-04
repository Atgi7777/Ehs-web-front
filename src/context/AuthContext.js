import React, { createContext, useContext, useEffect, useState } from 'react'

// Context үүсгэх
const AuthContext = createContext(undefined)

export const AuthProvider = ({ children }) => {
  const [role, setRole] = useState(null) 
  const [token, setToken] = useState(null)

  useEffect(() => {
    const savedToken = localStorage.getItem('auth_token')
    const savedRole = localStorage.getItem('auth_role')

    if (savedToken && savedRole) {
      setToken(savedToken)
      setRole(savedRole)
    }
  }, [])

  const login = (userRole, authToken) => {
    setRole(userRole)
    setToken(authToken)
    localStorage.setItem('auth_token', authToken)
    localStorage.setItem('auth_role', userRole)
  }

  const logout = () => {
    setRole(null)
    setToken(null)
    localStorage.removeItem('auth_token')
    localStorage.removeItem('auth_role')
  }

  const value = {
    isLoggedIn: !!token,
    role,
    token,
    login,
    logout,
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
} 

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

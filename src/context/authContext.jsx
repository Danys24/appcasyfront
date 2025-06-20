import { createContext, useContext, useState, useEffect} from 'react'
import {guardarToken} from '../utils/auth.js'

const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [token, setToken] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    try {
        const storedToken = localStorage.getItem('token')
        if (storedToken) {
          setToken(storedToken)
        }
      } catch (error) {
        console.error("Error leyendo localStorage:", error)
      } finally {
        setLoading(false)
      }
  }, [])

  const login = (userData) => {
    setToken(userData);
    guardarToken(userData);
    //localStorage.setItem('token', JSON.stringify(userData))
  }

  const logout = () => {
    setToken(null)
    localStorage.removeItem('token')
    localStorage.removeItem('tokenExpiry')
  }

  const isAuthenticated = !!token

  return (
    <AuthContext.Provider value={{ token, login, logout, isAuthenticated }}>
      {loading ? <div>Cargando...</div> : children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}
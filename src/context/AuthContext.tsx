import { createContext, useContext, ReactNode, useState } from 'react'
import { UserModel } from '../models/User'

type authContextType = {
  user: UserModel
  login: (user: UserModel) => void
  logout: () => void
}

const authContextDefaultValues: authContextType = {
  user: null,
  login: (user: UserModel) => {},
  logout: () => {},
}

const AuthContext = createContext<authContextType>(authContextDefaultValues)

export function useAuth() {
  return useContext(AuthContext)
}

type Props = {
  children: ReactNode
}

export function AuthProvider({ children }: Props) {
  const [user, setUser] = useState<UserModel>(null)

  const login = (user: UserModel) => {
    setUser(user)
  }

  const logout = () => {
    setUser(null)
  }

  const value = {
    user,
    login,
    logout,
  }

  return (
    <>
      <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    </>
  )
}

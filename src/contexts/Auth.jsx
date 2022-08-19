import { createContext, useContext, useEffect, useState } from 'react'

const AuthContext = createContext(undefined)

// Set item in localStorage
const setLocalStorage = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch (e) {
    console.error({ e })
  }
}
// Get item from localStorage or initialize item
const getLocalStorage = (key, initialValue) => {
  try {
    const value = localStorage.getItem(key)
    return value ? JSON.parse(value) : initialValue
  } catch (e) {
    return initialValue
  }
}

const initState = { loggedIn: false }

const AuthProvider = ({ children }) => {
  // 01. use "getLocalStorage" function for initialize user state with "initState" constant value
  const [user, setUser] = useState(() => getLocalStorage("user12", initState))

  useEffect(() => {
    setLocalStorage("user12", user)
  }, [user])

  const toggleAuth = () => {
    setUser((prev) => ({
      ...prev,
      loggedIn: !prev.loggedIn,
    }))
  }

  const value = { toggleAuth: toggleAuth, user }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

const useAuth = () => {
  const context = useContext(AuthContext)

  if (context === undefined)
    throw new Error('useAuth must be within AuthProvider!')

  return context
}

export { AuthProvider, useAuth }

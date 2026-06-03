/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useState } from 'react'
import { getFirebaseServices, isFirebaseConfigured } from '../firebase/config'

const AuthContext = createContext(null)

const STORAGE_KEY = 'se-lms-profile'
const defaultProfiles = {
  student: {
    uid: 'demo-student',
    name: 'Ray Student',
    email: 'student@selms.dev',
    role: 'student',
    department: 'Software Engineering',
  },
  lecturer: {
    uid: 'demo-lecturer',
    name: 'Dr. Musa Lecturer',
    email: 'lecturer@selms.dev',
    role: 'lecturer',
    department: 'Computer Science',
  },
  admin: {
    uid: 'demo-admin',
    name: 'Admin Officer',
    email: 'admin@selms.dev',
    role: 'admin',
    department: 'ICT Unit',
  },
}

function readStoredProfile() {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}

function writeStoredProfile(profile) {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(profile))
}

function clearStoredProfile() {
  window.localStorage.removeItem(STORAGE_KEY)
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(() =>
    !isFirebaseConfigured ? readStoredProfile() : null,
  )
  const [loading, setLoading] = useState(isFirebaseConfigured)
  const [firebaseServices, setFirebaseServices] = useState(null)

  useEffect(() => {
    if (!isFirebaseConfigured) {
      return undefined
    }

    let unsubscribe = null
    let mounted = true

    getFirebaseServices()
      .then((services) => {
        if (!mounted || !services) return

        setFirebaseServices(services)
        unsubscribe = services.authModule.onAuthStateChanged(services.auth, (user) => {
          if (!user) {
            setCurrentUser(null)
            clearStoredProfile()
            setLoading(false)
            return
          }

          const storedProfile = readStoredProfile()
          const profile = {
            uid: user.uid,
            name: storedProfile?.name || user.displayName || 'SE-LMS User',
            email: user.email || storedProfile?.email || '',
            role: storedProfile?.role || 'student',
            department: storedProfile?.department || 'Software Engineering',
          }

          writeStoredProfile(profile)
          setCurrentUser(profile)
          setLoading(false)
        })
      })
      .catch(() => {
        if (mounted) {
          setLoading(false)
        }
      })

    return () => {
      mounted = false
      if (unsubscribe) {
        unsubscribe()
      }
    }
  }, [])

  const login = async ({ email, password, role = 'student' }) => {
    if (!isFirebaseConfigured) {
      const profile = defaultProfiles[role] || defaultProfiles.student
      writeStoredProfile(profile)
      setCurrentUser(profile)
      return profile
    }

    const services = firebaseServices || await getFirebaseServices()
    if (!firebaseServices) {
      setFirebaseServices(services)
    }

    const credential = await services.authModule.signInWithEmailAndPassword(services.auth, email, password)
    const storedProfile = readStoredProfile()
    const profile = {
      uid: credential.user.uid,
      name: storedProfile?.name || credential.user.displayName || 'SE-LMS User',
      email: credential.user.email || email,
      role: storedProfile?.role || role,
      department: storedProfile?.department || 'Software Engineering',
    }

    writeStoredProfile(profile)
    setCurrentUser(profile)
    return profile
  }

  const register = async ({
    name,
    email,
    password,
    role,
    department,
  }) => {
    const profile = {
      uid: crypto.randomUUID(),
      name,
      email,
      role,
      department,
    }

    if (!isFirebaseConfigured) {
      writeStoredProfile(profile)
      setCurrentUser(profile)
      return profile
    }

    const services = firebaseServices || await getFirebaseServices()
    if (!firebaseServices) {
      setFirebaseServices(services)
    }

    const credential = await services.authModule.createUserWithEmailAndPassword(services.auth, email, password)
    await services.authModule.updateProfile(credential.user, { displayName: name })

    const firebaseProfile = {
      ...profile,
      uid: credential.user.uid,
    }

    writeStoredProfile(firebaseProfile)
    setCurrentUser(firebaseProfile)
    return firebaseProfile
  }

  const logout = async () => {
    clearStoredProfile()

    if (isFirebaseConfigured) {
      const services = firebaseServices || await getFirebaseServices()
      await services.authModule.signOut(services.auth)
    }

    setCurrentUser(null)
  }

  const resetPassword = async (email) => {
    if (!isFirebaseConfigured) {
      return 'Demo mode: connect Firebase to send live reset emails.'
    }

    const services = firebaseServices || await getFirebaseServices()
    if (!firebaseServices) {
      setFirebaseServices(services)
    }

    await services.authModule.sendPasswordResetEmail(services.auth, email)
    return 'Password reset email sent successfully.'
  }

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        loading,
        login,
        register,
        logout,
        resetPassword,
        isFirebaseConfigured,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }

  return context
}

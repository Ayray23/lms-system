/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useState } from 'react'
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from 'firebase/auth'
import { auth, isFirebaseConfigured } from '../firebase/config'

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
    !isFirebaseConfigured || !auth ? readStoredProfile() : null,
  )
  const [loading, setLoading] = useState(isFirebaseConfigured && Boolean(auth))

  useEffect(() => {
    if (!isFirebaseConfigured || !auth) {
      return undefined
    }

    const unsubscribe = onAuthStateChanged(auth, (user) => {
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

    return unsubscribe
  }, [])

  const login = async ({ email, password, role = 'student' }) => {
    if (!isFirebaseConfigured || !auth) {
      const profile = defaultProfiles[role] || defaultProfiles.student
      writeStoredProfile(profile)
      setCurrentUser(profile)
      return profile
    }

    const credential = await signInWithEmailAndPassword(auth, email, password)
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

    if (!isFirebaseConfigured || !auth) {
      writeStoredProfile(profile)
      setCurrentUser(profile)
      return profile
    }

    const credential = await createUserWithEmailAndPassword(auth, email, password)
    await updateProfile(credential.user, { displayName: name })

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

    if (isFirebaseConfigured && auth) {
      await signOut(auth)
    }

    setCurrentUser(null)
  }

  const resetPassword = async (email) => {
    if (!isFirebaseConfigured || !auth) {
      return 'Demo mode: connect Firebase to send live reset emails.'
    }

    await sendPasswordResetEmail(auth, email)
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

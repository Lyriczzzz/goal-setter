import { useEffect, useState } from 'react'
import { auth } from '@/lib/firebase'
import {
  GoogleAuthProvider,
  setPersistence,
  browserLocalPersistence,
  signInWithPopup,
  User,
  onAuthStateChanged,
  signOut,
} from 'firebase/auth'

export function useSession() {
  const [session, setSession] = useState<User | null>(null)

  async function handleGoogleSignIn() {
    try {
      const provider = new GoogleAuthProvider()

      await setPersistence(auth, browserLocalPersistence)
      await signInWithPopup(auth, provider)

      window.location.replace('/')
    } catch (error) {
      console.error('Auth error:', error)
    }
  }

  function handleSignOut() {
    signOut(auth)
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setSession(currentUser)
    })

    return () => unsubscribe()
  }, [])

  return { session, handleGoogleSignIn, handleSignOut }
}

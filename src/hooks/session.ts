import { auth } from '@/lib/firebase'
import {
  GoogleAuthProvider,
  setPersistence,
  browserLocalPersistence,
  signInWithPopup
} from 'firebase/auth'

export function useSession() {
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

  return handleGoogleSignIn
}

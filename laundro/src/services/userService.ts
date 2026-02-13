import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore'
import { db, auth } from './firebase'

export type UserProfile = {
  businessName: string
  upiId: string
  phone: string
  createdAt?: any
}

export async function getUserProfile(): Promise<UserProfile | null> {
  const user = auth.currentUser
  if (!user) return null

  const ref = doc(db, 'users', user.uid)
  const snap = await getDoc(ref)

  if (!snap.exists()) return null
  return snap.data() as UserProfile
}

export async function saveUserProfile(profile: UserProfile) {
  const user = auth.currentUser
  if (!user) throw new Error('Not authenticated')

  const ref = doc(db, 'users', user.uid)

  await setDoc(ref, {
    ...profile,
    createdAt: serverTimestamp()
  }, { merge: true })
}
import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyDOaWZmNx65xY7C_uCW3WB1fZvJiA0iCUk",
  authDomain: "laundro-e2d9d.firebaseapp.com",
  projectId: "laundro-e2d9d",
  storageBucket: "laundro-e2d9d.firebasestorage.app",
  messagingSenderId: "675788916179",
  appId: "1:675788916179:web:fe0f871dfe25f53c0a1b26"
};

const app = initializeApp(firebaseConfig)

export const db = getFirestore(app)
export const auth = getAuth(app)
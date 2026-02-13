import {
  collection,
  addDoc,
  serverTimestamp,
  doc,
  updateDoc,
  getDocs,
  query,
  where,
  Timestamp
} from 'firebase/firestore'

import { db } from './firebase'
import { auth } from './firebase'

import type { Customer, OrderItem, OrderStatus, Order, OrderWithId } from '../types/order'


// CREATE ORDER
export async function createOrder(
  customer: Customer,
  items: OrderItem[],
  total: number
) {
  const user = auth.currentUser

  if (!user) {
    throw new Error('Not authenticated')
  }

  const order: Omit<Order, 'createdAt'> & { createdAt: any } = {
    customer,
    items,
    total,
    status: 'WASHING',
    ownerId: user.uid, // 🔥 SaaS key
    createdAt: serverTimestamp()
  }

  await addDoc(
  collection(db, 'users', user.uid, 'orders'),
  {
    customer,
    items,
    total,
    status: 'WASHING',
    createdAt: serverTimestamp()
  }
)
}

// UPDATE STATUS
export async function updateOrderStatus(
  orderId: string,
  status: 'WASHING' | 'READY' | 'PAID'
) {
  const user = auth.currentUser

  if (!user) return

  const orderRef = doc(
    db,
    'users',
    user.uid,
    'orders',
    orderId
  )

  await updateDoc(orderRef, { status })
}

// 👉 GET TODAY'S ORDERS (THIS WAS MISSING)
export async function getTodayOrders(): Promise<OrderWithId[]> {
  const user = auth.currentUser

  if (!user) return []

  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const q = query(
    collection(db, 'users', user.uid, 'orders'),
    where('createdAt', '>=', Timestamp.fromDate(today))
  )

  const snapshot = await getDocs(q)

  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  })) as OrderWithId[]
}
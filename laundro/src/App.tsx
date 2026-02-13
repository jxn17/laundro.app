import { useState, useEffect } from 'react'
import LanguageSelection from './screens/LanguageSelection'
import CreateOrder from './screens/CreateOrder'
import ClothesCart from './screens/ClothesCart'
import OrderSummary from './screens/OrderSummary'
import DailyReport from './screens/DailyReport'
import PhoneLogin from './screens/PhoneLogin'
import Settings from './screens/Settings'

import type { Customer, OrderItem } from './types/order'

import { onAuthStateChanged } from 'firebase/auth'
import type { User } from 'firebase/auth'
import { auth } from './services/firebase'

export default function App() {
  const [step, setStep] = useState(0)
  const [customer, setCustomer] = useState<Customer | null>(null)
  const [items, setItems] = useState<OrderItem[]>([])
  const [total, setTotal] = useState(0)

  // 🔐 Auth state
  const [user, setUser] = useState<User | null>(null)
  const [authLoading, setAuthLoading] = useState(true)

  // 🔹 Listen to login state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (u) => {
      setUser(u)
      setAuthLoading(false)
    })

    return () => unsubscribe()
  }, [])

  // 🔹 Show loading while checking auth
  if (authLoading) {
    return <p>Loading...</p>
  }

  // 🔹 If not logged in → show phone login
  if (!user) {
    return <PhoneLogin onLogin={() => {}} />
  }

  // 🔹 If logged in → show full app
  return (
    <div className="container">
      {step === 0 && (
        <LanguageSelection onSelect={() => setStep(1)} />
      )}

      {step === 1 && (
        <CreateOrder
          onNext={(c) => {
            setCustomer(c)
            setStep(2)
          }}
        />
      )}

      {step === 2 && (
        <ClothesCart
          onNext={(i, t) => {
            setItems(i)
            setTotal(t)
            setStep(3)
          }}
        />
      )}

      {step === 3 && customer && (
        <OrderSummary
          customer={customer}
          items={items}
          total={total}
          onSuccess={() => setStep(4)}
        />
      )}

      {step === 4 && (
        <DailyReport setStep={setStep} />
      )}

      {step === 5 && (
        <Settings onBack={() => setStep(4)} />
      )}
    </div>
  )
}
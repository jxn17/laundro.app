import { useState } from 'react'
import LanguageSelection from './screens/LanguageSelection'
import CreateOrder from './screens/CreateOrder'
import ClothesCart from './screens/ClothesCart'
import OrderSummary from './screens/OrderSummary'
import DailyReport from './screens/DailyReport'
import type { Customer, LaundryItem } from './types/order'

export default function App() {
  const [step, setStep] = useState(0)
  const [customer, setCustomer] = useState<Customer | null>(null)
  const [items, setItems] = useState<LaundryItem[]>([])
  const [total, setTotal] = useState(0)

  return (
    <div className="container">
      {step === 0 && <LanguageSelection onSelect={() => setStep(1)} />}

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
        />
      )}

      {step === 4 && <DailyReport />}
    </div>
  )
}
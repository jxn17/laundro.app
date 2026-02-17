import { useState } from "react"
import CreateOrder from "./CreateOrder"
import ClothesCart from "./ClothesCart"
import OrderSummary from "./OrderSummary"
import type { Customer, OrderItem } from "../types/order"
import { createOrder } from "../services/orderService"

export default function OrderFlow({
  onCancel,
  onComplete
}: {
  onCancel: () => void
  onComplete: () => void
}) {
  const [step, setStep] = useState(1)
  const [customer, setCustomer] = useState<Customer | null>(null)
  const [items, setItems] = useState<OrderItem[]>([])

  const handleCustomerNext = (data: Customer) => {
    setCustomer(data)
    setStep(2)
  }

  const handleClothesNext = (cartItems: OrderItem[]) => {
    setItems(cartItems)
    setStep(3)
  }

    const handleConfirm = async () => {
    if (!customer) return

    const total = items.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    )

    await createOrder(customer, items, total)

    onComplete()
    }

  return (
    <div style={{ padding: 20 }}>

      {step === 1 && (
        <CreateOrder
          onNext={handleCustomerNext}
          onCancel={onCancel}
        />
      )}

      {step === 2 && (
        <ClothesCart
          onNext={handleClothesNext}
          onBack={() => setStep(1)}
        />
      )}

      {step === 3 && customer && (
        <OrderSummary
          customer={customer}
          items={items}
          onConfirm={handleConfirm}
          onBack={() => setStep(2)}
        />
      )}

    </div>
  )
}
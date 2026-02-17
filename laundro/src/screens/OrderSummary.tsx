import type { Customer, OrderItem } from "../types/order"

type Props = {
  customer: Customer
  items: OrderItem[]
  onConfirm: () => void
  onBack: () => void
}

export default function OrderSummary({
  customer,
  items,
  onConfirm,
  onBack
}: Props) {

  const total = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  )

  return (
    <div>
      <h2>Order Summary</h2>

      <h3>Customer</h3>
      <p>Room: {customer.roomNumber}</p>
      <p>Phone: {customer.phone}</p>

      <h3>Items</h3>
      {items.map(item => (
        <div key={item.id}>
          {item.id} × {item.quantity} = ₹{item.price * item.quantity}
        </div>
      ))}

      <h3>Total: ₹{total}</h3>

      <div style={{ marginTop: 20, display: "flex", gap: 10 }}>
        <button onClick={onBack}>
          Back
        </button>

        <button onClick={onConfirm}>
          Confirm Order
        </button>
      </div>
    </div>
  )
}
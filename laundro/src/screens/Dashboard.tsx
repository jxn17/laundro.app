import { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import { getTodayOrders } from "../services/orderService"
import type { OrderWithId } from "../types/order"

export default function Dashboard({
  goToAddOrder
}: {
  goToAddOrder: () => void
}) {
  const { t } = useTranslation()

  const [orders, setOrders] = useState<OrderWithId[]>([])
  const [loading, setLoading] = useState(true)

  const loadOrders = async () => {
    setLoading(true)
    const data = await getTodayOrders()
    setOrders(data)
    setLoading(false)
  }

  useEffect(() => {
    loadOrders()
  }, [])

  if (loading) return <div style={{ padding: 20 }}>Loading...</div>

  const totalOrders = orders.length
  const totalRevenue = orders.reduce((sum, o) => sum + o.total, 0)
  const paidRevenue = orders
    .filter(o => o.status === "PAID")
    .reduce((sum, o) => sum + o.total, 0)

  const pendingRevenue = totalRevenue - paidRevenue

  return (
    <div style={{ padding: 20 }}>

      {/* HEADER */}
      <div style={{ marginBottom: 20 }}>
        <h2>👋 {t("dashboard.greeting") || "Good Morning"}</h2>
      </div>

      {/* REVENUE CARD */}
      <div
        style={{
          background: "linear-gradient(135deg, #4f46e5, #6366f1)",
          color: "white",
          padding: 20,
          borderRadius: 16,
          marginBottom: 20
        }}
      >
        <h3>₹ {totalRevenue}</h3>
        <p>Today's Revenue</p>
      </div>

      {/* STATS ROW */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: 20
        }}
      >
        <div>
          <strong>{totalOrders}</strong>
          <div>Orders</div>
        </div>

        <div>
          <strong style={{ color: "orange" }}>₹ {pendingRevenue}</strong>
          <div>Pending</div>
        </div>

        <div>
          <strong style={{ color: "green" }}>₹ {paidRevenue}</strong>
          <div>Paid</div>
        </div>
      </div>

      {/* RECENT ORDERS */}
      <h4 style={{ marginBottom: 10 }}>Recent Orders</h4>

      {orders.slice(0, 5).map(order => (
        <div
          key={order.id}
          style={{
            background: "white",
            padding: 15,
            borderRadius: 12,
            marginBottom: 10,
            boxShadow: "0 2px 6px rgba(0,0,0,0.05)"
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <strong>Room {order.customer.roomNumber}</strong>
            <span>{order.status}</span>
          </div>
          <div>₹ {order.total}</div>
        </div>
      ))}
    </div>
  )
}
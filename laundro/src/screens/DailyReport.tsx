import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { getTodayOrders, updateOrderStatus } from '../services/orderService'
import type { OrderWithId } from '../types/order'
import { openWhatsApp } from '../services/whatsapp'
import UpiQr from '../components/UpiQr'
import { signOut } from 'firebase/auth'
import { auth } from '../services/firebase'

export default function DailyReport({
  setStep
}: {
  setStep: (n: number) => void
}) {
  const { t } = useTranslation()

  const [orders, setOrders] = useState<OrderWithId[]>([])
  const [loading, setLoading] = useState(true)
  const [qrOrder, setQrOrder] = useState<OrderWithId | null>(null)

  const [notifyQueue, setNotifyQueue] = useState<OrderWithId[]>([])
  const [currentNotifyIndex, setCurrentNotifyIndex] = useState(0)

  const statusColor = {
    WASHING: 'orange',
    READY: 'blue',
    PAID: 'green'
  } as const

  const loadOrders = async () => {
    setLoading(true)
    const data = await getTodayOrders()
    setOrders(data)
    setLoading(false)
  }

  useEffect(() => {
    loadOrders()
  }, [])

  const handleLogout = async () => {
    const ok = window.confirm('Are you sure you want to logout?')
    if (!ok) return
    await signOut(auth)
  }

  if (loading) {
    return <p>Loading...</p>
  }

  // Revenue Calculations
  const totalOrders = orders.length

  const totalRevenue = orders.reduce(
    (sum, order) => sum + order.total,
    0
  )

  const paidRevenue = orders
    .filter(order => order.status === 'PAID')
    .reduce((sum, order) => sum + order.total, 0)

  const pendingRevenue = totalRevenue - paidRevenue

  return (
    <div style={{ padding: 20 }}>

      {/* 🔹 HEADER */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 20
        }}
      >
        <h2>{t('report.title')}</h2>

        <div>
          <button
            onClick={() => setStep(5)}
            style={{ marginRight: 10 }}
          >
            Settings
          </button>

          <button onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>

      {/* 🔹 REVENUE SUMMARY */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
          gap: 12,
          marginBottom: 20
        }}
      >
        <div style={{ padding: 12, border: '1px solid #ccc', borderRadius: 8 }}>
          <strong>Total Orders</strong>
          <div>{totalOrders}</div>
        </div>

        <div style={{ padding: 12, border: '1px solid #ccc', borderRadius: 8 }}>
          <strong>Total Revenue</strong>
          <div>₹{totalRevenue}</div>
        </div>

        <div style={{ padding: 12, border: '1px solid #ccc', borderRadius: 8 }}>
          <strong>Paid Revenue</strong>
          <div style={{ color: 'green' }}>₹{paidRevenue}</div>
        </div>

        <div style={{ padding: 12, border: '1px solid #ccc', borderRadius: 8 }}>
          <strong>Pending Revenue</strong>
          <div style={{ color: 'orange' }}>₹{pendingRevenue}</div>
        </div>
      </div>

      {/* 🔹 NOTIFY ALL */}
      <button
        style={{ marginBottom: 16 }}
        onClick={() => {
          const readyOrders = orders.filter(
            order => order.status === 'READY'
          )

          if (readyOrders.length === 0) {
            alert('No READY orders to notify')
            return
          }

          const ok = window.confirm(
            `Notify ${readyOrders.length} customers?`
          )

          if (!ok) return

          setNotifyQueue(readyOrders)
          setCurrentNotifyIndex(0)
        }}
      >
        Notify All (READY)
      </button>

      {/* 🔹 ORDERS TABLE */}
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th align="left">{t('report.room')}</th>
            <th align="left">{t('report.phone')}</th>
            <th align="left">{t('report.items')}</th>
            <th align="right">{t('report.amount')}</th>
            <th align="left">Status</th>
            <th align="left">Action</th>
          </tr>
        </thead>

        <tbody>
          {orders.map(order => {
            const totalItems = order.items.reduce(
              (sum, item) => sum + item.quantity,
              0
            )

            return (
              <tr key={order.id}>
                <td>{order.customer.roomNumber}</td>
                <td>{order.customer.phone}</td>
                <td>{totalItems}</td>
                <td align="right">₹{order.total}</td>

                <td>
                  <span style={{ color: statusColor[order.status] }}>
                    {order.status}
                  </span>
                </td>

                <td>
                  {order.status === 'WASHING' && (
                    <button
                      onClick={async () => {
                        await updateOrderStatus(order.id, 'READY')
                        await loadOrders()
                      }}
                    >
                      Mark READY
                    </button>
                  )}

                  {order.status === 'READY' && (
                    <>
                      <button
                        onClick={() => {
                          const message = t('whatsapp.ready', {
                            room: order.customer.roomNumber
                          })
                          openWhatsApp(order, message)
                        }}
                      >
                        Notify
                      </button>

                      <button onClick={() => setQrOrder(order)}>
                        Show Payment QR
                      </button>

                      <button
                        onClick={async () => {
                          const ok = window.confirm(
                            `Mark order for room ${order.customer.roomNumber} as PAID?`
                          )
                          if (!ok) return

                          await updateOrderStatus(order.id, 'PAID')
                          await loadOrders()
                        }}
                      >
                        Mark PAID
                      </button>
                    </>
                  )}

                  {order.status === 'PAID' && <span>✅ Paid</span>}
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>

      {/* 🔹 QR MODAL */}
      {qrOrder && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <div style={{ background: '#fff', borderRadius: 8 }}>
            <UpiQr order={qrOrder} />
            <div style={{ textAlign: 'center', padding: 12 }}>
              <button onClick={() => setQrOrder(null)}>Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
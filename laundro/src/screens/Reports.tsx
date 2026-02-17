import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { getTodayOrders, updateOrderStatus } from '../services/orderService'
import type { OrderWithId } from '../types/order'
import { openWhatsApp } from '../services/whatsapp'
import UpiQr from '../components/UpiQr'

export default function Reports() {
  const { t } = useTranslation()

  const [orders, setOrders] = useState<OrderWithId[]>([])
  const [loading, setLoading] = useState(true)
  const [qrOrder, setQrOrder] = useState<OrderWithId | null>(null)

  const loadOrders = async () => {
    setLoading(true)
    const data = await getTodayOrders()
    setOrders(data)
    setLoading(false)
  }

  useEffect(() => {
    loadOrders()
  }, [])

  if (loading) {
    return <p style={{ padding: 20 }}>Loading...</p>
  }

  const totalOrders = orders.length
  const totalRevenue = orders.reduce((sum, o) => sum + o.total, 0)
  const paidRevenue = orders
    .filter(o => o.status === 'PAID')
    .reduce((sum, o) => sum + o.total, 0)
  const pendingRevenue = totalRevenue - paidRevenue

  return (
    <div style={{ padding: 20 }}>

      {/* HEADER */}
      <div style={{ marginBottom: 20 }}>
        <h2>{t('report.title')}</h2>
      </div>

      {/* SUMMARY */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
          gap: 12,
          marginBottom: 20
        }}
      >
        <SummaryCard label="Orders" value={totalOrders} />
        <SummaryCard label="Revenue" value={`₹${totalRevenue}`} />
        <SummaryCard label="Pending" value={`₹${pendingRevenue}`} color="orange" />
        <SummaryCard label="Paid" value={`₹${paidRevenue}`} color="green" />
      </div>

      {/* NOTIFY ALL */}
      <button
        style={{ marginBottom: 16 }}
        onClick={() => {
          const readyOrders = orders.filter(o => o.status === 'READY')
          if (readyOrders.length === 0) {
            alert('No READY orders to notify')
            return
          }

          const ok = window.confirm(
            `Notify ${readyOrders.length} customers?`
          )
          if (!ok) return

          readyOrders.forEach(order => {
            const message = t('whatsapp.ready', {
              room: order.customer.roomNumber
            })
            openWhatsApp(order, message)
          })
        }}
      >
        Notify All (READY)
      </button>

      {/* TABLE */}
      <div style={{ overflowX: 'auto' }}>
        <table
          style={{
            width: '100%',
            borderCollapse: 'collapse',
            background: 'white',
            borderRadius: 12,
            overflow: 'hidden',
            boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
          }}
        >
          <thead style={{ background: '#f3f4f6' }}>
            <tr>
              <th style={thStyle}>Room</th>
              <th style={thStyle}>Phone</th>
              <th style={thStyle}>Items</th>
              <th style={{ ...thStyle, textAlign: 'right' }}>Amount</th>
              <th style={thStyle}>Status</th>
              <th style={thStyle}>Action</th>
            </tr>
          </thead>

          <tbody>
            {orders.map(order => {
              const totalItems = order.items.reduce(
                (sum, item) => sum + item.quantity,
                0
              )

              return (
                <tr key={order.id} style={{ borderTop: '1px solid #eee' }}>
                  <td style={tdStyle}>{order.customer.roomNumber}</td>
                  <td style={tdStyle}>{order.customer.phone}</td>
                  <td style={tdStyle}>{totalItems}</td>
                  <td style={{ ...tdStyle, textAlign: 'right' }}>
                    ₹{order.total}
                  </td>

                  <td style={tdStyle}>
                    <StatusBadge status={order.status} />
                  </td>

                  <td style={tdStyle}>
                    {order.status === 'WASHING' && (
                      <button
                        onClick={async () => {
                          await updateOrderStatus(order.id, 'READY')
                          loadOrders()
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
                          QR
                        </button>

                        <button
                          onClick={async () => {
                            const ok = window.confirm(
                              `Mark room ${order.customer.roomNumber} as PAID?`
                            )
                            if (!ok) return
                            await updateOrderStatus(order.id, 'PAID')
                            loadOrders()
                          }}
                        >
                          Paid
                        </button>
                      </>
                    )}

                    {order.status === 'PAID' && <span>✅</span>}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      {/* QR MODAL */}
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

/* ---------- Small UI Helpers ---------- */

const thStyle = {
  padding: 10,
  textAlign: 'left' as const
}

const tdStyle = {
  padding: 10
}

function SummaryCard({
  label,
  value,
  color
}: {
  label: string
  value: string | number
  color?: string
}) {
  return (
    <div
      style={{
        padding: 12,
        border: '1px solid #eee',
        borderRadius: 8,
        background: 'white'
      }}
    >
      <div style={{ fontSize: 12, color: '#666' }}>{label}</div>
      <div style={{ fontWeight: 'bold', color }}>{value}</div>
    </div>
  )
}

function StatusBadge({ status }: { status: string }) {
  const styles =
    status === 'PAID'
      ? { bg: '#dcfce7', color: 'green' }
      : status === 'READY'
      ? { bg: '#dbeafe', color: '#2563eb' }
      : { bg: '#fff7ed', color: 'orange' }

  return (
    <span
      style={{
        padding: '4px 8px',
        borderRadius: 8,
        background: styles.bg,
        color: styles.color,
        fontSize: 12
      }}
    >
      {status}
    </span>
  )
}
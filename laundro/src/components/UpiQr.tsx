import { QRCodeSVG } from 'qrcode.react'
import type { OrderWithId } from '../types/order'

const UPI_ID = '' // change later
const BUSINESS_NAME = ''

type Props = {
  order: OrderWithId
}

export default function UpiQr({ order }: Props) {
  const upiString =
    `upi://pay` +
    `?pa=${encodeURIComponent(UPI_ID)}` +
    `&pn=${encodeURIComponent(BUSINESS_NAME)}` +
    `&am=${order.total}` +
    `&cu=INR` +
    `&tn=${encodeURIComponent(
      `Laundry payment - Room ${order.customer.roomNumber}`
    )}`

  return (
    <div style={{ textAlign: 'center', padding: 16 }}>
      <h3>Scan to Pay</h3>

      <QRCodeSVG value={upiString} size={220} />

      <p>Amount: ₹{order.total}</p>
      <p>Room: {order.customer.roomNumber}</p>
    </div>
  )
}
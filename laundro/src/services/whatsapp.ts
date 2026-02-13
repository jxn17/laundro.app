import type { OrderWithId } from '../types/order'

export function openWhatsApp(order: OrderWithId, message: string) {
  const phone = order.customer.phone.replace(/\D/g, '')
  const encodedMessage = encodeURIComponent(message)
  const url = `https://wa.me/91${phone}?text=${encodedMessage}`

  window.open(url, '_blank')
}
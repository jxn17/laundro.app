import { useState } from 'react'
import Button from '../components/Button'
import { createOrder } from '../services/orderService'
import { useTranslation } from 'react-i18next'
import type { Customer, OrderItem } from '../types/order'

type Props = {
  customer: Customer
  items: OrderItem[]
  total: number
  onSuccess?: () => void
}

export default function OrderSummary({
  customer,
  items,
  total,
  onSuccess
}: Props) {
  const { t } = useTranslation()
  const [loading, setLoading] = useState(false)

  const handleConfirm = async () => {
    if (!customer || items.length === 0) return

    try {
      setLoading(true)
      await createOrder(customer, items, total)
      alert('Order saved successfully')
      onSuccess?.()
    } catch (error) {
      console.error(error)
      alert('Failed to save order. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Button
      label={loading ? 'Saving...' : t('summary.confirm')}
      onClick={handleConfirm}
    />
  )
}
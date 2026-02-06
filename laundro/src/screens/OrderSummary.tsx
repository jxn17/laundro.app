import Button from '../components/Button'
import { useTranslation } from 'react-i18next'
import type { Customer, LaundryItem } from '../types/order'

type Props = {
  customer: Customer
  items: LaundryItem[]
  total: number
  onViewReport?: () => void
}

export default function OrderSummary({
  customer,
  items,
  total,
  onViewReport
}: Props) {
  const { t } = useTranslation()

  return (
    <div>
      <h2>{t('summary.title')}</h2>

      <p>{t('order.room')}: {customer.roomNumber}</p>
      <p>{t('order.phone')}: {customer.phone}</p>

      {items
        .filter(i => i.quantity > 0)
        .map(item => (
          <p key={item.id}>
            {t(`items.${item.id}`)} × {item.quantity}
          </p>
        ))}

      <h3>{t('cart.total')}: ₹{total}</h3>

      <Button label={t('summary.confirm')} onClick={() => alert('Saved')} />

      {onViewReport && (
        <Button
          label={t('summary.report')}
          onClick={onViewReport}
        />
      )}
    </div>
  )
}
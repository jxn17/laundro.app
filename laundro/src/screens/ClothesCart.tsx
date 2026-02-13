import { useCart } from '../hooks/useCart'
import QuantitySelector from '../components/QuantitySelector'
import Button from '../components/Button'
import { useTranslation } from 'react-i18next'
import type { OrderItem } from '../types/order'

type Props = {
  onNext: (items: OrderItem[], total: number) => void
}

export default function ClothesCart({ onNext }: Props) {
  const { t } = useTranslation()
  const { items, total, increment, decrement } = useCart()

  return (
    <div>
      <h2>{t('cart.title')}</h2>

      {items.map(item => (
        <div key={item.id}>
          <span>
            {t(`items.${item.id}`)} ₹{item.price}
          </span>
          <QuantitySelector
            quantity={item.quantity}
            onIncrement={() => increment(item.id)}
            onDecrement={() => decrement(item.id)}
          />
        </div>
      ))}

      <h3>{t('cart.total')}: ₹{total}</h3>

      <Button label={t('order.next')} onClick={() => onNext(items, total)} />
    </div>
  )
}
import { useCart } from '../hooks/useCart'
import QuantitySelector from '../components/QuantitySelector'
import Button from '../components/Button'
import { useTranslation } from 'react-i18next'
import type { OrderItem } from '../types/order'

type Props = {
  onNext: (items: OrderItem[]) => void
  onBack: () => void
}

export default function ClothesCart({ onNext, onBack }: Props) {
  const { t } = useTranslation()
  const { items, increment, decrement } = useCart()

  const handleNext = () => {
    const selectedItems = items.filter(i => i.quantity > 0)

    if (selectedItems.length === 0) {
      alert("Please select at least one item")
      return
    }

    onNext(selectedItems)
  }

  return (
    <div>
      <h2>{t('cart.title') || "Add Clothes"}</h2>

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

      <div style={{ marginTop: 20, display: "flex", gap: 10 }}>
        <button onClick={onBack}>Back</button>
        <Button label="Next" onClick={handleNext} />
      </div>
    </div>
  )
}
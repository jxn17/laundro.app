type Props = {
  quantity: number
  onIncrement: () => void
  onDecrement: () => void
}

export default function QuantitySelector({
  quantity,
  onIncrement,
  onDecrement
}: Props) {
  return (
    <div style={{ display: 'flex', gap: '10px' }}>
      <button onClick={onDecrement}>-</button>
      <span>{quantity}</span>
      <button onClick={onIncrement}>+</button>
    </div>
  )
}
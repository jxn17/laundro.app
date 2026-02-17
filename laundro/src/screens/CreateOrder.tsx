import { useState } from 'react'
import Button from '../components/Button'
import { useTranslation } from 'react-i18next'
import type { Customer } from '../types/order'

type Props = {
  onNext: (customer: Customer) => void
  onCancel: () => void
}

export default function CreateOrder({ onNext, onCancel }: Props) {
  const { t } = useTranslation()

  const [roomNumber, setRoomNumber] = useState('')
  const [phone, setPhone] = useState('')

  const handleNext = () => {
    if (!roomNumber || !phone) {
      alert("Please fill all fields")
      return
    }

    onNext({ roomNumber, phone })
  }

  return (
    <div>
      <h2>{t('order.create') || "Create Order"}</h2>

      <input
        placeholder="Room Number"
        value={roomNumber}
        onChange={(e) => setRoomNumber(e.target.value)}
      />

      <input
        placeholder="Phone Number"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
      />

      <div style={{ marginTop: 20, display: "flex", gap: 10 }}>
        <button onClick={onCancel}>Cancel</button>
        <Button label="Next" onClick={handleNext} />
      </div>
    </div>
  )
}
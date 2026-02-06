import { useState } from 'react'
import Button from '../components/Button'
import type { Customer } from '../types/order'
import { useTranslation } from 'react-i18next'

type Props = {
  onNext: (customer: Customer) => void
}

export default function CreateOrder({ onNext }: Props) {
  const { t } = useTranslation()

  const [roomNumber, setRoomNumber] = useState('')
  const [phone, setPhone] = useState('')

  return (
    <div>
      <h2>{t('order.create')}</h2>

      <input
        placeholder={t('order.room')}
        value={roomNumber}
        onChange={(e) => setRoomNumber(e.target.value)}
      />

      <input
        placeholder={t('order.phone')}
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
      />

      <Button
        label={t('order.next')}
        onClick={() => onNext({ roomNumber, phone })}
      />
    </div>
  )
}
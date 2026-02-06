import { useState, useMemo } from 'react'
import type { LaundryItem } from '../types/order'

const DEFAULT_ITEMS: LaundryItem[] = [
  { id: '1', name: 'T-Shirt', price: 20, quantity: 0 },
  { id: '2', name: 'Jeans', price: 40, quantity: 0 },
  { id: '3', name: 'Bedsheet', price: 30, quantity: 0 }
]

export function useCart(initialItems = DEFAULT_ITEMS) {
  const [items, setItems] = useState<LaundryItem[]>(initialItems)

  const increment = (id: string) => {
    setItems(items =>
      items.map(item =>
        item.id === id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    )
  }

  const decrement = (id: string) => {
    setItems(items =>
      items.map(item =>
        item.id === id
          ? { ...item, quantity: Math.max(0, item.quantity - 1) }
          : item
      )
    )
  }

  const total = useMemo(
    () =>
      items.reduce(
        (sum, item) => sum + item.quantity * item.price,
        0
      ),
    [items]
  )

  const selectedItems = useMemo(
    () => items.filter(item => item.quantity > 0),
    [items]
  )

  return {
    items,
    increment,
    decrement,
    total,
    selectedItems
  }
}
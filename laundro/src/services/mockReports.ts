import type { Order } from '../types/order'

export const mockDailyOrders: Order[] = [
  {
    id: 'o1',
    customer: {
      roomNumber: 'B-204',
      phone: '9876543210'
    },
    items: [
      { id: '1', name: 'T-Shirt', price: 20, quantity: 3 },
      { id: '2', name: 'Jeans', price: 40, quantity: 1 }
    ],
    total: 100,
    createdAt: new Date()
  },
  {
    id: 'o2',
    customer: {
      roomNumber: 'A-101',
      phone: '9123456780'
    },
    items: [
      { id: '1', name: 'T-Shirt', price: 20, quantity: 2 },
      { id: '3', name: 'Bedsheet', price: 30, quantity: 1 }
    ],
    total: 70,
    createdAt: new Date()
  }
]
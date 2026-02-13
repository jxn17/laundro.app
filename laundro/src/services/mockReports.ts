import type { OrderWithId } from '../types/order'

export const mockDailyOrders: OrderWithId[] = [
  {
    id: 'o1',
    customer: {
      roomNumber: 'B-204',
      phone: '9876543210'
    },
    items: [
      { id: 'tshirt', quantity: 3, price: 20 },
      { id: 'jeans', quantity: 1, price: 40 }
    ],
    total: 100,
    status: 'WASHING',
    createdAt: new Date()
  }
]
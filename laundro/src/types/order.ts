export type OrderStatus = 'WASHING' | 'READY' | 'PAID'

export type OrderItem = {
  id: string
  quantity: number
  price: number
}

export type Customer = {
  roomNumber: string
  phone: string
}

export type Order = {
  customer: Customer
  items: OrderItem[]
  total: number
  status: OrderStatus
  ownerId: string
  createdAt: Date
}
export type OrderWithId = Order & {
  id: string
}
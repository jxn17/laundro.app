export type LaundryItem = {
  id: string
  name: string
  price: number
  quantity: number
}

export type Customer = {
  roomNumber: string
  phone: string
}

export type Order = {
  id: string
  customer: Customer
  items: LaundryItem[]
  total: number
  createdAt: Date
}



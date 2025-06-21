export interface Item {
  id: string
  name: string
  type: "Shirt" | "Pant" | "Shoes" | "Sports Gear"
  description: string
  coverImage: string
  additionalImages: string[]
  createdAt: Date
  userId: string
}

export interface User {
  id: string
  email: string
  name: string
  createdAt: Date
}

export interface ItemsContextType {
  items: Item[]
  addItem: (item: Omit<Item, "id" | "createdAt" | "userId">) => void
  updateItem: (id: string, item: Partial<Omit<Item, "id" | "createdAt" | "userId">>) => void
  deleteItem: (id: string) => void
  getItem: (id: string) => Item | undefined
}

export interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<boolean>
  signup: (email: string, password: string, name: string) => Promise<boolean>
  logout: () => void
  isLoading: boolean
}

"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import type { Item, ItemsContextType } from "@/lib/types"
import { useAuth } from "./auth-context"

const ItemsContext = createContext<ItemsContextType | undefined>(undefined)

export function ItemsProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<Item[]>([])
  const { user } = useAuth()

  // Load items from localStorage on mount and when user changes
  useEffect(() => {
    if (user) {
      const savedItems = localStorage.getItem(`items_${user.id}`)
      if (savedItems) {
        try {
          const parsedItems = JSON.parse(savedItems).map((item: any) => ({
            ...item,
            createdAt: new Date(item.createdAt),
          }))
          setItems(parsedItems)
        } catch (error) {
          console.error("Error loading items from localStorage:", error)
        }
      }
    } else {
      setItems([])
    }
  }, [user])

  // Save items to localStorage whenever items change
  useEffect(() => {
    if (user) {
      localStorage.setItem(`items_${user.id}`, JSON.stringify(items))
    }
  }, [items, user])

  const addItem = (itemData: Omit<Item, "id" | "createdAt" | "userId">) => {
    if (!user) return

    const newItem: Item = {
      ...itemData,
      id: crypto.randomUUID(),
      userId: user.id,
      createdAt: new Date(),
    }
    setItems((prev) => [...prev, newItem])
  }

  const updateItem = (id: string, itemData: Partial<Omit<Item, "id" | "createdAt" | "userId">>) => {
    if (!user) return

    setItems((prev) =>
      prev.map((item) => (item.id === id && item.userId === user.id ? { ...item, ...itemData } : item)),
    )
  }

  const deleteItem = (id: string) => {
    if (!user) return

    setItems((prev) => prev.filter((item) => !(item.id === id && item.userId === user.id)))
  }

  const getItem = (id: string) => {
    return items.find((item) => item.id === id && item.userId === user?.id)
  }

  return (
    <ItemsContext.Provider value={{ items, addItem, updateItem, deleteItem, getItem }}>
      {children}
    </ItemsContext.Provider>
  )
}

export function useItems() {
  const context = useContext(ItemsContext)
  if (context === undefined) {
    throw new Error("useItems must be used within an ItemsProvider")
  }
  return context
}

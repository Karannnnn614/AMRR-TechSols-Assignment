"use client"

import type React from "react"

import { useState } from "react"
import { useItems } from "@/contexts/items-context"
import { ItemModal } from "./item-modal"
import { ConfirmDialog } from "./confirm-dialog"
import type { Item } from "@/lib/types"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { Edit, Trash2 } from "lucide-react"

interface ItemGridProps {
  onEditItem?: (item: Item) => void
}

export function ItemGrid({ onEditItem }: ItemGridProps) {
  const { items, deleteItem } = useItems()
  const [selectedItem, setSelectedItem] = useState<Item | null>(null)
  const [deleteConfirm, setDeleteConfirm] = useState<{ isOpen: boolean; item: Item | null }>({
    isOpen: false,
    item: null,
  })

  const handleDeleteClick = (e: React.MouseEvent, item: Item) => {
    e.stopPropagation()
    setDeleteConfirm({ isOpen: true, item })
  }

  const handleEditClick = (e: React.MouseEvent, item: Item) => {
    e.stopPropagation()
    onEditItem?.(item)
  }

  const handleDeleteConfirm = () => {
    if (deleteConfirm.item) {
      deleteItem(deleteConfirm.item.id)
    }
    setDeleteConfirm({ isOpen: false, item: null })
  }

  if (items.length === 0) {
    return (
      <div className="text-center py-12 animate-in fade-in-0 slide-in-from-bottom-4 duration-700">
        <div className="w-24 h-24 mx-auto mb-4 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-200 to-purple-200 rounded-full"></div>
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">No items yet</h3>
        <p className="text-gray-500">Add your first item to get started!</p>
      </div>
    )
  }

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {items.map((item, index) => (
          <div
            key={item.id}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:scale-[1.02] animate-in fade-in-0 slide-in-from-bottom-4 group"
            style={{ animationDelay: `${index * 100}ms` }}
            onClick={() => setSelectedItem(item)}
          >
            <div className="relative h-40 sm:h-48 overflow-hidden">
              <Image
                src={item.coverImage || "/placeholder.svg"}
                alt={item.name}
                fill
                className="object-cover transition-transform duration-300 hover:scale-110"
              />
              <div className="absolute top-2 right-2 flex gap-2 opacity-70 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-200">
                <Button
                  size="sm"
                  variant="secondary"
                  className="h-7 w-7 sm:h-8 sm:w-8 p-0 bg-white/90 hover:bg-white shadow-md"
                  onClick={(e) => handleEditClick(e, item)}
                  aria-label="Edit item"
                >
                  <Edit className="h-3 w-3 sm:h-4 sm:w-4" />
                </Button>
                <Button
                  size="sm"
                  variant="destructive"
                  className="h-7 w-7 sm:h-8 sm:w-8 p-0 bg-red-500/90 hover:bg-red-600 shadow-md"
                  onClick={(e) => handleDeleteClick(e, item)}
                  aria-label="Delete item"
                >
                  <Trash2 className="h-3 w-3 sm:h-4 sm:w-4" />
                </Button>
              </div>
            </div>
            <div className="p-3 sm:p-4">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-semibold text-gray-900 dark:text-gray-100 truncate text-sm sm:text-base">{item.name}</h3>
                <Badge variant="outline" className="ml-2 shrink-0 text-xs">
                  {item.type}
                </Badge>
              </div>
              <p className="text-gray-600 dark:text-gray-300 text-xs sm:text-sm line-clamp-2">{item.description}</p>
            </div>
          </div>
        ))}
      </div>

      {selectedItem && <ItemModal item={selectedItem} isOpen={!!selectedItem} onClose={() => setSelectedItem(null)} />}

      <ConfirmDialog
        isOpen={deleteConfirm.isOpen}
        onClose={() => setDeleteConfirm({ isOpen: false, item: null })}
        onConfirm={handleDeleteConfirm}
        title="Delete Item"
        description={`Are you sure you want to delete "${deleteConfirm.item?.name}"? This action cannot be undone.`}
        confirmText="Delete"
        variant="destructive"
      />
    </>
  )
}

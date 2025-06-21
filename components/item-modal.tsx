"use client"

import type { Item } from "@/lib/types"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ImageCarousel } from "./image-carousel"
import { X, Mail } from "lucide-react"

interface ItemModalProps {
  item: Item
  isOpen: boolean
  onClose: () => void
}

export function ItemModal({ item, isOpen, onClose }: ItemModalProps) {
  if (!isOpen) return null

  const handleEnquire = () => {
    // In a real app, this would send an email
    alert(`Enquiry sent for ${item.name}!`)
  }

  const allImages = [item.coverImage, ...item.additionalImages].filter(Boolean)

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in-0 duration-200">
      <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl animate-in zoom-in-95 slide-in-from-bottom-4 duration-300">
        <div className="sticky top-0 bg-white/95 backdrop-blur-sm border-b p-4 flex justify-between items-center rounded-t-xl">
          <h2 className="text-xl font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            {item.name}
          </h2>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="hover:bg-gray-100 transition-colors duration-200"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        <div className="p-6 space-y-6">
          <div className="animate-in fade-in-0 slide-in-from-bottom-2 duration-500">
            <ImageCarousel images={allImages} alt={item.name} />
          </div>

          <div className="space-y-4 animate-in fade-in-0 slide-in-from-bottom-2 duration-500 delay-100">
            <div>
              <h3 className="font-medium text-gray-900 mb-2">Item Type</h3>
              <Badge variant="secondary" className="bg-gradient-to-r from-blue-100 to-purple-100 text-blue-800">
                {item.type}
              </Badge>
            </div>

            <div>
              <h3 className="font-medium text-gray-900 mb-2">Description</h3>
              <p className="text-gray-700 leading-relaxed">{item.description}</p>
            </div>

            <div className="pt-4 animate-in fade-in-0 slide-in-from-bottom-2 duration-500 delay-200">
              <Button
                onClick={handleEnquire}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transition-all duration-200 transform hover:scale-[1.02]"
              >
                <Mail className="h-4 w-4 mr-2" />
                Enquire About This Item
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

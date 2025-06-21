"use client"

import { useEffect } from "react"
import { CheckCircle, X } from "lucide-react"

interface ToastProps {
  message: string
  show: boolean
  onClose: () => void
}

export function Toast({ message, show, onClose }: ToastProps) {
  useEffect(() => {
    if (show) {
      const timer = setTimeout(() => {
        onClose()
      }, 3000)
      return () => clearTimeout(timer)
    }
  }, [show, onClose])

  if (!show) return null

  return (
    <div className="fixed top-4 right-4 z-50 flex items-center gap-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white px-4 py-3 rounded-lg shadow-2xl animate-in slide-in-from-top-2 fade-in-0 duration-300">
      <CheckCircle className="h-5 w-5 animate-in zoom-in-50 duration-200 delay-100" />
      <span className="animate-in slide-in-from-left-2 duration-200 delay-150">{message}</span>
      <button
        onClick={onClose}
        className="ml-2 hover:bg-white/20 rounded p-1 transition-all duration-200 hover:scale-110"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  )
}

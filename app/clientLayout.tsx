"use client"

import type React from "react"
import "./globals.css"
import { Inter } from "next/font/google"
import { AuthProvider } from "@/contexts/auth-context"
import { ItemsProvider } from "@/contexts/items-context"
import { AuthGuard } from "@/components/auth/auth-guard"
import Link from "next/link"
import { Package, Plus, LogOut, User } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"
import { Button } from "@/components/ui/button"

const inter = Inter({ subsets: ["latin"] })

function Navigation() {
  const { user, logout } = useAuth()

  return (
    <nav className="bg-white/80 backdrop-blur-md shadow-sm border-b sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <Package className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Items Manager
              </span>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Link
              href="/"
              className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
            >
              View Items
            </Link>
            <Link
              href="/add"
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-4 py-2 rounded-md text-sm font-medium flex items-center gap-2 transition-all duration-200 transform hover:scale-105"
            >
              <Plus className="h-4 w-4" />
              Add Item
            </Link>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <User className="h-4 w-4" />
              {user?.name}
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={logout}
              className="hover:bg-red-50 hover:text-red-600 hover:border-red-200 transition-colors duration-200"
            >
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <AuthGuard>
            <ItemsProvider>
              <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
                <Navigation />
                <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 animate-in fade-in-0 slide-in-from-bottom-4 duration-700">
                  {children}
                </main>
              </div>
            </ItemsProvider>
          </AuthGuard>
        </AuthProvider>
      </body>
    </html>
  )
}

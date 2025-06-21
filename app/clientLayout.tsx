"use client";

import type React from "react";
import "./globals.css";
import { Inter } from "next/font/google";
import { AuthProvider } from "@/contexts/auth-context";
import { ItemsProvider } from "@/contexts/items-context";
import { AuthGuard } from "@/components/auth/auth-guard";
import Link from "next/link";
import { Package, Plus, LogOut, User } from "lucide-react";
import { useAuth } from "@/contexts/auth-context";
import { Button } from "@/components/ui/button";

const inter = Inter({ subsets: ["latin"] });

function Navigation() {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-white/80 dark:bg-gray-900/90 backdrop-blur-md shadow-sm border-b sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex justify-between h-14 sm:h-16">
          <div className="flex items-center">
            <div className="flex items-center space-x-2">
              <div className="w-7 h-7 sm:w-8 sm:h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <Package className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
              </div>
              <span className="text-lg sm:text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Items Manager
              </span>
            </div>
          </div>
          <div className="flex items-center space-x-1 sm:space-x-4">
            <Link
              href="/"
              className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 px-2 sm:px-3 py-2 rounded-md text-xs sm:text-sm font-medium transition-colors duration-200"
            >
              View Items
            </Link>
            <Link
              href="/add"
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-2 sm:px-4 py-1.5 sm:py-2 rounded-md text-xs sm:text-sm font-medium flex items-center gap-1 sm:gap-2 transition-all duration-200 transform hover:scale-105"
            >
              <Plus className="h-3 w-3 sm:h-4 sm:w-4" />
              <span className="hidden xs:inline">Add Item</span>
              <span className="xs:hidden">Add</span>
            </Link>
            <div className="hidden sm:flex items-center gap-2 text-xs sm:text-sm text-gray-600 dark:text-gray-400">
              <User className="h-3 w-3 sm:h-4 sm:w-4" />
              <span className="max-w-[100px] truncate">{user?.name}</span>
            </div>
            <Button
              variant="outline"
              size="icon"
              onClick={logout}
              className="h-7 w-7 sm:h-8 sm:w-8 p-0 hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-600 dark:hover:text-red-400 hover:border-red-200 dark:hover:border-red-800 transition-colors duration-200"
              aria-label="Logout"
            >
              <LogOut className="h-3 w-3 sm:h-4 sm:w-4" />
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <AuthGuard>
            <ItemsProvider>
              <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800">
                <Navigation />
                <main className="max-w-7xl mx-auto py-4 sm:py-6 px-3 sm:px-6 lg:px-8 animate-in fade-in-0 slide-in-from-bottom-4 duration-700">
                  {children}
                </main>
              </div>
            </ItemsProvider>
          </AuthGuard>
        </AuthProvider>
      </body>
    </html>
  );
}

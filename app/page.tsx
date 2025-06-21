"use client";

import { useState } from "react";
import { ItemGrid } from "@/components/item-grid";
import { ItemForm } from "@/components/item-form";
import type { Item } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

export default function HomePage() {
  const [editingItem, setEditingItem] = useState<Item | null>(null);

  const handleEditItem = (item: Item) => {
    setEditingItem(item);
  };

  const handleEditSuccess = () => {
    setEditingItem(null);
  };

  return (
    <div>
      {editingItem ? (
        <div className="animate-in fade-in-0 slide-in-from-right-4 duration-300">
          <div className="mb-4 sm:mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 sm:gap-0">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Edit Item
              </h1>
              <p className="mt-1 sm:mt-2 text-sm sm:text-base text-gray-600 dark:text-gray-300">
                Update the details of your item
              </p>
            </div>
            <Button
              variant="outline"
              onClick={() => setEditingItem(null)}
              className="hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200 w-full sm:w-auto"
            >
              <X className="h-4 w-4 mr-2" />
              Cancel
            </Button>
          </div>
          <ItemForm editItem={editingItem} onSuccess={handleEditSuccess} />
        </div>
      ) : (
        <div className="animate-in fade-in-0 slide-in-from-left-4 duration-300">
          <div className="mb-4 sm:mb-8">
            <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Your Items
            </h1>
            <p className="mt-1 sm:mt-2 text-sm sm:text-base text-gray-600 dark:text-gray-300">
              Browse and manage your collection of items
            </p>
          </div>
          <ItemGrid onEditItem={handleEditItem} />
        </div>
      )}
    </div>
  );
}

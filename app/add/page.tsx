import { ItemForm } from "@/components/item-form";

export default function AddItemPage() {
  return (
    <div className="animate-in fade-in-0 slide-in-from-bottom-4 duration-700">
      <div className="mb-4 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Add New Item
        </h1>
        <p className="mt-1 sm:mt-2 text-sm sm:text-base text-gray-600 dark:text-gray-300">
          Fill in the details below to add a new item to your collection
        </p>
      </div>
      <ItemForm />
    </div>
  );
}

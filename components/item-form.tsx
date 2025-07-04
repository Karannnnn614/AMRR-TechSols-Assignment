"use client";

import type React from "react";
import { useState, useEffect } from "react";
import { useItems } from "@/contexts/items-context";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Toast } from "./toast";
import type { Item } from "@/lib/types";
import { X } from "lucide-react";

const ITEM_TYPES = ["Shirt", "Pant", "Shoes", "Sports Gear"] as const;

interface ItemFormProps {
  editItem?: Item;
  onSuccess?: () => void;
}

export function ItemForm({ editItem, onSuccess }: ItemFormProps) {
  const { addItem, updateItem } = useItems();
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    type: "" as (typeof ITEM_TYPES)[number] | "",
    description: "",
    coverImage: "",
    additionalImages: [] as string[],
  });

  // Populate form when editing
  useEffect(() => {
    if (editItem) {
      setFormData({
        name: editItem.name,
        type: editItem.type,
        description: editItem.description,
        coverImage: editItem.coverImage,
        additionalImages: editItem.additionalImages,
      });
    }
  }, [editItem]);

  const handleFileUpload = (files: FileList | null, isMultiple = false) => {
    if (!files) return;

    const fileArray = Array.from(files);
    const promises = fileArray.map((file) => {
      return new Promise<string>((resolve) => {
        const reader = new FileReader();
        reader.onload = (e) => resolve(e.target?.result as string);
        reader.readAsDataURL(file);
      });
    });

    Promise.all(promises).then((results) => {
      if (isMultiple) {
        setFormData((prev) => ({
          ...prev,
          additionalImages: [...prev.additionalImages, ...results],
        }));
      } else {
        setFormData((prev) => ({ ...prev, coverImage: results[0] }));
      }
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !formData.name ||
      !formData.type ||
      !formData.description ||
      !formData.coverImage
    ) {
      alert("Please fill in all required fields");
      return;
    }

    if (editItem) {
      updateItem(editItem.id, {
        name: formData.name,
        type: formData.type as (typeof ITEM_TYPES)[number],
        description: formData.description,
        coverImage: formData.coverImage,
        additionalImages: formData.additionalImages,
      });
      setToastMessage("Item updated successfully!");
    } else {
      addItem({
        name: formData.name,
        type: formData.type as (typeof ITEM_TYPES)[number],
        description: formData.description,
        coverImage: formData.coverImage,
        additionalImages: formData.additionalImages,
      });
      setToastMessage("Item added successfully!");
    }

    // Reset form if not editing
    if (!editItem) {
      setFormData({
        name: "",
        type: "",
        description: "",
        coverImage: "",
        additionalImages: [],
      });
    }

    setShowToast(true);
    onSuccess?.();
  };

  const removeAdditionalImage = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      additionalImages: prev.additionalImages.filter((_, i) => i !== index),
    }));
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="space-y-4 sm:space-y-6 max-w-2xl mx-auto"
      >
        <div className="space-y-1 sm:space-y-2">
          <Label htmlFor="name" className="text-sm sm:text-base">
            Item Name *
          </Label>
          <Input
            id="name"
            value={formData.name}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, name: e.target.value }))
            }
            placeholder="Enter item name"
            className="transition-all duration-200 focus:scale-[1.01] text-sm sm:text-base"
            required
          />
        </div>

        <div className="space-y-1 sm:space-y-2">
          <Label htmlFor="type" className="text-sm sm:text-base">
            Item Type *
          </Label>
          <Select
            value={formData.type}
            onValueChange={(value) =>
              setFormData((prev) => ({
                ...prev,
                type: value as (typeof ITEM_TYPES)[number],
              }))
            }
          >
            <SelectTrigger className="transition-all duration-200 focus:scale-[1.01] text-sm sm:text-base h-9 sm:h-10">
              <SelectValue placeholder="Select item type" />
            </SelectTrigger>
            <SelectContent>
              {ITEM_TYPES.map((type) => (
                <SelectItem
                  key={type}
                  value={type}
                  className="text-sm sm:text-base"
                >
                  {type}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-1 sm:space-y-2">
          <Label htmlFor="description" className="text-sm sm:text-base">
            Item Description *
          </Label>
          <Textarea
            id="description"
            value={formData.description}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, description: e.target.value }))
            }
            placeholder="Enter item description"
            rows={4}
            className="text-sm sm:text-base min-h-[100px] transition-all duration-200 focus:scale-[1.01]"
            required
          />
        </div>

        <div className="space-y-1 sm:space-y-2">
          <Label htmlFor="coverImage" className="text-sm sm:text-base">
            Cover Image *
          </Label>
          <Input
            id="coverImage"
            type="file"
            accept="image/*"
            onChange={(e) => handleFileUpload(e.target.files)}
            className="text-xs sm:text-sm transition-all duration-200 focus:scale-[1.01] file:mr-2 file:py-1 file:px-2 sm:file:py-2 sm:file:px-4"
            required={!editItem}
          />
          {formData.coverImage && (
            <div className="mt-2 animate-in fade-in-0 slide-in-from-bottom-2 duration-300">
              <img
                src={formData.coverImage || "/placeholder.svg"}
                alt="Cover preview"
                className="w-24 h-24 sm:w-32 sm:h-32 object-cover rounded-lg shadow-md"
              />
            </div>
          )}
        </div>

        <div className="space-y-1 sm:space-y-2">
          <Label htmlFor="additionalImages" className="text-sm sm:text-base">
            Additional Images
          </Label>
          <Input
            id="additionalImages"
            type="file"
            accept="image/*"
            multiple
            onChange={(e) => handleFileUpload(e.target.files, true)}
            className="text-xs sm:text-sm transition-all duration-200 focus:scale-[1.01] file:mr-2 file:py-1 file:px-2 sm:file:py-2 sm:file:px-4"
          />
          {formData.additionalImages.length > 0 && (
            <div className="mt-2 grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-2 animate-in fade-in-0 slide-in-from-bottom-2 duration-300">
              {formData.additionalImages.map((image, index) => (
                <div key={index} className="relative group">
                  <img
                    src={image || "/placeholder.svg"}
                    alt={`Additional preview ${index + 1}`}
                    className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-lg shadow-md transition-transform duration-200 group-hover:scale-105"
                  />
                  <button
                    type="button"
                    onClick={() => removeAdditionalImage(index)}
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center text-xs hover:bg-red-600 transition-all duration-200 transform hover:scale-110 sm:opacity-0 sm:group-hover:opacity-100"
                  >
                    <X className="h-2.5 w-2.5 sm:h-3 sm:w-3" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        <Button
          type="submit"
          className="w-full py-2 sm:py-3 text-sm sm:text-base bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transition-all duration-200 transform hover:scale-[1.02]"
        >
          {editItem ? "Update Item" : "Add Item"}
        </Button>
      </form>

      <Toast
        message={toastMessage}
        show={showToast}
        onClose={() => setShowToast(false)}
      />
    </>
  );
}

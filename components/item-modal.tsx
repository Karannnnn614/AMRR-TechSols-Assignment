"use client";

import type { Item } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ImageCarousel } from "./image-carousel";
import { X, Mail, Loader2 } from "lucide-react";
import { useState } from "react";
import { Toast } from "./toast";

interface ItemModalProps {
  item: Item;
  isOpen: boolean;
  onClose: () => void;
}

export function ItemModal({ item, isOpen, onClose }: ItemModalProps) {
  const [loading, setLoading] = useState(false);
  const [showToast, setShowToast] = useState(false);

  if (!isOpen) return null;

  const handleEnquire = () => {
    setLoading(true);

    // Simulate sending an email with a timeout
    setTimeout(() => {
      setLoading(false);
      setShowToast(true);
    }, 1500);
  };

  const allImages = [item.coverImage, ...item.additionalImages].filter(Boolean);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/50 backdrop-blur-sm animate-in fade-in-0 duration-200 overflow-y-auto">
      <div className="bg-white dark:bg-gray-900 rounded-xl max-w-2xl w-full max-h-[95vh] overflow-y-auto shadow-2xl animate-in zoom-in-95 slide-in-from-bottom-4 duration-300 my-2 sm:my-4">
        <div className="sticky top-0 bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm border-b dark:border-gray-700 p-3 sm:p-4 flex justify-between items-center rounded-t-xl">
          <h2 className="text-lg sm:text-xl font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent truncate max-w-[75%]">
            {item.name}
          </h2>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        <div className="p-3 sm:p-6 space-y-4 sm:space-y-6">
          <div className="animate-in fade-in-0 slide-in-from-bottom-2 duration-500">
            <ImageCarousel images={allImages} alt={item.name} />
          </div>

          <div className="space-y-3 sm:space-y-4 animate-in fade-in-0 slide-in-from-bottom-2 duration-500 delay-100">
            <div>
              <h3 className="font-medium text-gray-900 dark:text-gray-100 mb-2">
                Item Type
              </h3>
              <Badge
                variant="secondary"
                className="bg-gradient-to-r from-blue-100 to-purple-100 text-blue-800 dark:from-blue-900 dark:to-purple-900 dark:text-blue-200"
              >
                {item.type}
              </Badge>
            </div>

            <div>
              <h3 className="font-medium text-gray-900 dark:text-gray-100 mb-2">
                Description
              </h3>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-sm sm:text-base">
                {item.description}
              </p>
            </div>

            <div className="pt-4 animate-in fade-in-0 slide-in-from-bottom-2 duration-500 delay-200">
              <Button
                onClick={handleEnquire}
                disabled={loading}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transition-all duration-200 transform hover:scale-[1.02] disabled:opacity-70"
              >
                {loading ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Sending Enquiry...
                  </>
                ) : (
                  <>
                    <Mail className="h-4 w-4 mr-2" />
                    Enquire About This Item
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>

      <Toast
        message="Email sent successfully!"
        show={showToast}
        onClose={() => setShowToast(false)}
      />
    </div>
  );
}

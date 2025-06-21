"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"

interface ImageCarouselProps {
  images: string[]
  alt: string
}

export function ImageCarousel({ images, alt }: ImageCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)

  if (images.length === 0) {
    return (
      <div className="w-full h-64 bg-gray-200 rounded-lg flex items-center justify-center">
        <span className="text-gray-500">No images available</span>
      </div>
    )
  }

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1))
  }

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1))
  }

  return (
    <div className="relative w-full">
      <div className="relative h-48 sm:h-56 md:h-64 lg:h-80 overflow-hidden rounded-lg">
        <Image
          src={images[currentIndex] || "/placeholder.svg"}
          alt={`${alt} - Image ${currentIndex + 1}`}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 768px) 80vw, 700px"
          priority={currentIndex === 0}
          className="object-cover transition-all duration-500 ease-in-out"
        />
      </div>

      {images.length > 1 && (
        <>
          <Button
            variant="outline"
            size="icon"
            className="absolute left-1 sm:left-2 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white dark:bg-gray-800/80 dark:hover:bg-gray-800 transition-all duration-200 hover:scale-110 h-7 w-7 sm:h-8 sm:w-8"
            onClick={goToPrevious}
            aria-label="Previous image"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>

          <Button
            variant="outline"
            size="icon"
            className="absolute right-1 sm:right-2 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white dark:bg-gray-800/80 dark:hover:bg-gray-800 transition-all duration-200 hover:scale-110 h-7 w-7 sm:h-8 sm:w-8"
            onClick={goToNext}
            aria-label="Next image"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>

          <div className="flex justify-center mt-2 sm:mt-3 md:mt-4 gap-1.5 sm:gap-2">
            {images.map((_, index) => (
              <button
                key={index}
                className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full transition-all duration-200 ${
                  index === currentIndex ? "bg-blue-600 scale-125" : "bg-gray-300 hover:bg-gray-400 dark:bg-gray-600 dark:hover:bg-gray-500"
                }`}
                onClick={() => setCurrentIndex(index)}
                aria-label={`Go to image ${index + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  )
}

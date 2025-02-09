'use client';

import Image from 'next/image';
import { Integration } from '@/types/integration';
import { useState } from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { cn } from '@/lib/utils';

export function ImageCarousel({ images }: { images: Integration['images'] }) {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  if (!images) return null;

  return (
    <>
      <div className="mt-8">
        <h3 className="text-xl font-bold text-foreground mb-6">Media</h3>
        <div className="grid grid-cols-3 gap-4">
          {images.map((image, index) => (
            <button
              key={image.id}
              onClick={() => setSelectedImage(index)}
              className={cn(
                "relative aspect-video bg-muted rounded-lg overflow-hidden group",
                "cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2",
                "transition-transform hover:scale-[1.02]"
              )}
            >
              <Image
                src={`${process.env.NEXT_PUBLIC_STRAPI_URL}${image.url}`}
                alt={image.alternativeText || "Integration screenshot"}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
            </button>
          ))}
        </div>
      </div>

      <Dialog open={selectedImage !== null} onOpenChange={() => setSelectedImage(null)}>
        <DialogContent className="max-w-screen-lg p-0 bg-transparent border-none">
          {selectedImage !== null && images[selectedImage] && (
            <div className="relative w-full aspect-[16/9]">
              <Image
                src={`${process.env.NEXT_PUBLIC_STRAPI_URL}${images[selectedImage].url}`}
                alt={images[selectedImage].alternativeText || "Integration screenshot"}
                fill
                className="object-contain"
                sizes="100vw"
                priority
              />
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
} 
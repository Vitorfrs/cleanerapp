import React, { useCallback } from 'react';
import { Upload, Image as ImageIcon } from 'lucide-react';

interface ImageUploadProps extends React.HTMLAttributes<HTMLDivElement> {
  images: string[];
  onImagesChange: (images: string[]) => void;
  maxImages?: number;
  onAcceptResponsibility: (accepted: boolean) => void;
  hasAcceptedResponsibility: boolean;
}

export function ImageUpload({
  images,
  onImagesChange,
  maxImages = 4,
  onAcceptResponsibility,
  hasAcceptedResponsibility
}: ImageUploadProps) {
  const handleImageUpload = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length + images.length > maxImages) {
      alert(`Maximum ${maxImages} images allowed`);
      return;
    }

    const newImages = await Promise.all(
      files.map(file => new Promise<string>((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result as string);
        reader.readAsDataURL(file);
      }))
    );

    onImagesChange([...images, ...newImages]);
  }, [images, maxImages, onImagesChange]);

  const removeImage = (index: number) => {
    onImagesChange(images.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-6">
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <p className="text-sm text-blue-800">
          Adding photos helps us provide a more accurate time estimate. While optional, 
          photos give our cleaners better preparation and ensure more precise pricing.
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {images.map((image, index) => (
          <div key={index} className="relative aspect-square rounded-lg overflow-hidden">
            <img src={image} alt={`Space ${index + 1}`} className="w-full h-full object-cover" />
            <button
              onClick={() => removeImage(index)}
              className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
            >
              ×
            </button>
          </div>
        ))}
        {images.length < maxImages && (
          <label className="aspect-square rounded-lg border-2 border-dashed border-gray-300 hover:border-pink-500 transition-colors cursor-pointer flex flex-col items-center justify-center gap-2">
            <Upload className="w-6 h-6 text-gray-400" />
            <span className="text-sm text-gray-500">Upload Image</span>
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleImageUpload}
              className="hidden"
            />
          </label>
        )}
      </div>
      <p className="text-sm text-gray-500">
        Upload up to {maxImages} images of your space for a more accurate quote
      </p>
      
      {images.length === 0 && (
        <div className="border-t border-gray-200 pt-4">
          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={hasAcceptedResponsibility}
              onChange={(e) => onAcceptResponsibility(e.target.checked)}
              className="mt-1"
            />
            <span className="text-sm text-gray-600">
              I understand that without photos, the final cleaning time may vary based on the actual 
              condition of the space. Any significant differences from the described condition may 
              result in additional time and cost adjustments.
            </span>
          </label>
        </div>
      )}
    </div>
  );
}
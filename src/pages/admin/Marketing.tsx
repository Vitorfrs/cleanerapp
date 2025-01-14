import React, { useState, useEffect } from 'react';
import { Upload, Trash2, MoveUp, MoveDown, AlertCircle, Loader2 } from 'lucide-react';
import { supabase } from '../../services/supabase';
import { BackgroundImageUpload } from '../../components/admin/BackgroundImageUpload';
import { v4 as uuidv4 } from 'uuid';
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { arrayMove, SortableContext, sortableKeyboardCoordinates, useSortable, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ALLOWED_FILE_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];

interface BackgroundImage {
  id: string;
  url: string;
  title: string;
  order: number;
}

interface DraggableImageProps {
  image: BackgroundImage;
  index: number;
  moveImage: (dragIndex: number, hoverIndex: number) => void;
  onDelete: (id: string, url: string) => void;
  onMove: (id: string, direction: 'up' | 'down') => void;
  totalImages: number;
}

const DraggableImage = ({ image, index, moveImage, onDelete, onMove, totalImages }: DraggableImageProps) => {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({
    id: image.id
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={`bg-white rounded-lg shadow-sm overflow-hidden transition-opacity ${
        isDragging ? 'opacity-50' : 'opacity-100'
      }`}
    >
      <div className="aspect-video relative group">
        <img
          src={image.url}
          alt={image.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all" />
      </div>
      <div className="p-4">
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-500">Order: {index + 1}</span>
          <div className="flex items-center gap-2">
            <button
              onClick={() => onMove(image.id, 'up')}
              disabled={index === 0}
              className="p-1 text-gray-500 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <MoveUp className="w-5 h-5" />
            </button>
            <button
              onClick={() => onMove(image.id, 'down')}
              disabled={index === totalImages - 1}
              className="p-1 text-gray-500 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <MoveDown className="w-5 h-5" />
            </button>
            {showDeleteConfirm ? (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => onDelete(image.id, image.url)}
                  className="text-xs bg-red-500 text-white px-2 py-1 rounded"
                >
                  Confirm
                </button>
                <button
                  onClick={() => setShowDeleteConfirm(false)}
                  className="text-xs bg-gray-200 text-gray-700 px-2 py-1 rounded"
                >
                  Cancel
                </button>
              </div>
            ) : (
              <button
                onClick={() => setShowDeleteConfirm(true)}
                className="p-1 text-red-500 hover:text-red-700"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export function Marketing() {
  const [images, setImages] = useState<BackgroundImage[]>([]);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  useEffect(() => {
    fetchImages();
  }, []);

  async function fetchImages() {
    try {
      const { data, error } = await supabase
        .from('background_images')
        .select('*')
        .order('order');
      
      if (error) throw error;
      setImages(data || []);
    } catch (error) {
      console.error('Error fetching images:', error);
      setError('Failed to fetch images');
    }
  }

  async function uploadImage(file: File) {
    try {
      setUploading(true);
      setError(null);
      
      // Validate file size
      if (file.size > MAX_FILE_SIZE) {
        throw new Error('File size must be less than 5MB');
      }

      // Validate file type
      if (!ALLOWED_FILE_TYPES.includes(file.type)) {
        throw new Error('File type must be JPEG, PNG, WebP, or GIF');
      }

      // Upload to storage
      const fileExt = file.name.split('.').pop();
      const fileName = `${uuidv4()}.${fileExt}`;
      
      // Get current session
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        throw new Error('Not authenticated');
      }

      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('backgrounds')
        .upload(fileName, file, {
          cacheControl: '3600',
          upsert: false,
          contentType: file.type
        });

      if (uploadError) {
        console.error('Storage upload error:', uploadError);
        throw new Error('Failed to upload image to storage');
      }

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('backgrounds')
        .getPublicUrl(fileName);
      
      // Verify the URL was generated
      if (!publicUrl) {
        throw new Error('Failed to generate public URL');
      }

      // Add to database
      const { data: insertData, error: dbError } = await supabase
        .from('background_images')
        .insert({
          url: publicUrl,
          title: file.name,
          order: images.length
        })
        .select()
        .single();

      if (dbError) {
        console.error('Database insert error:', dbError);
        // If database insert fails, clean up the uploaded file
        await supabase.storage
          .from('backgrounds')
          .remove([fileName]);
        throw new Error('Failed to save image information');
      }

      await fetchImages();
    } catch (error) {
      console.error('Error uploading image:', error);
      setError(error instanceof Error ? error.message : 'Failed to upload image');
    } finally {
      setUploading(false);
    }
  }

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) {
      await uploadImage(file);
    }
  }

  async function deleteImage(id: string, url: string) {
    try {
      setError(null);
      setUploading(true);
      
      // Delete from storage
      const fileName = url.split('backgrounds/').pop();
      if (fileName) {
        const { error: storageError } = await supabase.storage
          .from('backgrounds')
          .remove([fileName]);

        if (storageError) {
          console.error('Storage delete error:', storageError);
          // Continue with database deletion even if storage fails
          console.warn('Storage delete failed, continuing with database deletion');
        }
      }

      // Delete from database
      const { error: dbError } = await supabase
        .from('background_images')
        .delete()
        .eq('id', id);

      if (dbError) {
        console.error('Database delete error:', dbError);
        throw new Error('Failed to delete image information');
      }

      setSuccess('Image deleted successfully');
      setTimeout(() => setSuccess(null), 3000);
      await fetchImages();
    } catch (error) {
      console.error('Error deleting image:', error);
      setError(error instanceof Error ? error.message : 'Failed to delete image');
    } finally {
      setUploading(false);
    }
  }

  async function moveImage(id: string, direction: 'up' | 'down') {
    try {
      setError(null);
      
      // Get current session
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        throw new Error('Not authenticated');
      }

      const currentIndex = images.findIndex(img => img.id === id);
      if (
        (direction === 'up' && currentIndex === 0) ||
        (direction === 'down' && currentIndex === images.length - 1)
      ) {
        return;
      }

      const newIndex = direction === 'up' ? currentIndex - 1 : currentIndex + 1;
      const newImages = [...images];
      [newImages[currentIndex], newImages[newIndex]] = [newImages[newIndex], newImages[currentIndex]];

      // Update orders in database
      const updates = newImages.map((img, index) => ({
        id: img.id,
        order: index
      }));

      const { error } = await supabase
        .from('background_images')
        .upsert(updates, { onConflict: 'id' });

      if (error) throw error;
      await fetchImages();
    } catch (error) {
      console.error('Error reordering images:', error);
      setError('Failed to reorder images');
    }
  }

  const moveImageByDrag = async (dragIndex: number, hoverIndex: number) => {
    const draggedImage = images[dragIndex];
    const newImages = [...images];
    newImages.splice(dragIndex, 1);
    newImages.splice(hoverIndex, 0, draggedImage);
    
    // Update local state immediately for smooth UI
    setImages(newImages);
    
    // Update database
    try {
      const updates = newImages.map((img, index) => ({
        id: img.id,
        order: index
      }));

      const { error } = await supabase
        .from('background_images')
        .upsert(updates, { onConflict: 'id' });

      if (error) throw error;
      
      setSuccess('Image order updated successfully');
      setTimeout(() => setSuccess(null), 3000);
    } catch (error) {
      console.error('Error updating order:', error);
      setError('Failed to update image order');
      // Revert to original order on error
      await fetchImages();
    }
  };

  const handleDragEnd = async (event: any) => {
    const { active, over } = event;
    
    if (active.id !== over.id) {
      setImages((items) => {
        const oldIndex = items.findIndex(item => item.id === active.id);
        const newIndex = items.findIndex(item => item.id === over.id);
        
        return arrayMove(items, oldIndex, newIndex);
      });
      
      // Update database
      try {
        const updates = images.map((img, index) => ({
          id: img.id,
          order: index
        }));

        const { error } = await supabase
          .from('background_images')
          .upsert(updates, { onConflict: 'id' });

        if (error) throw error;
        
        setSuccess('Image order updated successfully');
        setTimeout(() => setSuccess(null), 3000);
      } catch (error) {
        console.error('Error updating order:', error);
        setError('Failed to update image order');
        await fetchImages();
      }
    }
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Background Images</h1>
        <div className="text-sm text-gray-500">
          Drag and drop images to reorder or use the arrow buttons
        </div>
      </div>

      <div className="mb-8">
        <BackgroundImageUpload />
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-50 text-red-700 rounded-lg">
          {error}
        </div>
      )}

      {success && (
        <div className="mb-6 p-4 bg-green-50 text-green-700 rounded-lg flex items-center gap-2">
          <Check className="w-5 h-5" />
          {success}
        </div>
      )}

      {uploading && (
        <div className="mb-6 p-4 bg-blue-50 text-blue-700 rounded-lg flex items-center gap-2">
          <Loader2 className="w-5 h-5 animate-spin" />
          Processing images...
        </div>
      )}

      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext items={images.map(img => img.id)} strategy={verticalListSortingStrategy}>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {images.map((image, index) => (
              <DraggableImage
                key={image.id}
                image={image}
                index={index}
                moveImage={moveImageByDrag}
                onDelete={deleteImage}
                onMove={moveImage}
                totalImages={images.length}
              />
            ))}
          </div>
        </SortableContext>
      </DndContext>
    </div>
  );
}
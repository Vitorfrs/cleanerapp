import React, { useState } from 'react';
import { Link2, Plus, AlertCircle, Loader2, Check } from 'lucide-react';
import { supabase } from '../../services/supabase';

interface UploadStatus {
  progress: number;
  status: 'idle' | 'uploading' | 'success' | 'error';
  message?: string;
}

export function BackgroundImageUpload() {
  const [imageUrl, setImageUrl] = useState('');
  const [title, setTitle] = useState('');
  const [loading, setLoading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState<UploadStatus>({
    progress: 0,
    status: 'idle'
  });
  const [error, setError] = useState<string | null>(null);

  const convertUnsplashUrl = (url: string): string | null => {
    try {
      // Handle direct image URLs
      if (url.startsWith('https://images.unsplash.com/photo-')) {
        return url;
      }

      // Handle photo page URLs
      const unsplashRegex = /https:\/\/unsplash\.com\/photos\/([\w-]+)/i;
      const match = url.match(unsplashRegex);
      
      if (match) {
        const photoId = match[1];
        return `https://images.unsplash.com/photo-${photoId}?auto=format&fit=crop&q=80&w=2000&h=1200`;
      }

      return null;
    } catch (err) {
      return null;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setUploadStatus({ progress: 0, status: 'uploading' });

    const validImageUrl = convertUnsplashUrl(imageUrl);
    if (!validImageUrl) {
      setError('Please enter a valid Unsplash image URL');
      setUploadStatus({ progress: 0, status: 'error', message: 'Invalid URL' });
      return;
    }

    setLoading(true);
    try {
      setUploadStatus({ progress: 30, status: 'uploading', message: 'Validating image...' });

      // Get current max order
      const { data: existingImages } = await supabase
        .from('background_images')
        .select('order')
        .order('order', { ascending: false })
        .limit(1);

      setUploadStatus({ progress: 60, status: 'uploading', message: 'Adding to database...' });

      const nextOrder = existingImages && existingImages[0] ? existingImages[0].order + 1 : 0;

      // Insert new image
      const { error: insertError } = await supabase
        .from('background_images')
        .insert({
          url: validImageUrl,
          title: title || 'Background Image',
          order: nextOrder
        });

      if (insertError) throw insertError;

      // Clear form
      setImageUrl('');
      setTitle('');
      setError(null);
      setUploadStatus({ progress: 100, status: 'success', message: 'Image added successfully!' });
      
      // Reset status after 3 seconds
      setTimeout(() => {
        setUploadStatus({ progress: 0, status: 'idle' });
      }, 3000);
    } catch (err) {
      console.error('Error adding image:', err);
      setError('Failed to add image. Please try again.');
      setUploadStatus({ progress: 0, status: 'error', message: 'Upload failed' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Add Background Image</h3>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        {error && (
          <div className="flex items-center gap-2 text-red-600 bg-red-50 p-3 rounded-lg">
            <AlertCircle className="w-5 h-5" />
            <span>{error}</span>
          </div>
        )}

        {uploadStatus.status === 'success' && (
          <div className="flex items-center gap-2 text-green-600 bg-green-50 p-3 rounded-lg">
            <Check className="w-5 h-5" />
            <span>{uploadStatus.message}</span>
          </div>
        )}

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Unsplash Image URL
          </label>
          <div className="relative">
            <Link2 className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="url"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              placeholder="https://images.unsplash.com/..."
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500/20"
              required
            />
          </div>
          <p className="mt-1 text-xs text-gray-500">
            Paste a link from Unsplash (e.g., https://images.unsplash.com/photo-...)
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Title (Optional)
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Background Image Title"
            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500/20"
          />
        </div>

        <button
          type="submit"
          disabled={loading || !imageUrl}
          className="flex items-center justify-center gap-2 w-full bg-[#C4A484] hover:bg-[#B8997D] text-white px-4 py-2 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            <Plus className="w-5 h-5" />
          )}
          <span>{loading ? 'Adding Image...' : 'Add Image'}</span>
        </button>
        
        {uploadStatus.status === 'uploading' && (
          <div className="mt-4">
            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
              <div 
                className="h-full bg-pink-500 transition-all duration-300"
                style={{ width: `${uploadStatus.progress}%` }}
              />
            </div>
            <p className="text-sm text-gray-600 mt-2">{uploadStatus.message}</p>
          </div>
        )}
      </form>
    </div>
  );
}
import { useState, useCallback } from 'react';
import { Upload, Image as ImageIcon, X, Camera, Video } from 'lucide-react';
import { Button } from './ui/button';
import { cn } from '@/lib/utils';

interface ImageUploaderProps {
  onImageSelect: (file: File) => void;
  className?: string;
}

export function ImageUploader({ onImageSelect, className }: ImageUploaderProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file && (file.type.startsWith('image/') || file.type.startsWith('video/'))) {
      handleFileSelect(file);
    }
  }, []);

  const handleFileSelect = (file: File) => {
    setSelectedFile(file);
    if (file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => setPreview(e.target?.result as string);
      reader.readAsDataURL(file);
    } else {
      setPreview(null);
    }
    onImageSelect(file);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFileSelect(file);
  };

  const clearSelection = () => {
    setPreview(null);
    setSelectedFile(null);
  };

  return (
    <div className={cn('w-full', className)}>
      {!preview ? (
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={cn(
            'relative flex flex-col items-center justify-center p-12 border-2 border-dashed rounded-2xl transition-all duration-300',
            isDragging
              ? 'border-primary bg-primary/10 scale-[1.02]'
              : 'border-border bg-card/50 hover:border-primary/50 hover:bg-card'
          )}
        >
          <input
            type="file"
            accept="image/*,video/*"
            onChange={handleInputChange}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          />
          <div className="flex flex-col items-center gap-4 pointer-events-none">
            <div className="p-4 rounded-full bg-primary/10">
              <Upload className="w-10 h-10 text-primary" />
            </div>
            <div className="text-center space-y-2">
              <p className="text-lg font-semibold text-foreground">
                Drop your road photo or video here
              </p>
              <p className="text-sm text-muted-foreground">
                or click to browse from your device
              </p>
            </div>
            <div className="flex items-center gap-4 mt-4">
              <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-secondary">
                <Camera className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Images</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-secondary">
                <Video className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Videos</span>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="relative rounded-2xl overflow-hidden border border-border">
          <img
            src={preview}
            alt="Selected road image"
            className="w-full h-64 object-cover"
          />
          <button
            onClick={clearSelection}
            className="absolute top-3 right-3 p-2 rounded-full bg-card/80 backdrop-blur-sm hover:bg-card transition-colors"
          >
            <X className="w-5 h-5 text-foreground" />
          </button>
          <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-card to-transparent">
            <div className="flex items-center gap-2">
              <ImageIcon className="w-4 h-4 text-primary" />
              <span className="text-sm text-foreground font-medium truncate">
                {selectedFile?.name}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

import { useState } from 'react';
import ProductImagePlaceholder from '../ProductImagePlaceholder';

interface ImageWithFallbackProps {
  src: string;
  alt: string;
  className?: string;
  fallbackType?: 'product' | 'user' | 'general';
  placeholderSize?: 'sm' | 'md' | 'lg' | 'xl';
  showPlaceholderLabel?: boolean;
  onError?: () => void;
  onLoad?: () => void;
}

export function ImageWithFallback({
  src,
  alt,
  className = '',
  fallbackType = 'general',
  placeholderSize = 'md',
  showPlaceholderLabel = false,
  onError,
  onLoad
}: ImageWithFallbackProps) {
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const handleError = () => {
    setHasError(true);
    setIsLoading(false);
    onError?.();
  };

  const handleLoad = () => {
    setIsLoading(false);
    onLoad?.();
  };

  // If there's an error or no src, show fallback
  if (hasError || !src) {
    if (fallbackType === 'product') {
      return (
        <ProductImagePlaceholder 
          className={className}
          size={placeholderSize}
          showLabel={showPlaceholderLabel}
          label={alt || 'Product'}
        />
      );
    }
    
    // General fallback for non-product images
    return (
      <div className={`
        bg-gradient-to-br from-gray-100 to-gray-200 
        dark:from-gray-800 dark:to-gray-900
        border border-gray-300 dark:border-gray-600
        rounded-lg flex items-center justify-center
        ${className}
      `}>
        <div className="text-gray-400 dark:text-gray-500 text-center">
          <div className="w-8 h-8 mx-auto mb-1">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM5 19l3.5-4.5 2.5 3.01L14.5 12l4.5 6H5z"/>
            </svg>
          </div>
          {showPlaceholderLabel && (
            <span className="text-xs">{alt || 'Image'}</span>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className={`relative ${className}`}>
      {isLoading && (
        <div className={`
          absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-200 
          dark:from-gray-800 dark:to-gray-900
          border border-gray-300 dark:border-gray-600
          rounded-lg flex items-center justify-center
          animate-pulse
        `}>
          <div className="w-6 h-6 text-gray-400 dark:text-gray-500">
            <svg className="animate-spin" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12,1A11,11,0,1,0,23,12,11,11,0,0,0,12,1Zm0,19a8,8,0,1,1,8-8A8,8,0,0,1,12,20Z" opacity=".25"/>
              <path d="M12,4a8,8,0,0,1,7.89,6.7A1.53,1.53,0,0,0,21.38,12h0a1.5,1.5,0,0,0,1.48-1.75,11,11,0,0,0-21.72,0A1.5,1.5,0,0,0,2.62,12h0a1.53,1.53,0,0,0,1.49-1.3A8,8,0,0,1,12,4Z"/>
            </svg>
          </div>
        </div>
      )}
      
      <img
        src={src}
        alt={alt}
        className={`
          w-full h-full object-cover rounded-lg
          ${isLoading ? 'opacity-0' : 'opacity-100'}
          transition-opacity duration-300
        `}
        onError={handleError}
        onLoad={handleLoad}
        loading="lazy"
      />
    </div>
  );
}
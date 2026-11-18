import { useState } from 'react';
import { imageSrcSet, imageUrl } from '../utils/images';

/**
 * Responsive image with:
 * - srcSet / sizes for crisp, light images on every screen
 * - a soft fade-in once loaded (no layout shift: the parent sets the aspect ratio)
 * - a branded gradient fallback if the CDN is unreachable
 */
export default function SmartImage({
  image,
  sizes = '100vw',
  width = 1200,
  maxWidth = 2200,
  priority = false,
  className = '',
}) {
  const [status, setStatus] = useState('loading');

  if (status === 'error') {
    return (
      <div className={`smart-image smart-image--fallback ${className}`} role="img" aria-label={image.alt}>
        <span aria-hidden="true">Luxury Glamping</span>
      </div>
    );
  }

  return (
    <img
      className={`smart-image ${status === 'loaded' ? 'is-loaded' : ''} ${className}`}
      src={imageUrl(image, width)}
      srcSet={imageSrcSet(image, maxWidth)}
      sizes={sizes}
      alt={image.alt}
      loading={priority ? 'eager' : 'lazy'}
      decoding="async"
      fetchPriority={priority ? 'high' : 'auto'}
      onLoad={() => setStatus('loaded')}
      onError={() => setStatus('error')}
    />
  );
}

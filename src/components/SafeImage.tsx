import { useState } from 'react';
import { Code2 } from 'lucide-react';

interface SafeImageProps {
  src: string;
  alt: string;
  className?: string;
  fallbackTitle?: string;
}

export function SafeImage({
  src,
  alt,
  className = '',
  fallbackTitle = 'Studio Engineering Preview',
}: SafeImageProps) {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <div
        role="img"
        aria-label={alt}
        className={`flex flex-col items-center justify-center bg-slate-100 border border-slate-200 text-slate-600 p-6 text-center ${className}`}
      >
        <div className="w-10 h-10 rounded-lg bg-white border border-slate-200 flex items-center justify-center mb-3 text-slate-700">
          <Code2 className="w-5 h-5" aria-hidden="true" />
        </div>
        <p className="text-sm font-medium text-slate-800">{fallbackTitle}</p>
        <p className="text-xs text-slate-500 mt-1 max-w-xs">{alt}</p>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      referrerPolicy="no-referrer"
      onError={() => setHasError(true)}
      className={className}
    />
  );
}

import { cn, getInitials } from '@/lib/utils';

interface AvatarProps {
  src?: string;
  fallback: string;
  className?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
}

const sizeClasses = {
  xs: 'h-6 w-6 text-xs',
  sm: 'h-8 w-8 text-xs',
  md: 'h-10 w-10 text-sm',
  lg: 'h-12 w-12 text-base',
  xl: 'h-16 w-16 text-lg',
};

export function Avatar({ src, fallback, className, size = 'md' }: AvatarProps) {
  return (
    <div
      className={cn(
        'avatar shrink-0',
        sizeClasses[size],
        className,
      )}
    >
      {src ? (
        <img
          src={src}
          alt={fallback}
          className="h-full w-full object-cover"
          onError={(e) => {
            // Fallback to initials on image error
            (e.currentTarget as HTMLImageElement).style.display = 'none';
          }}
        />
      ) : (
        <div className="h-full w-full flex items-center justify-center bg-gradient-to-br from-brand-400 to-brand-600 text-white font-semibold">
          {getInitials(fallback)}
        </div>
      )}
    </div>
  );
}

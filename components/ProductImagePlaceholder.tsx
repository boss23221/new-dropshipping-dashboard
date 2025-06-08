import { Package } from 'lucide-react';

interface ProductImagePlaceholderProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showLabel?: boolean;
  label?: string;
}

export default function ProductImagePlaceholder({ 
  className = '', 
  size = 'md',
  showLabel = false,
  label = 'Product Image'
}: ProductImagePlaceholderProps) {
  
  const sizeConfig = {
    sm: {
      container: 'w-16 h-16',
      icon: 'h-6 w-6',
      text: 'text-xs'
    },
    md: {
      container: 'w-24 h-24',
      icon: 'h-8 w-8',
      text: 'text-sm'
    },
    lg: {
      container: 'w-32 h-32',
      icon: 'h-12 w-12',
      text: 'text-base'
    },
    xl: {
      container: 'w-48 h-48',
      icon: 'h-16 w-16',
      text: 'text-lg'
    }
  };

  const config = sizeConfig[size];

  return (
    <div className={`
      ${config.container} 
      bg-gradient-to-br from-gray-100 to-gray-200 
      dark:from-gray-800 dark:to-gray-900
      border-2 border-dashed border-gray-300 dark:border-gray-600
      rounded-lg flex flex-col items-center justify-center
      transition-all duration-200 hover:border-gray-400 dark:hover:border-gray-500
      group relative overflow-hidden
      ${className}
    `}>
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-400 to-transparent transform -skew-x-12 translate-x-full group-hover:translate-x-0 transition-transform duration-1000"></div>
      </div>
      
      {/* Icon */}
      <div className={`
        ${config.icon} 
        text-gray-400 dark:text-gray-500 
        mb-1 transition-colors duration-200 
        group-hover:text-gray-500 dark:group-hover:text-gray-400
        relative z-10
      `}>
        <Package className="w-full h-full" />
      </div>
      
      {/* Label */}
      {showLabel && (
        <span className={`
          ${config.text} 
          text-gray-500 dark:text-gray-400 
          font-medium text-center leading-tight
          transition-colors duration-200
          group-hover:text-gray-600 dark:group-hover:text-gray-300
          relative z-10
        `}>
          {label}
        </span>
      )}
      
      {/* Subtle shine effect */}
      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
    </div>
  );
}
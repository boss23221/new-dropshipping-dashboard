import { useState } from 'react';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { 
  Heart, 
  Star, 
  ShoppingCart, 
  Eye,
  Truck
} from 'lucide-react';
import { Language } from './i18n/translations';

interface Product {
  id: string;
  title: string;
  titleAr: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviews: number;
  image: string;
  badge?: string;
  badgeAr?: string;
  badgeColor?: string;
  shipping: string;
  shippingAr: string;
  seller: string;
  country: string;
  countryFlag: string;
}

interface ProductCardProps {
  product: Product;
  language: Language;
  isLiked: boolean;
  onToggleLike: (productId: string) => void;
  onQuickView?: (product: Product) => void;
  onAddToCart?: (product: Product) => void;
}

export default function ProductCard({ 
  product, 
  language, 
  isLiked, 
  onToggleLike,
  onQuickView,
  onAddToCart 
}: ProductCardProps) {
  const [imageLoaded, setImageLoaded] = useState(false);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price);
  };

  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center space-x-1">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`h-3 w-3 ${
              i < Math.floor(rating)
                ? 'text-yellow-400 fill-current'
                : 'text-gray-300'
            }`}
          />
        ))}
        <span className="text-xs text-muted-foreground ml-1">({rating})</span>
      </div>
    );
  };

  const handleToggleLike = () => {
    onToggleLike(product.id);
    // Add heart beat animation
    const heartEl = document.querySelector(`[data-heart="${product.id}"]`);
    if (heartEl) {
      heartEl.classList.add('heart-beat');
      setTimeout(() => heartEl.classList.remove('heart-beat'), 300);
    }
  };

  const discount = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <Card className="group hover:shadow-lg transition-all duration-200 border overflow-hidden product-card">
      <CardContent className="p-0">
        {/* Product Image */}
        <div className="relative aspect-square overflow-hidden bg-gray-100 dark:bg-gray-800">
          <ImageWithFallback
            src={product.image}
            alt={language === 'ar' ? product.titleAr : product.title}
            className={`w-full h-full object-cover group-hover:scale-105 transition-transform duration-200 ${
              imageLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            onLoad={() => setImageLoaded(true)}
          />
          
          {/* Loading skeleton */}
          {!imageLoaded && (
            <div className="absolute inset-0 bg-gray-200 dark:bg-gray-700 animate-pulse" />
          )}
          
          {/* Badge */}
          {product.badge && (
            <Badge className={`absolute top-2 left-2 text-white text-xs ${product.badgeColor} shadow-sm`}>
              {language === 'ar' ? product.badgeAr : product.badge}
            </Badge>
          )}

          {/* Discount Badge */}
          {discount > 0 && (
            <Badge className="absolute top-2 right-12 bg-red-500 text-white text-xs">
              -{discount}%
            </Badge>
          )}

          {/* Heart Icon */}
          <button
            onClick={handleToggleLike}
            data-heart={product.id}
            className="absolute top-2 right-2 p-1.5 bg-white/90 dark:bg-black/90 rounded-full hover:bg-white dark:hover:bg-black transition-colors shadow-sm"
          >
            <Heart 
              className={`h-4 w-4 transition-colors ${
                isLiked 
                  ? 'text-red-500 fill-current' 
                  : 'text-gray-500 hover:text-red-500'
              }`} 
            />
          </button>

          {/* Quick View Overlay */}
          <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
            <Button 
              size="sm" 
              variant="secondary"
              onClick={() => onQuickView?.(product)}
              className="shadow-lg"
            >
              <Eye className="h-4 w-4 mr-2" />
              {language === 'ar' ? 'معاينة سريعة' : 'Quick View'}
            </Button>
          </div>
        </div>

        {/* Product Info */}
        <div className="p-3 space-y-2">
          <h4 className="font-medium text-sm leading-tight line-clamp-2 min-h-[2.5rem]">
            {language === 'ar' ? product.titleAr : product.title}
          </h4>

          {/* Rating */}
          <div className="flex items-center justify-between">
            {renderStars(product.rating)}
            <span className="text-xs text-muted-foreground">
              ({product.reviews.toLocaleString()})
            </span>
          </div>

          {/* Price */}
          <div className="flex items-center space-x-2">
            <span className="font-bold text-lg text-red-600">
              {formatPrice(product.price)}
            </span>
            {product.originalPrice && (
              <span className="text-xs text-muted-foreground line-through">
                {formatPrice(product.originalPrice)}
              </span>
            )}
          </div>

          {/* Shipping */}
          <div className="flex items-center space-x-1 text-xs text-green-600">
            <Truck className="h-3 w-3" />
            <span>{language === 'ar' ? product.shippingAr : product.shipping}</span>
          </div>

          {/* Seller Info */}
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span className="truncate flex-1 mr-2">{product.seller}</span>
            <div className="flex items-center space-x-1 flex-shrink-0">
              <span>{product.countryFlag}</span>
              <span className="hidden sm:inline">{product.country}</span>
            </div>
          </div>

          {/* Add to Cart */}
          <Button 
            size="sm" 
            className="w-full mt-2 bg-orange-500 hover:bg-orange-600 text-white transition-colors"
            onClick={() => onAddToCart?.(product)}
          >
            <ShoppingCart className="h-4 w-4 mr-2" />
            {language === 'ar' ? 'أضف للسلة' : 'Add to Cart'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
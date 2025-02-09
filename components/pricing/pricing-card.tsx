'use client';

import React, { useState } from 'react';
import { Check, Info, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { usePricing } from './pricing-context';

interface PricingFeature {
  text: string;
  included: boolean;
}

interface PricingCardProps {
  title: string;
  price: string;
  period?: string;
  features: PricingFeature[];
  isPopular?: boolean;
  additionalInfo?: string;
  ctaText?: string;
  idealFor?: string;
  ctaVariant?: 'default' | 'outline' | 'primary';
  className?: string;
  hasEnablePos?: boolean;
  description?: string;
}

interface VolumeRange {
  range: string;
  price: number;
}

const professionalRanges: VolumeRange[] = [
  { range: "100-1000", price: 24.99 },
  { range: "1001-2000", price: 69.99 },
  { range: "2001-3000", price: 114.99 },
  { range: "3001-4000", price: 159.99 },
  { range: "4001-5000", price: 204.99 },
  { range: "5001-6000", price: 249.99 },
  { range: "6001-7000", price: 294.99 },
  { range: "7001-8000", price: 339.99 },
  { range: "8001-9000", price: 384.99 },
  { range: "9001-10000", price: 429.99 },
];

const advancedRanges: VolumeRange[] = [
  { range: "2000-3000", price: 99.00 },
  { range: "3001-4000", price: 129.00 },
  { range: "4001-5000", price: 159.00 },
  { range: "5001-6000", price: 189.00 },
  { range: "6001-7000", price: 219.00 },
  { range: "7001-8000", price: 249.00 },
  { range: "8001-9000", price: 279.00 },
  { range: "9001-10000", price: 309.00 },
];

export const PricingCard = ({
  title,
  price,
  period = "/month",
  features,
  isPopular,
  additionalInfo,
  ctaText = "Get started",
  idealFor,
  ctaVariant = "outline",
  className,
  hasEnablePos,
  description,
}: PricingCardProps) => {
  const [enablePos, setEnablePos] = useState(false);
  const { orderVolume } = usePricing();
  const basePrice = parseFloat(price.replace('$', ''));
  
  const getDisplayPrice = () => {
    if (price === 'Free' || price === 'Custom') return price;

    // Calculate additional cost based on order volume
    const baseOrderLimit = title === "Advanced" ? 2000 : 1000;
    if (orderVolume <= baseOrderLimit) {
      return enablePos ? basePrice + 15 : basePrice;
    }

    // Calculate additional cost for orders over limit
    const additionalHundreds = Math.ceil((orderVolume - baseOrderLimit) / 100);
    const pricePerHundred = title === "Advanced" ? 10 : 15;
    const additionalCost = additionalHundreds * pricePerHundred;
    const totalPrice = basePrice + additionalCost;
    
    return enablePos ? totalPrice + 15 : totalPrice;
  };

  const displayPrice = getDisplayPrice();

  const formatPrice = (value: number | string) => {
    if (value === 'Free') return 'Free';
    if (value === 'Custom') return 'Custom';
    return `$${typeof value === 'number' ? value.toFixed(2) : value}`;
  };

  const getAdditionalOrdersPrice = () => {
    switch (title) {
      case "Professional":
        return "+$15";
      case "Advanced":
      case "Starter":
        return "+$10";
      case "Enterprise":
        return "+$5";
      default:
        return null;
    }
  };

  const formatVolumeRange = (range: string) => {
    return `${range} orders`;
  };

  return (
    <div className={cn(
      "relative rounded-xl p-8 bg-background dark:bg-background-dark border transition-all duration-300",
      isPopular && "border-primary",
      !isPopular && "border-border dark:border-border-dark",
      className
    )}>
      <div className="space-y-6">
        {/* Header with POS Toggle */}
        <div>
          <div className="flex items-center gap-3 mb-2">
            <h3 className="text-lg font-semibold tracking-tight text-foreground dark:text-foreground-dark">
              {title}
            </h3>
            {hasEnablePos && (
              <div className="flex items-center gap-2">
                <Switch
                  checked={enablePos}
                  onCheckedChange={setEnablePos}
                />
                <span className="text-sm text-muted dark:text-muted-dark">
                  Enable POS
                </span>
              </div>
            )}
          </div>
          {description && (
            <p className="text-sm text-foreground dark:text-foreground-dark text-left">
              {description}
            </p>
          )}
        </div>
        
        {/* Pricing */}
        <div className="text-center space-y-2">
          <div className="flex items-baseline gap-2 justify-center">
            <span className="text-white text-5xl font-bold">
              {formatPrice(getDisplayPrice())}
            </span>
            {period && price !== "Custom" && (
              <span className="text-[#667085]">{period}</span>
            )}
          </div>
          {additionalInfo && !hasEnablePos && (
            <p className="text-sm text-[#667085]">{additionalInfo}</p>
          )}
        </div>

        {/* Features */}
        <ul className="space-y-4 mb-6">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start gap-3">
              <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
              <span className="text-muted dark:text-muted-dark text-sm">
                {feature.text}
              </span>
            </li>
          ))}
        </ul>

        {/* Additional Orders Info */}
        {getAdditionalOrdersPrice() && (
          <div className="flex items-start gap-2 text-sm text-white">
            <Info className="h-4 w-4 flex-shrink-0 mt-0.5" />
            <p>{getAdditionalOrdersPrice()} per additional 100 orders.</p>
          </div>
        )}

        {/* Ideal For - Keep Centered */}
        {idealFor && (
          <p className="text-sm text-[#667085] pt-4 text-center">
            {idealFor}
          </p>
        )}

        {/* CTA - Keep Centered */}
        <Button 
          className={cn(
            "w-full h-12 rounded-full font-medium",
            isPopular 
              ? "bg-[#00A6ED] hover:bg-[#00A6ED]/90 text-white border-0"
              : "bg-white hover:bg-white/90 text-[#0B1121] border-0"
          )}
          variant="outline"
          size="lg"
        >
          {ctaText}
        </Button>
      </div>
    </div>
  );
}; 
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
  { range: "100-400", price: 24.99 },
  { range: "401-700", price: 24.99 },
  { range: "701-1000", price: 24.99 },
  { range: "1001-1300", price: 69.99 },
  { range: "1301-1600", price: 114.99 },
  { range: "1601-1900", price: 159.99 },
  { range: "1901-2200", price: 204.99 },
  { range: "2201-2500", price: 249.99 },
];

const advancedRanges: VolumeRange[] = [
  { range: "1000-1300", price: 99.00 },
  { range: "1301-1600", price: 129.00 },
  { range: "1601-1900", price: 159.00 },
  { range: "1901-2200", price: 189.00 },
  { range: "2201-2500", price: 219.00 },
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
  const [selectedVolume, setSelectedVolume] = useState(
    title === "Advanced" ? advancedRanges[0].range : professionalRanges[0].range
  );
  const basePrice = parseFloat(price.replace('$', ''));
  
  const getDisplayPrice = () => {
    if (title === "Professional" || title === "Advanced") {
      const [start] = selectedVolume.split('-').map(Number);
      const ranges = title === "Advanced" ? advancedRanges : professionalRanges;
      
      // If under base orders limit, return base price
      const baseOrderLimit = title === "Advanced" ? 2000 : 1000;
      if (start <= baseOrderLimit) {
        return enablePos ? basePrice + 15 : basePrice;
      }

      // Calculate additional cost for orders over limit
      const additionalHundreds = Math.ceil((start - baseOrderLimit) / 100);
      const pricePerHundred = title === "Advanced" ? 10 : 15;
      const additionalCost = additionalHundreds * pricePerHundred;
      const totalPrice = basePrice + additionalCost;
      
      return enablePos ? totalPrice + 15 : totalPrice;
    }
    return basePrice;
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
      "relative rounded-xl p-8 bg-[#0B1121] border transition-all duration-300",
      isPopular && "border-[#00A6ED]",
      !isPopular && "border-[#1D2939]",
      className
    )}>
      <div className="space-y-6">
        {/* Header with POS Toggle and Description */}
        <div className="text-center">
          <div className="flex items-center gap-3">
            <h3 className="text-lg font-semibold tracking-tight text-white">
              {title}
            </h3>
            {hasEnablePos && (
              <div className="flex items-center gap-2">
                <Switch
                  checked={enablePos}
                  onCheckedChange={setEnablePos}
                />
                <span className="text-sm text-white">Enable POS</span>
              </div>
            )}
          </div>
          {description && (
            <p className="text-sm text-white text-left mt-2 mb-6">
              {description}
            </p>
          )}
          
          {/* Pricing */}
          <div className="space-y-2">
            <div className="flex items-baseline gap-2 justify-center">
              <span className="text-white text-5xl font-bold">
                {price === 'Free' || price === 'Custom' 
                  ? price 
                  : formatPrice(displayPrice)}
              </span>
              {period && price !== "Custom" && (
                <span className="text-[#667085]">{period}</span>
              )}
            </div>
            {additionalInfo && !hasEnablePos && (
              <p className="text-sm text-white">{additionalInfo}</p>
            )}
          </div>
        </div>

        {/* Volume Calculator */}
        {(title === "Professional" || title === "Advanced") && (
          <div className="w-full">
            <Select
              value={selectedVolume}
              onValueChange={setSelectedVolume}
            >
              <SelectTrigger className="w-full bg-[#1D2939] border-[#1D2939] text-white h-11">
                <SelectValue placeholder="Select volume range" />
              </SelectTrigger>
              <SelectContent className="bg-[#1D2939] border-[#1D2939]">
                {(title === "Advanced" ? advancedRanges : professionalRanges).map(({ range }) => (
                  <SelectItem 
                    key={range} 
                    value={range}
                    className="text-white hover:text-white hover:bg-[#00A6ED]/10"
                  >
                    {formatVolumeRange(range)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}

        {/* Features - Now Left Aligned */}
        <ul className="space-y-4 mb-6">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start gap-3">
              <Check className="h-5 w-5 text-[#00A6ED] flex-shrink-0 mt-0.5" />
              <span className="text-white text-sm text-left">{feature.text}</span>
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

        {/* Divider */}
        <div className="border-t border-[#1D2939]" />

        {/* Ideal For - Keep Centered */}
        {idealFor && (
          <p className="text-sm text-white pt-4 text-center">
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
'use client';

import React from 'react';
import {Check, Info} from "lucide-react";
import {cn} from "@/lib/utils";
import {Button} from "@/components/ui/button";
import {Switch} from "@/components/ui/switch";
import {usePricing} from './pricing-context';
import {Badge} from "@/components/ui/badge";

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
  badge?: string;
}

interface VolumeRange {
  range: string;
  price: number;
}

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
  badge,
}: PricingCardProps) => {
  const { orderVolume, isPosEnabled, setIsPosEnabled, calculatePrice } = usePricing();

  const getDisplayPrice = () => {
    if (price === 'Free' || price === 'Custom') return price;

    // Use the calculatePrice function from context
    switch (title) {
      case "Starter":
        return calculatePrice('starter');
      case "Professional":
        return calculatePrice('professional');
      case "Advanced":
        return calculatePrice('advanced');
      case "Enterprise":
        return calculatePrice('enterprise');
      default:
        return 0;
    }
  };

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
        return "+$10";
      case "Enterprise":
        return "+$5";
      default:
        return null;
    }
  };

  // Function to get the correct feature text based on POS state
  const getFeatureText = (text: string) => {
    if (title === "Professional" && text.includes("monthly free orders")) {
      return `Up to ${isPosEnabled ? "1000" : "500"} monthly free orders`;
    }
    return text;
  };

  return (
    <div className={cn(
      "relative rounded-xl p-6 bg-background dark:bg-background-dark border transition-all duration-300",
      isPopular && "border-primary dark:border-primary-dark",
      !isPopular && "border-border dark:border-border-dark",
      className
    )}>
      <div className="space-y-6">
        {/* Header with POS Toggle */}
        <div>
          <div className="flex items-center gap-3 mb-2">
            <h3 className="text-lg font-semibold tracking-tight text-black dark:text-white">
              {title}
            </h3>
            {hasEnablePos && (
              <div className="flex items-center gap-2">
                <Switch
                  checked={isPosEnabled}
                  onCheckedChange={setIsPosEnabled}
                />
                <span className="text-sm text-gray-600 dark:text-white/70">
                  Enable POS
                </span>
              </div>
            )}
          </div>
          {description && (
            <p className="text-sm text-gray-600 dark:text-white/70 text-left">
              {description}
            </p>
          )}
        </div>

        {/* Pricing */}
        <div className="text-center space-y-2">
          <div className="flex items-baseline gap-2 justify-center">
            <span className="text-black dark:text-white text-5xl font-bold">
              {formatPrice(getDisplayPrice())}
            </span>
            {period && price !== "Custom" && (
              <span className="text-gray-600 dark:text-white/70 text-left">{period}</span>
            )}
          </div>
          {additionalInfo && !hasEnablePos && (
            <p className="text-sm text-gray-600 dark:text-white/70 text-left">{additionalInfo}</p>
          )}
        </div>

         {/* Additional Orders Info */}
         {getAdditionalOrdersPrice() && (
          <div className="flex items-start gap-2 text-sm text-gray-600 dark:text-white/70 text-left">
            <Info className="h-4 w-4 flex-shrink-0 mt-0.5" />
            <p>{getAdditionalOrdersPrice()} per additional 100 orders.</p>
          </div>
        )}

        {/* Features */}
        <ul className="space-y-1 mb-4">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start gap-3">
              <Check className="h-5 w-5 text-primary dark:text-primary-dark flex-shrink-0 mt-0.5" />
              <span className="text-gray-600 dark:text-white/70 text-sm text-left">
                {getFeatureText(feature.text)}
              </span>
            </li>
          ))}
        </ul>



        {/* Ideal For */}
        {idealFor && (
          <p className="text-left text-sm text-gray-600 dark:text-white/70 pt-4">
            {idealFor}
          </p>
        )}

        {/* CTA Button */}
        <Button
          className={cn(
            "w-full h-12 rounded-full font-medium",
            isPopular
              ? "bg-primary dark:bg-primary-dark hover:bg-primary/90 dark:hover:bg-primary-dark/90 dark:text-white"
              : "bg-white dark:bg-white hover:bg-white/90 dark:hover:bg-white/90 text-black border-0"
          )}
          variant="outline"
          size="lg"
        >
          {ctaText}
        </Button>

        {/* Badge */}
        {badge && (
          <Badge className="bg-primary/10 dark:bg-primary-dark/10 text-primary dark:text-primary-dark">
            {badge}
          </Badge>
        )}
      </div>
    </div>
  );
};

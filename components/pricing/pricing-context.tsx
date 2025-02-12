'use client';

import React, {createContext, useContext, useState} from 'react';
import {Slider} from "@/components/ui/slider";
import {Input} from "@/components/ui/input";
import {Switch} from "@/components/ui/switch";

interface PricingContextType {
  orderVolume: number;
  setOrderVolume: (volume: number) => void;
  isPosEnabled: boolean;
  setIsPosEnabled: (enabled: boolean) => void;
  calculatePrice: (plan: 'starter' | 'professional' | 'advanced' | 'enterprise') => number;
}

const PricingContext = createContext<PricingContextType | undefined>(undefined);

// Create a separate Calculator component
const PriceCalculator = () => {
  const { orderVolume, setOrderVolume, isPosEnabled, setIsPosEnabled } = usePricing();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value) || 0;
    if (value >= 0 && value <= 20000) {
      setOrderVolume(value);
    }
  };

  return (
    <div className="max-w-xl mx-auto space-y-4">
      <div className="text-center space-y-2">
        <h3 className="text-xl font-semibold text-gray-900">
          Calculate Your Price
        </h3>
        <p className="text-sm text-gray-500">
          Adjust the slider or enter a value to see pricing based on your monthly order volume
        </p>
      </div>

      <div className="space-y-4">
      <label className="text-sm font-medium dark:text-white">Your monthly order volume</label>
        <div className="flex items-center gap-4">
        
          <div className="flex-1">
            <Slider
              value={[orderVolume]}
              onValueChange={([value]) => setOrderVolume(value)}
              max={20000}
              step={100}
              className="w-full"
            />
          </div>
          <div className="w-44">
            <div className="relative">
              <Input
                type="number"
                value={orderVolume}
                onChange={handleInputChange}
                min={0}
                max={20000}
                step={100}
                className="pr-16 text-right"
              />
              <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
                <span className="text-sm text-gray-500">
                  orders
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-between text-xs text-gray-500">
          <span>0 orders</span>
          <span>20,000 orders</span>
        </div>

        {/* POS Toggle */}
        <div className="flex items-center justify-between py-2">
          <div className="space-y-0.5">
            <label className="text-sm font-medium dark:text-white">Enable POS Extension (Professional plan only)</label>
            <p className="text-xs text-gray-500">Additional $15/month, includes 1000 free orders for Professional plan</p>
          </div>
          <Switch
            checked={isPosEnabled}
            onCheckedChange={setIsPosEnabled}
          />
        </div>
      </div>
    </div>
  );
};

export function PricingProvider({ children }: { children: React.ReactNode }) {
  const [orderVolume, setOrderVolume] = useState(0);
  const [isPosEnabled, setIsPosEnabled] = useState(false);

  const calculatePrice = (plan: 'starter' | 'professional' | 'advanced' | 'enterprise'): number => {
    switch (plan) {
      case 'starter': {
        // Base price $49, 150 free orders, +$10 per 100 additional orders
        const additionalCost = calculateAdditionalOrders(orderVolume, 150, 10);
        return 49 + additionalCost;
      }
      case 'professional': {
        // Base price $24.99, POS adds $15 (making it $39.99)
        const basePrice = 24.99;
        const basePosPrice = isPosEnabled ? 15 : 0;
        
        // Free orders threshold depends on POS
        const freeOrders = isPosEnabled ? 1000 : 500;
        
        // Calculate additional orders cost ($15 per 100)
        const additionalCost = calculateAdditionalOrders(orderVolume, freeOrders, 15);
        
        return basePrice + basePosPrice + additionalCost;
      }
      case 'advanced': {
        // Base price $99, 2000 free orders, +$10 per 100 additional orders
        const additionalCost = calculateAdditionalOrders(orderVolume, 2000, 10);
        return 99 + additionalCost;
      }
      case 'enterprise': {
        // Base price $499, 7000 free orders, +$5 per 100 additional orders
        const additionalCost = calculateAdditionalOrders(orderVolume, 7000, 5);
        return 499 + additionalCost;
      }
      default:
        return 0;
    }
  };

  return (
    <PricingContext.Provider value={{ orderVolume, setOrderVolume, isPosEnabled, setIsPosEnabled, calculatePrice }}>
      {children}
    </PricingContext.Provider>
  );
}

// Export the calculator component
export { PriceCalculator };

export function usePricing() {
  const context = useContext(PricingContext);
  if (context === undefined) {
    throw new Error('usePricing must be used within a PricingProvider');
  }
  return context;
}

// Helper function to calculate cost for additional orders
const calculateAdditionalOrders = (
  volume: number, 
  freeOrders: number, 
  pricePerHundred: number
): number => {
  if (volume <= freeOrders) return 0;
  
  const additionalOrders = volume - freeOrders;
  const hundreds = Math.ceil(additionalOrders / 100);
  return hundreds * pricePerHundred;
};

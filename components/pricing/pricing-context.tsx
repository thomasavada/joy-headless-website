'use client';

import React, {createContext, useContext, useState} from 'react';
import {Slider} from "@/components/ui/slider";
import {Input} from "@/components/ui/input";

interface PricingContextType {
  orderVolume: number;
  setOrderVolume: (volume: number) => void;
}

const PricingContext = createContext<PricingContextType | undefined>(undefined);

export function PricingProvider({ children }: { children: React.ReactNode }) {
  const [orderVolume, setOrderVolume] = useState(0);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value) || 0;
    if (value >= 0 && value <= 20000) {
      setOrderVolume(value);
    }
  };

  const formatNumber = (num: number) => {
    return num.toLocaleString('en-US', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    });
  };

  return (
    <PricingContext.Provider value={{ orderVolume, setOrderVolume }}>
      <div className="space-y-8">
        {/* Order Volume Calculator */}
        <div className="max-w-xl mx-auto space-y-4">
          <div className="text-center space-y-2">
            <h3 className="text-xl font-semibold text-white">
              Calculate Your Price
            </h3>
            <p className="text-sm text-gray-400">
              Adjust the slider or enter a value to see pricing based on your monthly order volume
            </p>
          </div>

          <div className="space-y-4">
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
                    className="pr-16 bg-transparent text-white border-white/20 text-right"
                  />
                  <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
                    <span className="text-sm text-gray-400">
                      orders
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-between text-xs text-gray-400">
              <span>0 orders</span>
              <span>20,000 orders</span>
            </div>
          </div>
        </div>

        {children}
      </div>
    </PricingContext.Provider>
  );
}

export function usePricing() {
  const context = useContext(PricingContext);
  // if (context === undefined) {
  //   throw new Error('usePricing must be used within a PricingProvider');
  // }
  return context;
}

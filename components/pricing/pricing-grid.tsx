'use client';

import {PricingCard} from './pricing-card';

const pricingData = [
  {
    title: "Starter",
    price: "Free",
    features: [
      { text: "Up to 1,000 orders/month", included: true },
      { text: "Basic loyalty features", included: true },
      { text: "Email support", included: true },
    ],
    description: "Perfect for small businesses just getting started",
  },
  {
    title: "Professional",
    price: "$24.99",
    features: [
      { text: "Up to 2,000 orders/month", included: true },
      { text: "Advanced loyalty features", included: true },
      { text: "Priority support", included: true },
    ],
    isPopular: true,
    description: "For growing businesses with more advanced needs",
    hasEnablePos: true,
  },
  {
    title: "Advanced",
    price: "$99.00",
    features: [
      { text: "Up to 5,000 orders/month", included: true },
      { text: "Enterprise features", included: true },
      { text: "24/7 Priority support", included: true },
    ],
    description: "For larger businesses with high volume",
    hasEnablePos: true,
  },
  {
    title: "Enterprise",
    price: "Custom",
    features: [
      { text: "Unlimited orders", included: true },
      { text: "Custom features", included: true },
      { text: "Dedicated support", included: true },
    ],
    description: "Custom solution for enterprise needs",
    hasEnablePos: true,
  }
];

export function PricingGrid() {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
      {pricingData.map((plan, index) => (
        <PricingCard
          key={index}
          {...plan}
        />
      ))}
    </div>
  );
}

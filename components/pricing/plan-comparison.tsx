'use client';

import React from "react";
import { Check } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface ComparisonSection {
  title: string;
  features: {
    feature: string;
    starter: boolean;
    professional: boolean;
    advanced: boolean;
    value?: string[];
  }[];
}

const comparisonData: ComparisonSection[] = [
  {
    title: "Pricing and Usage",
    features: [
      { 
        feature: "Free orders per month threshold",
        starter: true,
        professional: true,
        advanced: true,
        value: ["150", "Up to 1000", "2000"]
      },
      {
        feature: "Additional order fees (per 100 orders)",
        starter: true,
        professional: true,
        advanced: true,
        value: ["$10", "$15", "$10"]
      },
      {
        feature: "Maximum capacity",
        starter: true,
        professional: true,
        advanced: true,
        value: ["$499/month", "$499/month", "$1000/month"]
      },
      {
        feature: "POS extension",
        starter: true,
        professional: true,
        advanced: true,
        value: ["Additional $15/month", "✓", "✓"]
      },
      {
        feature: "100% refund for 30 days",
        starter: true,
        professional: true,
        advanced: true
      },
    ]
  },
  {
    title: "Core Features",
    features: [
      {
        feature: "Referral Program",
        starter: true,
        professional: true,
        advanced: true
      },
      {
        feature: "Loyalty page",
        starter: true,
        professional: true,
        advanced: true
      },
      {
        feature: "Basic loyalty programs",
        starter: true,
        professional: true,
        advanced: true
      },
      {
        feature: "Advanced redeem programs",
        starter: false,
        professional: true,
        advanced: true
      },
      {
        feature: "Free shipping redeem",
        starter: false,
        professional: true,
        advanced: true
      },
      {
        feature: "Free product redeem",
        starter: false,
        professional: true,
        advanced: true
      },
      {
        feature: "Points expiration",
        starter: false,
        professional: true,
        advanced: true
      },
    ]
  },
  {
    title: "Advanced Features",
    features: [
      {
        feature: "Customizable VIP tier",
        starter: false,
        professional: true,
        advanced: true
      },
      {
        feature: "Advanced widget design",
        starter: false,
        professional: true,
        advanced: true
      },
      {
        feature: "Advanced custom CSS",
        starter: false,
        professional: true,
        advanced: true
      },
      {
        feature: "Shopify Flow",
        starter: false,
        professional: true,
        advanced: true
      },
      {
        feature: "Point calculator",
        starter: false,
        professional: true,
        advanced: true
      },
      {
        feature: "VIP tier",
        starter: false,
        professional: true,
        advanced: true
      },
      {
        feature: "Tier Expiration",
        starter: false,
        professional: true,
        advanced: true
      },
    ]
  },
  {
    title: "Enterprise Features",
    features: [
      {
        feature: "Member privileges",
        starter: false,
        professional: true,
        advanced: true
      },
      {
        feature: "Advanced content edit",
        starter: false,
        professional: true,
        advanced: true
      },
      {
        feature: "Advanced Rule Engine",
        starter: false,
        professional: true,
        advanced: true
      },
      {
        feature: "Fully customizable",
        starter: false,
        professional: false,
        advanced: true
      },
      {
        feature: "Dedicated server (optional)",
        starter: false,
        professional: false,
        advanced: true
      },
      {
        feature: "APIs and Webhooks",
        starter: false,
        professional: false,
        advanced: true
      },
      {
        feature: "Hydrogen Headless support",
        starter: false,
        professional: false,
        advanced: true
      },
    ]
  }
];

export function PlanComparison() {
  const renderValue = (feature: ComparisonSection['features'][0], planIndex: number) => {
    if (feature.value && feature.value[planIndex]) {
      return <span className="text-white">{feature.value[planIndex]}</span>;
    }
    
    const isIncluded = planIndex === 0 ? feature.starter 
      : planIndex === 1 ? feature.professional 
      : feature.advanced;

    return isIncluded ? (
      <Check className="h-5 w-5 mx-auto text-[#00A6ED]" />
    ) : null;
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-white">
          Plan comparison
        </h2>
      </div>

      <Accordion type="single" collapsible className="space-y-4">
        {comparisonData.map((section) => (
          <AccordionItem
            key={section.title}
            value={section.title}
            className="bg-[#0B1121] rounded-lg border border-[#1D2939]"
          >
            <AccordionTrigger className="px-6 py-4 hover:no-underline">
              <span className="text-lg font-semibold text-white">{section.title}</span>
            </AccordionTrigger>
            <AccordionContent className="px-6 pb-4">
              <div className="grid grid-cols-4 gap-6">
                <div className="col-span-1 font-medium text-white">Feature</div>
                <div className="col-span-1 text-center font-medium text-white">Starter</div>
                <div className="col-span-1 text-center font-medium text-white">Professional</div>
                <div className="col-span-1 text-center font-medium text-white">Advanced</div>
                
                {section.features.map((feature, index) => (
                  <React.Fragment key={index}>
                    <div className="col-span-1 text-white">{feature.feature}</div>
                    <div className="col-span-1 text-center text-white">
                      {renderValue(feature, 0)}
                    </div>
                    <div className="col-span-1 text-center text-white">
                      {renderValue(feature, 1)}
                    </div>
                    <div className="col-span-1 text-center text-white">
                      {renderValue(feature, 2)}
                    </div>
                  </React.Fragment>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
} 
'use client';

import React from "react";
import {Check} from "lucide-react";
import {Accordion, AccordionContent, AccordionItem, AccordionTrigger,} from "@/components/ui/accordion";
import { usePricing } from './pricing-context';

interface ComparisonSection {
  title: string;
  features: {
    feature: string;
    subtitle?: string;
    starter: boolean;
    professional: boolean;
    advanced: boolean;
    enterprise: boolean;
    value?: string[];
  }[];
}

// Helper function to sort features by availability
const sortFeaturesByAvailability = (features: ComparisonSection['features']) => {
  return [...features].sort((a, b) => {
    // Count how many plans have this feature
    const countPlans = (feature: typeof a) => 
      Number(feature.starter) + 
      Number(feature.professional) + 
      Number(feature.advanced) + 
      Number(feature.enterprise);
    
    const aCount = countPlans(a);
    const bCount = countPlans(b);
    
    // Sort by number of plans (descending)
    return bCount - aCount;
  });
};

export function PlanComparison() {
  const { isPosEnabled } = usePricing();

  const comparisonData: ComparisonSection[] = [
    {
      title: "Pricing and usage",
      features: sortFeaturesByAvailability([
        {
          feature: "Free order per month",
          subtitle: "Number of orders free orders without usage charge per month",
          starter: true,
          professional: true,
          advanced: true,
          enterprise: true,
          value: ["150", isPosEnabled ? "Up to 1000" : "Up to 500", "2000", "7000"]
        },
        {
          feature: "Free order per month with POS",
          subtitle: "Additional free orders when POS extension is enabled",
          starter: false,
          professional: true,
          advanced: true,
          enterprise: true,
          value: ["-", "1000", "2000", "7000"]
        },
        {
          feature: "Addition order fees (per 100 orders)",
          subtitle: "Fee for orders beyond the free threshold",
          starter: false,
          professional: true,
          advanced: true,
          enterprise: true,
          value: ["-", "$15", "$10", "$5"]
        },
        {
          feature: "Maximum capacity",
          subtitle: "Monthly order volume limit",
          starter: false,
          professional: true,
          advanced: true,
          enterprise: true,
          value: ["-", "$499/month", "$499/month", "$1000/month"]
        },
        {
          feature: "POS extension",
          subtitle: "Shopify Point of Sale Extension integration",
          starter: false,
          professional: true,
          advanced: true,
          enterprise: true,
          value: ["-", "Additional $15/month", "✓", "✓"]
        },
        {
          feature: "100% refund for 30 days",
          subtitle: "Money-back guarantee period",
          starter: false,
          professional: true,
          advanced: true,
          enterprise: true
        },
      ])
    },
    {
      title: "Core features",
      features: sortFeaturesByAvailability([
        {
          feature: "Basic loyalty programs",
          subtitle: "Essential loyalty features like place orders, sign up, social and more.",
          starter: true,
          professional: true,
          advanced: true,
          enterprise: true
        },
        {
          feature: "Loyalty page",
          subtitle: "Dedicated loyalty page well-integrated with Shopify Online Store 2.0.",
          starter: true,
          professional: true,
          advanced: true,
          enterprise: true
        },
        {
          feature: "Referral program",
          subtitle: "Customer referral management",
          starter: true,
          professional: true,
          advanced: true,
          enterprise: true
        }, 
        {
          feature: "Customer Account blocks",
          subtitle: "Customer account page building blocks for online store 2.0",
          starter: false,
          professional: true,
          advanced: true,
          enterprise: true
        },
        {
          feature: "Advanced redeem programs",
          subtitle: "Enhanced redemption options, conditions to target your customers",
          starter: false,
          professional: true,
          advanced: true,
          enterprise: true
        },
        {
          feature: "Free shipping redeem",
          subtitle: "Shipping-based rewards",
          starter: false,
          professional: true,
          advanced: true,
          enterprise: true
        },
        {
          feature: "Free product redeem",
          subtitle: "Product-based rewards",
          starter: false,
          professional: true,
          advanced: true,
          enterprise: true
        },
        {
          feature: "Points expiration",
          subtitle: "Point validity management",
          starter: false,
          professional: true,
          advanced: true,
          enterprise: true
        },
        {
          feature: "Translations",
          subtitle: "Multi-language support for your widget and loyalty page.",
          starter: true,
          professional: true,
          advanced: true,
          enterprise: true
        },
        {
          feature: "Notifications",
          subtitle: "Send notifications to your customers about their loyalty points and rewards.",
          starter: true,
          professional: true,
          advanced: true,
          enterprise: true
        },
      ])
    },
    {
      title: "Advanced features",
      features: sortFeaturesByAvailability([
        {
          feature: "Customizable VIP tier",
          subtitle: "Custom VIP program settings",
          starter: false,
          professional: true,
          advanced: true,
          enterprise: true
        },
        {
          feature: "Advanced widget design",
          subtitle: "Enhanced widget customization",
          starter: false,
          professional: true,
          advanced: true,
          enterprise: true
        },
        {
          feature: "Advanced custom CSS",
          subtitle: "Custom styling options",
          starter: false,
          professional: true,
          advanced: true,
          enterprise: true
        },
        {
          feature: "Shopify Flow",
          subtitle: "Shopify Flow integration",
          starter: false,
          professional: true,
          advanced: true,
          enterprise: true
        },
        {
          feature: "Point calculator",
          subtitle: "Points estimation tool on produc page, cart page and even checkout (Shopify Plus only)",
          starter: false,
          professional: true,
          advanced: true,
          enterprise: true
        },
        {
          feature: "VIP tier",
          subtitle: "VIP membership levels by points or total spent",
          starter: false,
          professional: true,
          advanced: true,
          enterprise: true
        },
        {
          feature: "Tiers reaccessment",
          subtitle: "Tier reaccessment by points or total spent during a certain period",
          starter: false,
          professional: false,
          advanced: true,
          enterprise: true
        },
        {
          feature: "Analytics reports",
          subtitle: "Detailed report to fine-tune your loyalty program",
          starter: false,
          professional: false,
          advanced: true,
          enterprise: true
        },
        {
          feature: "Rule engine",
          subtitle: "Extends how you rewards your customers with one unified approach: bonus points for weekend, Christmas, etc",
          starter: false,
          professional: false,
          advanced: true,
          enterprise: true
        },
        {
          feature: "Member privileges",
          subtitle: "Exclusive benefits for your VIP members that automatically apply to their orders",
          starter: false,
          professional: false,
          advanced: true,
          enterprise: true
        },
        {
          feature: "Checkout UI integration (Shopify Plus only)",
          subtitle: "Redeem points on checkout page",
          starter: false,
          professional: false,
          advanced: true,
          enterprise: true
        },
        {
          feature: "Custom email sender",
          subtitle: "Send emais to your customers using your own sender",
          starter: false,
          professional: true,
          advanced: true,
          enterprise: true
        },
      ])
    },
    {
      title: "Integrations",
      features: sortFeaturesByAvailability([
        {
          feature: "Shopify Meta field integration",
          subtitle: "Advanced member benefits",
          starter: false,
          professional: true,
          advanced: true,
          enterprise: true
        },
        {
          feature: "Shopify Flow integration",
          subtitle: "Advanced member benefits",
          starter: true,
          professional: true,
          advanced: true,
          enterprise: true
        },
        {
          feature: "20+ curated integrations",
          subtitle: "Extend your loyalty program with 20+ integrations: reviews, helpdesk, subscription, email marketing, etc",
          starter: true,
          professional: true,
          advanced: true,
          enterprise: true,
          value: ["All integrations (without reviews programs enabled)", "All integrations and according programs", "Unlimited", "Unlimited"]
        },
      ])
    },
    {
      title: "Enterprise features",
      features: sortFeaturesByAvailability([
        {
          feature: "Member privileges",
          subtitle: "Advanced member benefits",
          starter: false,
          professional: false,
          advanced: true,
          enterprise: true
        },
        {
          feature: "Advanced content edit",
          subtitle: "Enhanced content management",
          starter: false,
          professional: false,
          advanced: true,
          enterprise: true
        },
        {
          feature: "Advanced Rule Engine",
          subtitle: "Complex rule configuration",
          starter: false,
          professional: false,
          advanced: true,
          enterprise: true
        },
        {
          feature: "Fully customizable",
          subtitle: "Complete platform customization",
          starter: false,
          professional: false,
          advanced: false,
          enterprise: true
        },
        {
          feature: "Dedicated server (optional)",
          subtitle: "Private server deployment",
          starter: false,
          professional: false,
          advanced: false,
          enterprise: true
        },
        {
          feature: "APIs and Webhooks",
          subtitle: "API and webhook access for seemless integration.",
          starter: false,
          professional: false,
          advanced: false,
          enterprise: true
        },
        {
          feature: "Hydrogen Headless support",
          subtitle: "Headless commerce support",
          starter: false,
          professional: false,
          advanced: false,
          enterprise: true
        },
      ])
    },
    {
      title: "Support",
      features: sortFeaturesByAvailability([
        {
          feature: "Live chat support",
          subtitle: "Quick support via live chat",
          starter: true,
          professional: true,
          advanced: true,
          enterprise: true
        },
        {
          feature: "Priority support",
          subtitle: "Priority support via direct and dedicated channel",
          starter: false,
          professional: false,
          advanced: false,
          enterprise: true
        },
      ])
    }
  ].map(section => ({
    ...section,
    features: sortFeaturesByAvailability(section.features)
  }));

  const renderValue = (feature: ComparisonSection['features'][0], planIndex: number) => {
    if (feature.feature === "Free order per month" && planIndex === 1) {
      return <span className="text-gray-900">
        {isPosEnabled ? "Up to 1000" : "Up to 500"}
      </span>;
    }

    if (feature.value && feature.value[planIndex]) {
      return <span className="text-gray-900">{feature.value[planIndex]}</span>;
    }

    const isIncluded = planIndex === 0 ? feature.starter
      : planIndex === 1 ? feature.professional
      : planIndex === 2 ? feature.advanced
      : feature.enterprise;

    return isIncluded ? (
      <Check className="h-5 w-5 mx-auto text-[#00A6ED]" />
    ) : null;
  };

  return (
    <div className="w-full max-w-5xl mx-auto">
      <div className="text-center mb-8">
      <span className="text-[#00A6ED] text-sm font-medium">
                Plan features
              </span>
        <h2 className="text-3xl font-bold text-gray-900">
          Compare our plans
        </h2>
      </div>

      <Accordion type="single" collapsible className="space-y-4">
        {comparisonData.map((section) => (
          <AccordionItem
            key={section.title}
            value={section.title}
            className="bg-white rounded-lg border border-gray-200 shadow-sm"
          >
            <AccordionTrigger className="px-6 py-4 hover:no-underline hover:bg-gray-50">
              <span className="text-md font-semibold text-gray-900 dark:text-primary-dark">{section.title}</span>
            </AccordionTrigger>
            <AccordionContent className="px-6 pb-4">
              <div className="grid grid-cols-5 gap-6">
                <div className="col-span-1 font-medium text-gray-700">Feature name</div>
                <div className="col-span-1 text-center font-medium text-gray-700">Starter</div>
                <div className="col-span-1 text-center font-medium text-gray-700">Professional</div>
                <div className="col-span-1 text-center font-medium text-gray-700">Advanced</div>
                <div className="col-span-1 text-center font-medium text-gray-700">Enterprise</div>

                {section.features.map((feature, index) => (
                  <React.Fragment key={index}>
                    <div className="col-span-1">
                      <div className="font-semibold dark:text-primary-dark text-gray-900">{feature.feature}</div>
                      {feature.subtitle && (
                        <div className="text-xs text-gray-500 mt-1">{feature.subtitle}</div>
                      )}
                    </div>
                    <div className="col-span-1 text-center text-gray-900">
                      {renderValue(feature, 0)}
                    </div>
                    <div className="col-span-1 text-center text-gray-900">
                      {renderValue(feature, 1)}
                    </div>
                    <div className="col-span-1 text-center text-gray-900">
                      {renderValue(feature, 2)}
                    </div>
                    <div className="col-span-1 text-center text-gray-900">
                      {renderValue(feature, 3)}
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

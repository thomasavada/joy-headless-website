'use client';

import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";

const faqData = [
  {
    question: "Can I cancel my subscription at anytime?",
    answer: "Yes, you can! At Joy Loyalty, we believe in giving you flexibility and control over your subscription. You can cancel your subscription at any time, and there will be no charge for the first 14 days after your free trial. We want to ensure that you have the freedom to choose what works best for you."
  },
  {
    question: "If I cancel the paid plans, will I lose the features or effects that were available in the previous Pro Plan?",
    answer: [
      "If you decide to cancel your paid plan and switch to a different plan, you won't lose any customer data. Your customer data belongs to you, and it will remain intact. Additionally, you have the option to export all the data and customer activities collected by Joy Loyalty before downgrading, ensuring a seamless experience.",
      "However, it's important to note that some settings and features associated with the paid plans may become unavailable after the downgrade. For example, certain loyalty programs may be inactivated, which means you won't be able to continue offering rewards to your customers as before.",
      "Another thing to keep in mind is that when you downgrade, there may be limitations on the number of orders you can process. Typically, this might mean you can send rewards for up to 250 orders per month. We recommend reviewing the specific details of the plan you're considering to ensure it aligns with your business needs and goals."
    ]
  },
  {
    question: "Is it easy to switch between plans?",
    answer: "Yes, it's easy to switch between plans, and the changes will take effect immediately. This means you can unlock all the advanced features right away when you switch to a different plan that better suits your needs. We aim to make the transition as seamless as possible to ensure you have access to the tools and capabilities that fit your business requirements."
  },
  {
    question: "Can I have a refund?",
    answer: "Absolutely! At Joy Loyalty, we want to make sure you're completely satisfied with our service. That's why we offer a generous 14-day free trial and a 30-day money-back guarantee. If, for any reason, you're not happy with your subscription within the first 30 days, just reach out to us, and we'll be more than happy to process a refund for you. Your satisfaction is our top priority!"
  },
  {
    question: "When will I get charged after the trial ends?",
    answer: "You won't get charged right away after your free trial ends. Our app operates on a 30-day billing cycle, which means you'll be billed after 30 days from the end of your free trial. This gives you some additional time to explore the app and ensure it's the right fit for your needs before any charges are applied."
  },
  {
    question: "Will I be charged after uninstalling the app?",
    answer: [
      "No, you won't be charged with recurring payment after uninstalling the app. When you stop using Joy Loyalty paid plans or uninstall the app (without downgrading), you will automatically opt-out of the Joy Loyalty billing cycle.",
      "However, it's important to note that if you uninstall or downgrade in the middle of a 30-day billing cycle, you may still be charged for the period from the beginning of the cycle up to the day of your opt-out.",
      "For example, if you used Joy Loyalty for 10 days in a month with a paid plan that costs $29 per month and decided to uninstall the app, you might be charged for the portion of the month you used the service. In this case, it would be approximately $9.66."
    ]
  },
  {
    question: "Will I be charged after downgrading from paid plans to the Free plan?",
    answer: [
      "No, you won't be charged with recurring payment after downgrading from paid plan to Free plan. When you stop using Joy Loyalty paid plans, uninstalling the app or downgrading to free plan, you will automatically opt-out of the Joy Loyalty billing cycle.",
      "However, it's important to note that if you uninstall or downgrade in the middle of a 30-day billing cycle, you may still be charged for the period from the beginning of the cycle up to the day of your opt-out.",
      "For example, if you used Joy Loyalty for 10 days in a month with a paid plan that costs $29 per month and decided to downgrade to free plan, you might be charged for the portion of the month you used the service. In this case, it would be approximately $9.66."
    ]
  }
];

export function FAQ() {
  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-semibold text-white mb-2">
          Frequently asked questions
        </h2>
        <div className="flex items-center justify-center gap-2 text-white">
          <span>Don't see your answer?</span>
          <Button variant="link" className="text-[#00A6ED] p-0">
            Reach out to us, we'd love to help!
          </Button>
        </div>
      </div>

      <Accordion type="single" collapsible className="space-y-4">
        {faqData.map((faq, index) => (
          <AccordionItem
            key={index}
            value={`faq-${index}`}
            className="bg-[#0B1121] rounded-lg border border-[#1D2939]"
          >
            <AccordionTrigger className="px-6 py-4 hover:no-underline">
              <span className="text-white font-medium">{faq.question}</span>
            </AccordionTrigger>
            <AccordionContent className="px-6 pb-4">
              {Array.isArray(faq.answer) ? (
                <div className="space-y-4">
                  {faq.answer.map((paragraph, i) => (
                    <p key={i} className="text-white">{paragraph}</p>
                  ))}
                </div>
              ) : (
                <p className="text-white">{faq.answer}</p>
              )}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
} 
"use client";

import Link from "next/link";
import {cn} from "@/lib/utils";

interface CTASectionProps {
  title: string[];
  subtitle?: string;
  buttonText?: string;
  buttonHref?: string;
  className?: string;
  variant?: "default" | "gradient" | "dark";
}

export const CTASection = ({
  title,
  subtitle,
  buttonText = "Book a demo",
  buttonHref = "/book-demo",
  className,
  variant = "default"
}: CTASectionProps) => {
  const variants = {
    default: "",
    gradient: "bg-gradient-to-b from-transparent to-black/20",
    dark: "bg-[#0A0F1C]"
  };

  return (
    <section className={cn("py-20", variants[variant], className)}>
      <div className="container max-w-6xl mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          {title.map((line, index) => (
            <span key={index}>
              {line}
              {index < title.length - 1 && <br />}
            </span>
          ))}
        </h2>
        {subtitle && (
          <p className="text-gray-400 text-lg mb-8 max-w-2xl mx-auto">
            {subtitle}
          </p>
        )}
        <Link
          href={buttonHref}
          className="inline-block px-8 py-3 bg-[#00A3FF] hover:bg-blue-600 text-white rounded-lg font-medium transition-colors mt-8 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          aria-label={buttonText}
          role="button"
          tabIndex={0}
        >
          {buttonText}
        </Link>
      </div>
    </section>
  );
};

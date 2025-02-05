"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useTheme } from "next-themes";
import Image from "next/image";
import Link from "next/link";

const Hero = () => {
  return (
    <section className="relative flex flex-col items-center justify-center px-4 py-20 text-center bg-background">
      {/* Badge */}
      <div className="mb-8">
        <span className="inline-flex items-center px-4 py-2 text-sm text-primary border border-primary/20 rounded-full bg-primary/5">
          Built for Shopify
        </span>
      </div>

      {/* Main heading - reduced size */}
      <h1 className="max-w-3xl mx-auto text-4xl font-bold tracking-tight text-foreground md:text-5xl lg:text-6xl">
        Build a Loyalty Program that actually works
      </h1>

      {/* Subtitle */}
      <p className="max-w-2xl mx-auto mt-6 text-base text-muted-foreground">
        Designed to look great, built to perform with advanced customization and logic
      </p>

      {/* CTA Buttons - side by side */}
      <div className="flex items-center justify-center gap-4 mt-10">
        <Link 
          href="/get-started"
          className="inline-flex items-center justify-center px-8 py-3 text-base font-medium text-white bg-primary rounded-full hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
        >
          Get Started
        </Link>
        <Link 
          href="/book-demo"
          className="inline-flex items-center justify-center px-8 py-3 text-base font-medium bg-white rounded-full border border-transparent hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary dark:text-black"
        >
          Book Demo
        </Link>
      </div>
    </section>
  )
}

export default Hero

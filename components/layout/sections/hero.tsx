"use client";
import Link from "next/link";

const Hero = () => {
  return (
    <section className="relative flex flex-col items-center justify-center px-4 py-20 text-center bg-background">
      {/* Badge */}
      <div className="mb-8">
        <span className="inline-flex items-center px-4 py-2 text-sm text-primary dark:text-primary-dark border border-primary/20 dark:border-primary-dark/20 rounded-full bg-primary/5 dark:bg-primary-dark/5">
          Built for Shopify
        </span>
      </div>

      {/* Main heading */}
      <h1 className="max-w-3xl mx-auto text-4xl font-bold tracking-tight text-foreground dark:text-foreground-dark md:text-5xl lg:text-6xl">
        Build a Loyalty Program that actually works
      </h1>

      {/* Subtitle */}
      <p className="max-w-2xl mx-auto mt-6 text-base text-muted dark:text-muted-dark">
        Designed to look great, built to perform with advanced customization and logic
      </p>

      {/* CTA Buttons */}
      <div className="flex items-center justify-center gap-4 mt-10">
        <Link
                target="_blank"
          href="http://shopify.pxf.io/Vx4jma"
          className="inline-flex items-center justify-center px-8 py-3 text-base font-medium text-white bg-primary dark:bg-primary-dark rounded-full hover:bg-primary/90 dark:hover:bg-primary-dark/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary dark:focus:ring-primary-dark"
        >
          Get Started
        </Link>
        <Link
          target="_blank"
          href="/book-demo"
          className="inline-flex items-center justify-center px-8 py-3 text-base font-medium bg-white rounded-full border border-transparent hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary dark:focus:ring-primary-dark text-foreground dark:text-foreground"
        >
          Book Demo
        </Link>
      </div>
    </section>
  )
}

export default Hero

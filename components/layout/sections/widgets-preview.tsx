"use client";

import Image from "next/image";

export const WidgetsPreview = () => {
  return (
    <section className="w-full bg-background py-12 sm:py-20">
      <div className="container px-4 md:px-6 mx-auto max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-12 md:gap-16 lg:gap-20">
          {/* Left Content - Stacked Images */}
          <div className="flex flex-col gap-6 items-center relative">
            {/* Rule Engine Button */}
            <div className="absolute -top-4 right-0 bg-[#0B0F17] px-4 py-2 rounded-lg border border-border/50 flex items-center gap-2">
              <svg className="w-5 h-5 text-blue-500" viewBox="0 0 24 24" fill="none">
                <path d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span className="text-sm font-medium">Rule engine</span>
            </div>

            {/* Widget Preview Images */}
            <div className="w-full relative">
              <Image
                src="https://cdn-web.joy.so/cdn/image/2024/12/tren.png"
                alt="Loyalty program top interface"
                width={600}
                height={360}
                className="w-full h-auto rounded-xl shadow-lg"
                priority
              />
            </div>
            <div className="w-full relative -mt-2">
              <Image
                src="https://cdn-web.joy.so/cdn/image/2024/12/duoi.png"
                alt="Loyalty program bottom interface"
                width={600}
                height={360}
                className="w-full h-auto rounded-xl shadow-lg"
              />
            </div>
          </div>

          {/* Right Content - Text */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left space-y-6">
            <h2 className="text-4xl md:text-5xl font-bold leading-tight max-w-xl">
              Must-click widgets that turn interest into action
            </h2>
            <p className="text-lg text-muted-foreground max-w-xl">
              Gamify your store to create a memorable customer experience
            </p>
            <a
              href="#"
              className="inline-flex items-center text-primary hover:text-primary/90 font-medium group"
            >
              Learn More
              <svg
                className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

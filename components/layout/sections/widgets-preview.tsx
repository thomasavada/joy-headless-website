"use client";

import Image from "next/image";

export const WidgetsPreview = () => {
  return (
    <section className="w-full bg-background py-20">
      <div className="container px-4 mx-auto">
        <div className="flex md:flex-row items-center gap-8">
          {/* Left Content - Stacked Images */}
          <div className="md:w-1/2 flex flex-col gap-4 items-center">
            <div className="w-full max-w-[400px]">
              <Image
                src="https://cdn-web.joy.so/cdn/image/2024/12/tren.png"
                alt="Loyalty program top interface"
                width={500}
                height={300}
                className="w-full h-auto"
              />
            </div>
            <div className="w-full max-w-[400px]">
              <Image
                src="https://cdn-web.joy.so/cdn/image/2024/12/duoi.png"
                alt="Loyalty program bottom interface"
                width={500}
                height={300}
                className="w-full h-auto"
              />
            </div>
          </div>

          {/* Right Content - Text */}
          <div className="md:w-1/2 space-y-6">
            <h2 className="text-4xl font-bold">
              Must-click widgets that turn interest into action
            </h2>
            <p className="text-lg text-muted-foreground">
              Gamify your store to create a memorable customer experience
            </p>
            <a 
              href="#"
              className="inline-flex items-center text-primary dark:text-primary-dark hover:underline"
            >
              Learn More
              <svg 
                className="ml-2 w-4 h-4"
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

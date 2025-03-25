"use client";

import Image from "next/image";
import Link from "next/link";

export const WidgetsPreview = () => {
  return (
    <section className="w-full bg-background py-12 sm:py-20">
      <div className="container px-4 mx-auto max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-12 md:gap-16 lg:gap-20">
          {/* Left Content - Widget Preview */}
          <div className="flex flex-col gap-4 relative">
            {/* Widget Preview Container */}
            <div className="bg-[#1C1332] rounded-2xl p-4 space-y-4">
              {/* Toggle Blocks */}
              <div className="space-y-3">
                <div className="flex items-center justify-between bg-[#2A1F45] rounded-lg px-4 py-3">
                  <span className="text-white">Milestone rewards block</span>
                  <div className="w-10 h-6 bg-[#2A1F45] rounded-full p-1">
                    <div className="w-4 h-4 bg-green-400 rounded-full"></div>
                  </div>
                </div>
                <div className="flex items-center justify-between bg-[#2A1F45] rounded-lg px-4 py-3">
                  <span className="text-white">Referral block</span>
                  <div className="w-10 h-6 bg-[#2A1F45] rounded-full p-1">
                    <div className="w-4 h-4 bg-green-400 rounded-full"></div>
                  </div>
                </div>
              </div>

              {/* Milestone Progress Card */}
              <div className="bg-[#111111] rounded-xl p-4 space-y-6">
                <div className="space-y-2">
                  <h4 className="text-white">Number orders milestone</h4>
                  <p className="text-gray-400 text-sm">2/4 rewards</p>
                </div>

                {/* Progress Bar */}
                <div className="flex items-center gap-2">
                  <div className="h-4 w-4 rounded-full bg-green-400"></div>
                  <div className="flex-1 h-0.5 bg-green-400"></div>
                  <div className="h-4 w-4 rounded-full bg-green-400"></div>
                  <div className="flex-1 h-0.5 bg-blue-900/50"></div>
                  <div className="h-4 w-4 rounded-full bg-blue-900/50"></div>
                  <div className="flex-1 h-0.5 bg-blue-900/50"></div>
                  <div className="h-4 w-4 rounded-full bg-blue-900/50"></div>
                </div>

                <p className="text-gray-400 text-sm">Receive 500 points completing 1 order</p>

                {/* Referral Section */}
                <div className="flex items-center justify-between pt-2">
                  <span className="text-white">Referral</span>
                  <button className="px-4 py-2 bg-yellow-500 rounded-lg text-black font-medium">
                    Refer
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Right Content - Text */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left space-y-6">
            <h2 className="text-4xl md:text-5xl font-bold leading-tight">
              Irresistible loyalty experiences with progress milestone
            </h2>
            <p className="text-lg text-muted-foreground/60">
              Go far beyond points and discounts by interactive challenges, tier journeys, and personalized missions
            </p>
            <Link
              href="#"
              className="inline-flex items-center hover:underline text-primary dark:text-primary-dark"
            >
              Learn More
              <svg
                className="ml-2 w-4 h-4"
                fill="currentColor"
                viewBox="0 0 256 512"
              >
                <path d="M224.3 273l-136 136c-9.4 9.4-24.6 9.4-33.9 0l-22.6-22.6c-9.4-9.4-9.4-24.6 0-33.9l96.4-96.4-96.4-96.4c-9.4-9.4-9.4-24.6 0-33.9L54.3 103c9.4-9.4 24.6-9.4 33.9 0l136 136c9.5 9.4 9.5 24.6.1 34z" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

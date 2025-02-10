'use client';

import {Button} from "@/components/ui/button";
import {Reveal} from "@/components/ui/reveal";

export function CantDecide() {
  return (
    <section className="w-full py-16 bg-[#0B1121] border border-[#1D2939] rounded-xl">
      <Reveal>
        <div className="flex flex-col items-center text-center">
          <div className="space-y-6 max-w-2xl">
            <div className="space-y-4">

              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold">
                Can't decide which pricing plan is right for you?
              </h2>

              <p className="text-base sm:text-lg text-[#667085]">
                Share your needs with us, and we'll create a customized offer with all the promotional features you need.
              </p>
            </div>

            <Button
              className="bg-[#00A6ED] hover:bg-[#00A6ED]/90 text-white rounded-full h-11 px-6 font-medium"
            >
              Contact us
            </Button>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

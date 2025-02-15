"use client";
import {useEffect, useState} from "react";
import {useInView} from "react-intersection-observer";

export const FeaturesPreview = () => {
  const [count, setCount] = useState(0);
  const { ref, inView } = useInView({
    threshold: 0.5,
    triggerOnce: true
  });

  useEffect(() => {
    if (inView) {
      const number = 100;
      const duration = 2000; // 2 seconds
      const steps = 50;
      const increment = number / steps;
      const stepDuration = duration / steps;

      let current = 0;
      const timer = setInterval(() => {
        current += increment;
        if (current >= number) {
          setCount(number);
          clearInterval(timer);
        } else {
          setCount(current);
        }
      }, stepDuration);

      return () => clearInterval(timer);
    }
  }, [inView]);

  return (
    <section className="w-full bg-background">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex md:flex-row items-start gap-8">
          {/* Left Content */}
          <div className="md:w-1/2">
            <span className="inline-flex items-center px-4 py-2 text-sm text-primary dark:text-primary-dark border border-primary/20 rounded-full bg-primary/5 mb-6">
              About Joy Loyalty
            </span>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Giving merchants all<br />
              the essentials to grow<br />
              customer loyalty
            </h2>

            {/* Stats with Counter */}
            <div ref={ref} className="flex items-center gap-2 text-2xl font-bold">
              <span>+{count.toFixed(1)}M</span>
              <span className="text-sm font-normal text-muted-foreground bg-muted/20 px-2 py-1 rounded">
                Assisted Revenue
              </span>
            </div>
          </div>

          {/* Right Content - Background Image */}
          <div
            className="md:w-1/2 h-[400px] relative"
            style={{
              backgroundImage: 'url(https://cdn-web.joy.so/cdn/image/2024/12/image-1-1.png)',
              backgroundPosition: 'bottom right',
              backgroundRepeat: 'no-repeat',
              backgroundSize: 'contain'
            }}
          />
        </div>
      </div>
    </section>
  );
};

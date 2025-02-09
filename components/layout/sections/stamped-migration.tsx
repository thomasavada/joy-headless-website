"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const LOYALTY_PROGRAMS = [
  "Stamped",
  "Yotpo",
  "Bon Loyalty",
  "Appstle",
  "Loyalty Lion",
  "Smile",
  "Rivo"
];

export const StampedMigration = () => {
  const [currentProgram, setCurrentProgram] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const targetProgram = LOYALTY_PROGRAMS[currentIndex % LOYALTY_PROGRAMS.length];
    const typeSpeed = isDeleting ? 50 : 100;

    const timeout = setTimeout(() => {
      if (!isDeleting && currentProgram === targetProgram) {
        // Wait before starting to delete
        setTimeout(() => setIsDeleting(true), 1500);
        return;
      }

      if (isDeleting) {
        if (currentProgram === "") {
          setIsDeleting(false);
          setCurrentIndex(prev => (prev + 1) % LOYALTY_PROGRAMS.length);
          return;
        }
        setCurrentProgram(prev => prev.slice(0, -1));
      } else {
        setCurrentProgram(targetProgram.slice(0, currentProgram.length + 1));
      }
    }, typeSpeed);

    return () => clearTimeout(timeout);
  }, [currentProgram, currentIndex, isDeleting]);

  return (
    <section className="w-full bg-card py-20">
      <div className="container px-4 mx-auto">
        <div className="max-w-4xl mx-auto flex flex-col items-center text-center space-y-8">
          {/* Badge */}
          <span className="inline-flex items-center px-4 py-2 text-sm text-primary dark:text-primary-dark border border-primary/20 dark:border-primary-dark/20 rounded-full bg-primary/5 dark:bg-primary-dark/5">
            Migrate to Joy Loyalty
          </span>

          {/* Heading with Typing Effect */}
          <h2 className="text-4xl md:text-5xl font-bold">
            We can help you move from<br />
            <span className="inline-block min-h-[1.2em] relative">
              {currentProgram}
              <span className="absolute ml-1 -mt-1 animate-blink">|</span>
            </span>
          </h2>

          {/* CTA Button */}
          <Link
            href="#contact"
            className="inline-flex items-center justify-center px-8 py-3 text-base font-medium text-white bg-primary dark:bg-primary-dark rounded-full hover:bg-primary/90 dark:hover:bg-primary-dark/90 transition-colors"
          >
            Contact us
          </Link>
        </div>
      </div>
    </section>
  );
}; 
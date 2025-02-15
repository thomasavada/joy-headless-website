"use client";

import Image from "next/image";
import {Marquee} from "@devnomic/marquee";
import "@devnomic/marquee/dist/index.css";

interface SponsorProps {
  imageUrl: string;
  name: string;
  width: number;
  height: number;
}

const sponsors: SponsorProps[] = [
  {
    imageUrl: "https://cdn-web.joy.so/cdn/image/2024/12/C_S_logo-_1_-removebg-preview-1.png",
    name: "Cool & Simple",
    width: 215,
    height: 37
  },
  {
    imageUrl: "https://cdn-web.joy.so/cdn/image/2024/12/image-1-2.png",
    name: "Allbirds",
    width: 97,
    height: 37
  },
  {
    imageUrl: "https://cdn-web.joy.so/cdn/image/2024/12/vinamilk-logo_brandlogos.net_quayf-1.png",
    name: "Vinamilk",
    width: 129,
    height: 37
  },
  {
    imageUrl: "https://cdn-web.joy.so/cdn/image/2024/12/image-5.png",
    name: "HyperWork",
    width: 200,
    height: 37
  },
  {
    imageUrl: "https://cdn-web.joy.so/cdn/image/2024/12/image-6.png",
    name: "Glamour US",
    width: 182,
    height: 37
  },
  {
    imageUrl: "https://cdn-web.joy.so/cdn/image/2024/12/image-2-1.png",
    name: "Korean Skincare",
    width: 126,
    height: 37
  }
];

export const SponsorsSection = () => {
  return (
    <section id="sponsors" className="w-full">
      <p className="text-base md:text-lg text-center text-muted-foreground mb-4">
        Used by thousands of merchants around the world
      </p>

      <div className="w-full">
        <Marquee
          className="gap-[2rem]"
          fade
          innerClassName="gap-[2rem]"
          pauseOnHover
        >
          {sponsors.map(({ imageUrl, name, width, height }) => (
            <div
              key={name}
              className="flex items-center justify-center"
            >
              <Image
                src={imageUrl}
                alt={name}
                width={width}
                height={height}
                className="h-8 opacity-50 hover:opacity-100 transition-opacity"
              />
            </div>
          ))}
        </Marquee>
      </div>
    </section>
  );
};

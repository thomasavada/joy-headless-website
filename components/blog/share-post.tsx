"use client";
import Image from "next/image";
import {cn} from "@/lib/utils";
import {frontEndDomain} from "@/lib/frontend";

interface SharePostProps {
  title: string;
  slug: string;
  className?: string;
}

export function SharePost({ title, slug, className }: SharePostProps) {
  const url = `https://${frontEndDomain}/${slug}`;
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  const shareLinks = [
    {
      name: "Twitter",
      href: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
      icon: "https://cdn-web.joy.so/cdn/image/2024/12/twitter.png",
    },
    {
      name: "Facebook",
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      icon: "https://cdn-web.joy.so/cdn/image/2024/12/Facebook_Logo_2019.png",
    },
    {
      name: "LinkedIn",
      href: `https://www.linkedin.com/shareArticle?mini=true&url=${encodedUrl}&title=${encodedTitle}`,
      icon: "https://cdn-web.joy.so/cdn/image/2024/12/LinkedIn_icon.svg-2.png",
    },
  ];

  return (
    <div className={cn("flex items-center gap-6 py-6", className)}>
      <span className="text-sm font-medium text-muted-foreground hidden sm:block">
        Share this post
      </span>
      <div className="flex items-center gap-4">
        {shareLinks.map((link) => (
          <a
            key={link.name}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className="block transition-opacity hover:opacity-80"
            onClick={(e) => {
              e.preventDefault();
              window.open(
                link.href,
                "share",
                "width=550,height=435,scrollbars=no"
              );
            }}
          >
            <Image
              src={link.icon}
              alt={`Share on ${link.name}`}
              width={24}
              height={24}
              className="w-6 h-6"
            />
          </a>
        ))}
      </div>
    </div>
  );
}

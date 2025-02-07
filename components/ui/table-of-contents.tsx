import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import Image from "next/image";

interface TableOfContentsProps {
  content: string;
}

interface HeadingItem {
  id: string;
  text: string;
  level: number;
}

export function TableOfContents({ content }: TableOfContentsProps) {
  const [headings, setHeadings] = useState<HeadingItem[]>([]);
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    const doc = new DOMParser().parseFromString(content, 'text/html');
    const headingElements = doc.querySelectorAll('h2, h3');
    
    const items: HeadingItem[] = Array.from(headingElements).map((heading) => ({
      id: heading.id || heading.textContent?.toLowerCase().replace(/\s+/g, '-') || '',
      text: heading.textContent || '',
      level: parseInt(heading.tagName[1]),
    }));

    setHeadings(items);
  }, [content]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: '-20% 0% -35% 0%' }
    );

    headings.forEach((heading) => {
      const element = document.getElementById(heading.id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => observer.disconnect();
  }, [headings]);

  return (
    <div className="space-y-6">
      <div className="bg-card rounded-lg border p-4">
        <p className="font-medium mb-4">Table of Contents</p>
        <ScrollArea className="h-[300px]">
          <nav className="space-y-1 pr-4">
            {headings.map((heading) => (
              <a
                key={heading.id}
                href={`#${heading.id}`}
                className={cn(
                  "block text-sm py-1 text-muted-foreground hover:text-foreground transition-colors",
                  "cursor-pointer hover:bg-accent/50 rounded px-2",
                  heading.level === 3 && "pl-4",
                  activeId === heading.id && "text-primary font-medium bg-accent/30"
                )}
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById(heading.id)?.scrollIntoView({
                    behavior: "smooth",
                  });
                }}
              >
                {heading.text}
              </a>
            ))}
          </nav>
        </ScrollArea>
      </div>

      <div className="rounded-lg overflow-hidden hover:opacity-90 transition-opacity">
        <a 
          href="https://cal.com/sales-avada/joy-demo-call" 
          target="_blank" 
          rel="noopener noreferrer"
          className="block"
        >
          <Image
            src="https://joy.so/wp-content/uploads/2024/12/aadba5ff8bea46ba75fde944ceba2b1f-1024x1024.png"
            alt="Schedule a demo call"
            width={300}
            height={300}
            className="w-full"
            priority={false}
          />
        </a>
      </div>
    </div>
  );
} 
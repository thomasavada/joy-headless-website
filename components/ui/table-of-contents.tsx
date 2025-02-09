import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import Image from "next/image";
import { log } from "console";

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
    const headingElements = Array.from(doc.querySelectorAll('h2')).filter(heading => {
      return !heading.closest('.table-of-contents');
    });
    
    // Ensure IDs are set in the actual DOM
    headingElements.forEach((_, index) => {
      const actualHeading = document.querySelectorAll('h2')[index];
      if (actualHeading && !actualHeading.id) {
        const text = actualHeading.textContent || '';
        actualHeading.id = text.toLowerCase().replace(/[^a-z0-9]+/g, '-');
      }
    });

    const items: HeadingItem[] = headingElements.map((heading, index) => {
      // Use the actual DOM element's ID to ensure consistency
      const actualHeading = document.querySelectorAll('h2')[index];
      const id = actualHeading?.id || heading.textContent?.toLowerCase().replace(/[^a-z0-9]+/g, '-') || '';
      const text = heading.textContent?.replace(/\d+\.\s*/, '') || '';
      
      console.log(`Processing heading ${index}:`, { id, text });
      return { id, text, level: 2 };
    });

    console.log("Final headings:", items);
    setHeadings(items);
  }, [content]);

  useEffect(() => {
    const BANNER_HEIGHT = 80;

    const handleScroll = () => {
      const headingElements = headings.map(({ id }) => {
        const element = document.getElementById(id);
        if (!element) {
          console.warn(`Heading with id "${id}" not found in DOM`);
        }
        return element;
      }).filter((element): element is HTMLElement => element !== null);

      console.log(`Found ${headingElements.length} of ${headings.length} headings in DOM`);

      const headingPositions = headingElements.map(element => ({
        id: element.id,
        top: element.getBoundingClientRect().top - BANNER_HEIGHT,
      }));

      // Find the first heading that's near the top of the viewport
      const currentHeading = headingPositions.find(({ top }) => top > -100 && top < 100) || 
        headingPositions[0];

      if (currentHeading) {
        setActiveId(currentHeading.id);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [headings]);

  return (
    <div className="space-y-6">
      <div className="bg-card rounded-lg border p-4">
        <p className="text-[10px] text-muted/50 dark:text-muted-dark/50 uppercase tracking-wider mb-4">
          Table of Contents
        </p>
        <ScrollArea className="h-[300px]">
          <nav className="space-y-0.5 pr-4">
            {headings.map((heading) => (
              <a
                key={heading.id}
                href={`#${heading.id}`}
                className={cn(
                  "block text-[13px] py-1 text-foreground/80 dark:text-foreground-dark/80 hover:text-foreground transition-colors",
                  "cursor-pointer hover:bg-accent/50 rounded",
                  "pl-0",
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

      {/* Schedule Demo Callout */}
      <div className="bg-card rounded-lg border p-4">
        <a 
          href="https://cal.com/sales-avada/joy-demo-call" 
          target="_blank" 
          rel="noopener noreferrer"
          className="block hover:opacity-90 transition-opacity"
        >
          <div className="flex flex-col gap-2">
            <h3 className="font-medium">Request a demo</h3>
            <p className="text-sm text-muted-foreground">
              Get on a demo with Rivo, and we'll walk you through the app and help you migrate over from another solution.
            </p>
            <div className="flex items-center gap-2 text-primary text-sm font-medium mt-2">
              Request a demo
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M5 12h14" />
                <path d="m12 5 7 7-7 7" />
              </svg>
            </div>
          </div>
        </a>
      </div>
    </div>
  );
} 
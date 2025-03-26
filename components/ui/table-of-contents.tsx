import {useEffect, useState} from "react";

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
    const elements = Array.from(doc.querySelectorAll('h2'));
    const items: HeadingItem[] = elements.map((element) => {
      const text = element.textContent || '';
      const id = text.toLowerCase().replace(/[^a-z0-9]+/g, '-');
      return {
        id,
        text,
        level: 2
      };
    });
    setHeadings(items);
  }, [content]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.id;
            setActiveId(id);
          }
        });
      },
      {
        rootMargin: '-80px 0px -80% 0px',
        threshold: 0.1
      }
    );

    setTimeout(() => {
      const headingElements = document.querySelectorAll('h2[id]');
      headingElements.forEach((element) => observer.observe(element));
    }, 100);

    return () => {
      const headingElements = document.querySelectorAll('h2[id]');
      headingElements.forEach((element) => observer.unobserve(element));
    };
  }, []);

  if (headings.length === 0) return null;

  return (
    <nav className="space-y-4">
      <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
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
          className="text-muted-foreground/70 dark:text-muted-foreground/60"
        >
          <path d="M4 6h16" />
          <path d="M4 12h16" />
          <path d="M4 18h12" />
        </svg>
        Table of Contents
      </div>

      <div className="max-h-[150px] overflow-y-auto pr-4
        [&::-webkit-scrollbar]:w-2
        [&::-webkit-scrollbar-thumb]:rounded-full
        [&::-webkit-scrollbar-track]:transparent
        [&::-webkit-scrollbar-thumb]:bg-gray-300
        dark:[&::-webkit-scrollbar-thumb]:bg-gray-700
        scrollbar-thin
        scrollbar-thumb-gray-300
        dark:scrollbar-thumb-gray-700
        scrollbar-track-transparent">
        <div className="space-y-1">
          {headings.map((heading) => (
            <a
              key={heading.id}
              href={`#${heading.id}`}
              className={`block text-sm py-1 px-4 rounded-md transition-colors
                ${
                  activeId === heading.id
                    ? 'text-primary bg-primary/5 font-medium'
                    : 'text-muted-foreground hover:text-primary hover:bg-primary/5'
                }
              `}
              onClick={() => {
                setActiveId(heading.id);
              }}
            >
              {heading.text}
            </a>
          ))}
        </div>
      </div>

      {/* Schedule Demo - Desktop */}
      <div className="pt-6 mt-6 border-t">
        <a
          href="https://cal.com/sales-avada/joy-demo-call"
          target="_blank"
          rel="noopener noreferrer"
          className="block bg-card rounded-lg border p-4 hover:bg-accent/50 transition-colors"
        >
          <div className="flex flex-col gap-2">
            <h3 className="font-medium">Request a demo</h3>
            <p className="text-sm text-muted-foreground">
              Get on a demo with Joy, and we&apos;ll walk you through the app and help you migrate over from another solution.
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
    </nav>
  );
}

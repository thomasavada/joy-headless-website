"use client";
import {useEffect, useState} from "react";
import {Dialog, DialogContent, DialogTrigger,} from "@/components/ui/dialog";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {Command, Loader2, Search} from "lucide-react";
import Link from "next/link";
import {cn} from "@/lib/utils";

interface SearchResult {
  title: string;
  slug: string;
  excerpt?: string;
}

export function SearchDialog() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const searchPosts = async () => {
      if (!query.trim()) {
        setResults([]);
        setError(null);
        return;
      }

      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
        if (!response.ok) {
          throw new Error('Search failed. Please try again.');
        }
        const data = await response.json();
        setResults(data);
      } catch (error) {
        console.error("Search failed:", error);
        setError(error instanceof Error ? error.message : 'Search failed. Please try again.');
        setResults([]);
      } finally {
        setIsLoading(false);
      }
    };

    const timeoutId = setTimeout(searchPosts, 300);
    return () => clearTimeout(timeoutId);
  }, [query]);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="text-muted-foreground hover:text-foreground"
        >
          <Search className="h-5 w-5" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-3xl h-[80vh] max-h-[680px] p-0 gap-0">
        <div className="container flex flex-col h-full py-6">
          {/* Search Header */}
          <div className="flex items-center px-3 border-b border-border/10 pb-6">
            <div className="flex items-center flex-1 gap-2">
              <Command className="h-6 w-6 text-muted-foreground" />
              <Input
                placeholder="Search posts..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="flex-1 bg-transparent border-none shadow-none focus-visible:ring-0 focus-visible:ring-offset-0"
              />
            </div>
            {isLoading && (
              <div className="flex items-center justify-center">
                <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
              </div>
            )}
          </div>

          {/* Search Results */}
          <div className="flex-1 overflow-y-auto py-6">
            <div className="space-y-1 px-3">
              {error ? (
                <div className="flex flex-col items-center justify-center h-full py-12">
                  <p className="text-sm text-destructive text-center">{error}</p>
                </div>
              ) : results.length > 0 ? (
                results.map((result) => (
                  <Link
                    key={result.slug}
                    href={`/${result.slug}`}
                    onClick={() => setIsOpen(false)}
                    className={cn(
                      "block px-4 py-3 rounded-lg",
                      "hover:bg-muted/50 dark:hover:bg-muted/25",
                      "transition-colors duration-200",
                      "focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                    )}
                  >
                    <h3 className="text-base font-medium text-foreground mb-1">
                      {result.title}
                    </h3>
                    {result.excerpt && (
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {result.excerpt}
                      </p>
                    )}
                  </Link>
                ))
              ) : query.trim() ? (
                <div className="flex flex-col items-center justify-center h-full py-12">
                  <p className="text-sm text-muted-foreground text-center">
                    No results found for &quot;{query}&quot;
                  </p>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-full py-12">
                  <p className="text-sm text-muted-foreground text-center">
                    Start typing to search posts...
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Search Footer */}
          <div className="px-3 pt-6 border-t border-border/10">
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <p>Press ESC to close</p>
              <p>{results.length} results</p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

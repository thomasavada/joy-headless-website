'use client';

import Link from 'next/link';
import { SearchDialog } from '@/components/search-dialog';
import { useState } from 'react';
import { Search } from 'lucide-react';

export default function NotFound() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center px-4">
      <div className="text-center max-w-2xl mx-auto space-y-8">
        <h1 className="text-5xl font-bold mb-6">
          Page not found!
        </h1>

        <p className="text-gray-400 text-lg">
          We can&apos;t seem to find the page you are looking for. It&apos;s either moved or does not exist anymore.
        </p>

        <div
          onClick={() => setIsOpen(true)}
          className="relative max-w-md mx-auto cursor-pointer"
        >
          <div className="relative">
            <input
              type="search"
              placeholder="Looking for similar page?"
              className="h-12 w-full rounded-md border border-input pl-9 pr-4 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-blue-500 focus-visible:border-blue-500 cursor-pointer"
              readOnly
            />
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          </div>
        </div>

        <SearchDialog open={isOpen} onOpenChange={setIsOpen} />

        <Link
          href="/"
          className="inline-block px-8 py-3 rounded-md bg-[#3B82F6] hover:bg-blue-600 transition-colors text-white font-medium text-base"
        >
          Back to Home Page
        </Link>
      </div>
    </div>
  );
}
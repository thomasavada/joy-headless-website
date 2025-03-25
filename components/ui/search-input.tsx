"use client";

import { Search } from "lucide-react";
import { cn } from "@/lib/utils";
// import { useCommandStore } from "@/store/command";

interface SearchInputProps {
  className?: string;
}

export function SearchInput({ className }: SearchInputProps) {
  // const { setOpen } = useCommandStore();

  return (
    <div className={cn("relative", className)}>
      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
      <input
        type="search"
        placeholder="Looking for similar page?"
        // onClick={() => setOpen(true)}
        // onFocus={() => setOpen(true)}
        className="h-12 w-full rounded-md border border-input bg-[#0B0F17] pl-9 pr-4 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-blue-500 focus-visible:border-blue-500 cursor-pointer"
        readOnly
      />
    </div>
  );
}

import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface BreadcrumbItem {
  label: string;
  href: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  className?: string;
}

export function Breadcrumb({ items, className }: BreadcrumbProps) {
  return (
    <nav className={cn("flex items-center space-x-0.5", className)}>
      {items.map((item, index) => (
        <div key={item.href} className="flex items-center">
          {index > 0 && <ChevronRight className="h-2.5 w-2.5 mx-0.5 text-[#6B7280] dark:text-[#9CA3AF]" />}
          <Link
            href={item.href}
            className="hover:text-[#111827] dark:hover:text-white transition-colors text-[10px]"
          >
            {item.label}
          </Link>
        </div>
      ))}
    </nav>
  );
} 
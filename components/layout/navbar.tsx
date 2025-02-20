"use client";
import {ChevronDown, Menu, Search} from "lucide-react";
import React from "react";
import {Sheet, SheetContent, SheetFooter, SheetHeader, SheetTitle, SheetTrigger,} from "../ui/sheet";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "../ui/navigation-menu";
import {Button} from "../ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { SearchDialog } from "../search-dialog";
import Image from "next/image";
import { navigationMenuTriggerStyle } from "../ui/navigation-menu";

interface RouteProps {
  href: string;
  label: string;
  description?: string;
  external?: boolean;
}

interface MegaMenuCategory {
  title: string;
  items: RouteProps[];
}

const mainRoutes: RouteProps[] = [
  {
    href: "/pricing/",
    label: "Pricing",
  },
  {
    href: "/case-study/",
    label: "Case Studies",
  },
];

const features: MegaMenuCategory[] = [
  {
    title: "Core Features",
    items: [
      {
        href: "/milestone",
        label: "Milestone",
        description: "Reward customers for reaching spending milestones",
      },
      {
        href: "/referral",
        label: "Referral",
        description: "Turn your customers into brand advocates",
      },
      {
        href: "/vip-tiers",
        label: "VIP Tiers",
        description: "Create exclusive tiers with unique benefits",
      },
    ],
  },
  {
    title: "Programs",
    items: [
      {
        href: "/member-exclusive-deal",
        label: "Member Exclusive Deal",
        description: "Offer special deals to your loyal customers",
      },
      {
        href: "/reward-programs",
        label: "Reward Programs",
        description: "Design flexible loyalty programs that work",
      },
    ],
  },
];

const megaMenuCategories: MegaMenuCategory[] = [
  {
    title: "Resources",
    items: [
      {
        href: "/category/loyalty-program",
        label: "Blog",
        description: "Latest updates and insights about loyalty programs",
      },
      {
        href: "/migration",
        label: "Migration",
        description: "Seamlessly migrate from other loyalty platforms",
      },
      {
        href: "https://help.joy.so/",
        label: "Help Docs",
        description: "Detailed guides and documentation",
        external: true,
      },
      {
        href: "/integrations",
        label: "Integrations",
        description: "Connect Joy with your favorite tools",
      },
    ],
  },
  {
    title: "Developers",
    items: [
      {
        href: "https://devdocs.joy.so/",
        label: "API Docs",
        description: "Documentation for the Joy API",
        external: true
      },
    ],
  },
  {
    title: "Support",
    items: [
      {
        href: "/about-us/",
        label: "About us",
      }
    ],
  },
];

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a"> & { title: string }
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";

export const Navbar = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [expandedCategories, setExpandedCategories] = React.useState<string[]>([]);

  const toggleCategory = (category: string) => {
    setExpandedCategories(prev =>
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border dark:border-border-dark bg-background dark:bg-background-dark">
      <nav className="container flex h-16 items-center justify-between">
        <Link href="/" className="block">
          <img
            src="/joy-logo-dark.svg"
            alt="Joy retention | Loyalty for Shopify"
            className="w-auto h-16 dark:invert dark:brightness-200 transition-all duration-200"
          />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex md:items-center md:gap-4">
          <NavigationMenu>
            <NavigationMenuList>

              {/* Features Mega Menu */}
              <NavigationMenuItem>
                <NavigationMenuTrigger>Features</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="w-[900px] p-6 bg-background dark:bg-background-dark shadow-lg rounded-xl border border-border/10">
                    <div className="grid grid-cols-2 gap-8">
                      {features.map((category) => (
                        <div key={category.title} className="space-y-3">
                          <h3 className="text-sm font-semibold tracking-wide text-primary dark:text-primary-dark uppercase">
                            {category.title}
                          </h3>
                          <ul className="space-y-1.5">
                            {category.items.map((item) => (
                              <li key={item.href}>
                                <NavigationMenuLink asChild>
                                  <Link
                                    href={item.href}
                                    className="group flex flex-col gap-1.5 rounded-lg px-4 py-3 hover:bg-muted/50 transition-all duration-200"
                                  >
                                    <div className="flex items-center gap-2">
                                      <span className="text-sm font-medium text-foreground/90 dark:text-white/90 group-hover:text-primary dark:group-hover:text-primary-dark transition-colors duration-200">
                                        {item.label}
                                      </span>
                                      <svg
                                        className="w-3.5 h-3.5 text-muted-foreground/50 hover:text-primary group-hover:text-primary dark:group-hover:text-primary-dark group-hover:translate-x-0.5 transition-all duration-200 ease-out opacity-0 group-hover:opacity-100"
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                      >
                                        <path
                                          fillRule="evenodd"
                                          d="M5 10a.75.75 0 01.75-.75h6.638L10.23 7.29a.75.75 0 111.04-1.08l3.5 3.25a.75.75 0 010 1.08l-3.5 3.25a.75.75 0 11-1.04-1.08l2.158-1.96H5.75A.75.75 0 015 10z"
                                          clipRule="evenodd"
                                        />
                                      </svg>
                                    </div>
                                    {item.description && (
                                      <p className="text-sm text-muted-foreground group-hover:text-foreground/70 dark:text-white/50 dark:group-hover:text-white/70 transition-colors duration-200 line-clamp-2">
                                        {item.description}
                                      </p>
                                    )}
                                  </Link>
                                </NavigationMenuLink>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <Link href="/pricing" legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    Pricing
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>

              {/* Resources Mega Menu */}
              <NavigationMenuItem>
                <NavigationMenuTrigger>Resources</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="w-[900px] p-6 bg-background dark:bg-background-dark shadow-lg rounded-xl border border-border/10">
                    <div className="grid grid-cols-3 gap-8">
                      {megaMenuCategories.map((category) => (
                        <div key={category.title} className="space-y-3">
                          <h3 className="text-sm font-semibold tracking-wide text-primary dark:text-primary-dark uppercase">
                            {category.title}
                          </h3>
                          <ul className="space-y-1.5">
                            {category.items.map((item) => (
                              <li key={item.href}>
                                <NavigationMenuLink asChild>
                                  <Link
                                    href={item.href}
                                    {...(item.external ? {
                                      target: "_blank",
                                      rel: "noopener noreferrer"
                                    } : {})}
                                    className="group flex flex-col gap-1.5 rounded-lg px-4 py-3 hover:bg-muted/50 transition-all duration-200"
                                  >
                                    <div className="flex items-center gap-2">
                                      <span className="text-sm font-medium text-foreground/90 dark:text-white/90 group-hover:text-primary dark:group-hover:text-primary-dark transition-colors duration-200">
                                        {item.label}
                                      </span>
                                      <svg
                                        className="w-3.5 h-3.5 text-muted-foreground/50 hover:text-primary group-hover:text-primary dark:group-hover:text-primary-dark group-hover:translate-x-0.5 transition-all duration-200 ease-out opacity-0 group-hover:opacity-100"
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                      >
                                        <path
                                          fillRule="evenodd"
                                          d="M5 10a.75.75 0 01.75-.75h6.638L10.23 7.29a.75.75 0 111.04-1.08l3.5 3.25a.75.75 0 010 1.08l-3.5 3.25a.75.75 0 11-1.04-1.08l2.158-1.96H5.75A.75.75 0 015 10z"
                                          clipRule="evenodd"
                                        />
                                      </svg>
                                    </div>
                                    {item.description && (
                                      <p className="text-sm text-muted-foreground group-hover:text-foreground/70 dark:text-white/50 dark:group-hover:text-white/70 transition-colors duration-200 line-clamp-2">
                                        {item.description}
                                      </p>
                                    )}
                                  </Link>
                                </NavigationMenuLink>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <Link href="/case-study/" legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    Case studies
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        {/* Right Side Actions */}
        <div className="flex items-center gap-4">
          <SearchDialog />

          {/* Mobile Menu Trigger */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Menu className="cursor-pointer" />
            </SheetTrigger>

            <SheetContent side="left" className="flex flex-col justify-between p-0 bg-background dark:bg-background">
              <div className="overflow-y-auto flex-1">
                <SheetHeader className="p-4 mb-4">
                  <SheetTitle className="flex items-start">
                    <Link href="/">
                      <Image
                        src="/logo.svg"
                        alt="Joy"
                        width={55}
                        height={20}
                        className="dark:invert dark:brightness-200 transition-all duration-200"
                      />
                    </Link>
                  </SheetTitle>
                </SheetHeader>

                <div className="flex flex-col">
                  {/* Main Routes */}
                  {mainRoutes.map((route) => (
                    <Button
                      key={route.href}
                      onClick={() => setIsOpen(false)}
                      asChild
                      variant="menu"
                      className="justify-start items-start text-base rounded-none h-auto py-3 px-6 hover:bg-transparent text-left"
                    >
                      <Link href={route.href}>{route.label}</Link>
                    </Button>
                  ))}

                  {/* Mega Menu Categories */}
                  <div className="mt-2">
                    {megaMenuCategories.map((category) => (
                      <div key={category.title}>
                        <button
                          onClick={() => toggleCategory(category.title)}
                          className={cn(
                            "flex items-start justify-between w-full px-6 py-3 text-base",
                            "text-dark",
                            expandedCategories.includes(category.title) && "text-primary dark:text-primary-dark"
                          )}
                        >
                          {category.title}
                          <ChevronDown
                            className={cn(
                              "w-4 h-4 transition-transform duration-200",
                              expandedCategories.includes(category.title) && "rotate-180 dark:text-primary-dark text-primary"
                            )}
                          />
                        </button>

                        {expandedCategories.includes(category.title) && (
                          <div>
                            {category.items.map((item) => (
                              <Button
                                key={item.href}
                                onClick={() => setIsOpen(false)}
                                asChild
                                variant="menu"
                                className="w-full justify-start items-start text-sm rounded-none h-auto py-3 px-8 hover:bg-transparent text-left"
                              >
                                <Link
                                  href={item.href}
                                  {...(item.external ? {
                                    target: "_blank",
                                    rel: "noopener noreferrer"
                                  } : {})}
                                  className="flex flex-col items-start gap-1"
                                >
                                  <span className="text-xs font-normal">{item.label}</span>
                                  {item.description && (
                                    <span className="text-xs font-normal">
                                      {item.description}
                                    </span>
                                  )}
                                </Link>
                              </Button>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <SheetFooter className="p-4">
                <Button asChild className="w-full">
                  <Link
                    href="http://shopify.pxf.io/Vx4jma"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Start for free
                  </Link>
                </Button>
              </SheetFooter>
            </SheetContent>
          </Sheet>

          {/* CTA Button */}
          <Button
            asChild
            className="bg-primary hover:bg-primary/90 text-white hidden md:inline-flex"
          >
            <Link
              href="http://shopify.pxf.io/Vx4jma"
              target="_blank"
              rel="noopener noreferrer"
            >
              Start for free
            </Link>
          </Button>
        </div>
      </nav>
    </header>
  );
};

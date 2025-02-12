"use client";
import {Menu} from "lucide-react";
import React, { useEffect, useState } from "react";
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
import Image from "next/image";
import { useTheme } from "next-themes";
import { usePathname } from 'next/navigation';
// import {ThemeToggle} from "@/components/theme-toggle";

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
    label: "Cases Studies",
  },
];

const megaMenuCategories: MegaMenuCategory[] = [
  {
    title: "Resources",
    items: [
      {
        href: "/blog",
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
      },
      {
        href: "/contact/",
        label: "Contact",
      }
    ],
  },
  
];

export const Navbar = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const { theme } = useTheme();
  const pathname = usePathname();
  const [logoSrc, setLogoSrc] = useState('./joy-logo-dark.svg');

  useEffect(() => {
    // Update logo based on both theme and path
    const updateLogo = () => {
      setLogoSrc(theme === 'dark' 
        ? `./joy-logo-light.svg` 
        : `./joy-logo-dark.svg`
      );
    }
    updateLogo();
  }, [theme, pathname]);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border dark:border-border-dark bg-background dark:bg-background-dark">
      <nav className="container flex h-16 items-center justify-between">
        {/* Logo */}
        <Link href="/" className="block">
          <img
            src={logoSrc}
            alt="Joy retention | Loyalty for Shopify"
            className="w-auto h-16"
          />
        </Link>

        {/* Mobile Menu */}
        <div className="flex items-center gap-4 lg:hidden">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Menu className="cursor-pointer lg:hidden" />
            </SheetTrigger>

            <SheetContent side="left" className="flex flex-col justify-between">
              <div>
                <SheetHeader className="mb-4">
                  <SheetTitle>
                    <Link href="/">
                      <img
                        src={logoSrc}
                        alt="Joy retention | Loyalty for Shopify"
                        className="w-auto h-8"
                      />
                    </Link>
                  </SheetTitle>
                </SheetHeader>

                <div className="flex flex-col gap-2">
                  {mainRoutes.map((route) => (
                    <Button
                      key={route.href}
                      onClick={() => setIsOpen(false)}
                      asChild
                      variant="ghost"
                      className="justify-start text-base"
                    >
                      <Link href={route.href}>{route.label}</Link>
                    </Button>
                  ))}
                </div>
              </div>

              <SheetFooter>
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
        </div>

        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center gap-4">
          <NavigationMenu>
            <NavigationMenuList className="gap-6">
              {mainRoutes.map((route) => (
                <NavigationMenuItem key={route.href}>
                  <NavigationMenuLink asChild>
                    <Link
                      href={route.href}
                      className="text-sm font-medium text-foreground/90 dark:text-white/90 hover:text-primary dark:hover:text-primary-dark transition-colors"
                    >
                      {route.label}
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              ))}

              <NavigationMenuItem>
                <NavigationMenuTrigger className="text-sm font-medium text-foreground/90 dark:text-white/90 hover:text-primary transition-colors bg-transparent hover:bg-transparent">
                  Resources
                </NavigationMenuTrigger>
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
            </NavigationMenuList>
          </NavigationMenu>

          {/* <ThemeToggle /> */}

          <Button
            asChild
            className="bg-primary hover:bg-primary/90 text-white"
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

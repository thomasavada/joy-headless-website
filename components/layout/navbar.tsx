"use client";
import {Menu} from "lucide-react";
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
import Image from "next/image";
import {ThemeToggle} from "@/components/theme-toggle";

interface RouteProps {
  href: string;
  label: string;
}

const mainRoutes: RouteProps[] = [
  {
    href: "/about-us/",
    label: "About us",
  },
  {
    href: "/blog",
    label: "Blog",
  },
  {
    href: "/pricing/",
    label: "Pricing",
  },
  {
    href: "/contact/",
    label: "Contact",
  },
  {
    href: "/integrations",
    label: "Integrations",
  },
  {
    href: "/case-study/",
    label: "Cases Study",
  },
];

const resourceRoutes: RouteProps[] = [
  {
    href: "https://joy.so/category/loyalty-program/",
    label: "Blog",
  },
  {
    href: "/migration",
    label: "Migration",
  },
  {
    href: "https://help.joy.so/",
    label: "Help Docs",
  },
];

export const Navbar = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border dark:border-border-dark bg-background dark:bg-background-dark">
      <nav className="container flex h-16 items-center justify-between">
        {/* Logo */}
        <Link href="/" className="block">
          <Image
            src="https://joy.so/wp-content/uploads/2024/12/Joy-white.png"
            alt="Joy retention | Loyalty for Shopify"
            width={100}
            height={40}
            className="w-auto h-5"
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
                      <Image
                        src="https://joy.so/wp-content/uploads/2024/12/Joy-white.png"
                        alt="Joy retention | Loyalty for Shopify"
                        width={100}
                        height={40}
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
                  <Link href="http://shopify.pxf.io/Vx4jma">Start for free</Link>
                </Button>
              </SheetFooter>
            </SheetContent>
          </Sheet>
        </div>

        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center gap-4">
          <NavigationMenu>
            <NavigationMenuList className="gap-2">
              {mainRoutes.map((route) => (
                <NavigationMenuItem key={route.href}>
                  <NavigationMenuLink asChild>
                    <Link
                      href={route.href}
                      className="px-4 py-2 text-foreground dark:text-foreground-dark hover:text-primary"
                    >
                      {route.label}
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              ))}

              <NavigationMenuItem>
                <NavigationMenuTrigger className="text-foreground dark:text-foreground-dark">
                  Resources
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-48 p-2 bg-background dark:bg-background-dark">
                    {resourceRoutes.map((route) => (
                      <li key={route.href}>
                        <NavigationMenuLink asChild>
                          <Link
                            href={route.href}
                            className="block px-4 py-2 text-foreground dark:text-foreground-dark hover:bg-muted/10 rounded"
                          >
                            {route.label}
                          </Link>
                        </NavigationMenuLink>
                      </li>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          <ThemeToggle />

          <Button
            asChild
            className="bg-primary hover:bg-primary/90 text-white"
          >
            <Link href="http://shopify.pxf.io/Vx4jma">
              Start for free
            </Link>
          </Button>
        </div>
      </nav>
    </header>
  );
};

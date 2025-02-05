"use client";
import { Menu } from "lucide-react";
import React from "react";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { Separator } from "../ui/separator";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "../ui/navigation-menu";
import { Button } from "../ui/button";
import Link from "next/link";
import Image from "next/image";

interface RouteProps {
  href: string;
  label: string;
}

const mainRoutes: RouteProps[] = [
  {
    href: "https://joy.so/about-us/",
    label: "About us",
  },
  {
    href: "https://joy.so/pricing/",
    label: "Pricing",
  },
  {
    href: "https://joy.so/contact/",
    label: "Contact",
  },
  {
    href: "https://joy.so/case-study/",
    label: "Cases Study",
  },
];

const resourceRoutes: RouteProps[] = [
  {
    href: "https://joy.so/category/loyalty-program/",
    label: "Blog",
  },
  {
    href: "https://joy.so/migrate/",
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
    <header className="shadow-inner bg-opacity-15 w-[90%] md:w-[70%] lg:w-[75%] lg:max-w-screen-xl top-5 mx-auto sticky border border-secondary z-40 rounded-2xl flex justify-between items-center px-6 py-4 bg-card">
      {/* Logo */}
      <Link href="https://joy.so/" className="block">
        <Image
          src="https://joy.so/wp-content/uploads/2024/12/Joy-white.png"
          alt="Joy retention | Loyalty for Shopify"
          width={100}
          height={40}
          className="w-auto h-8"
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
                  <Link href="https://joy.so/">
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
                  <Link href={route.href} className="px-4 py-2">
                    {route.label}
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            ))}

            <NavigationMenuItem>
              <NavigationMenuTrigger>Resources</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-48 p-2">
                  {resourceRoutes.map((route) => (
                    <li key={route.href}>
                      <NavigationMenuLink asChild>
                        <Link
                          href={route.href}
                          className="block px-4 py-2 hover:bg-muted rounded"
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

        <Button asChild>
          <Link href="http://shopify.pxf.io/Vx4jma">Start for free</Link>
        </Button>
      </div>
    </header>
  );
};

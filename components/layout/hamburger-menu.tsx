import React from "react";
import Link from "next/link"; 
import { Menu } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  NavigationMenu, 
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList, 
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { ModeToggler } from "@/components/ui/mode-toggler";
import { options } from "#site/content";

export default function HamburgerMenu() {
  return (
    <>
      <div className="md:hidden my-auto">
        <Sheet>
          <SheetTrigger>
            <Menu className="h-8 w-8 my-auto" />
            <span className="sr-only">Close</span>
          </SheetTrigger>
          <SheetTitle className="sr-only">Menu Button</SheetTitle>
          <SheetContent aria-describedby={undefined} className="w-full">
            <ModeToggler />

            <NavigationMenu className="my-20 mx-auto">
              <NavigationMenuList className="mx-3 flex-col gap-5 w-full">
                {options.links.map((item, index) => (
                  <NavigationMenuItem key={index}>
                    <Link href={item.link} legacyBehavior passHref>
                      <NavigationMenuLink
                        className={navigationMenuTriggerStyle()}
                        title={item.text}
                      >
                        {item.text}
                      </NavigationMenuLink>
                    </Link>
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList> 
            </NavigationMenu>
          </SheetContent>
        </Sheet>
      </div>
    </>
  );
}

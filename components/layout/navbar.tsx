"use client";
import * as React from "react";
import Link from "next/link"; 
import {
  NavigationMenu, 
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList, 
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { ModeToggler } from "@/components/ui/mode-toggler";
import { options } from "#site/content";

export default function Navbar() {
  return (
    <NavigationMenu className="my-2">
      <NavigationMenuList className="mx-3">
        {options.links.map((item, index) => (
          <NavigationMenuItem key={index}>
            <Link href={item.link} legacyBehavior passHref>
              <NavigationMenuLink className={navigationMenuTriggerStyle()} title={item.text}>
                {item.text}
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
      <ModeToggler />
    </NavigationMenu>
  );
}
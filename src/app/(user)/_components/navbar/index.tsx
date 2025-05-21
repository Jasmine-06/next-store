import React from "react";
import NavbarSearchbar from "./navbar-searchbar";
import Logo from "@/components/logo/Logo";
import Link from "next/link";
import { LogIn, ShoppingCart, Store } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NavbarIndex() {
  return (
    <nav className="flex justify-between items-center bg-background shadow-md p-4">
      {/* Logo section */}
      <div className="flex-shrink-0">
        <Logo />
      </div>

      {/* Search section - centered and expanded */}
      <div className="flex-grow flex justify-center mx-6">
        <NavbarSearchbar />
      </div>

      {/* Menu items section */}
      <div className="flex-shrink-0">
        <ul className="flex items-center gap-4">
          <li>
            <Link href="#" className="relative flex items-center hover:text-gray-500 text-gray-900">
              <Store className="" />
              <span className="ml-1 text-nowrap">Become a seller</span>
            </Link>
          </li>

          <li>
            <Link href="#" className="relative flex items-center hover:text-gray-500">
              <ShoppingCart className="h-6 w-6" />
              <span className="absolute -top-3 right-6 bg-red-600 text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">
                8
              </span>
              <span className="ml-1">cart</span>
            </Link>
          </li>
        
          <li>
            <Button
              variant={"default"}
              className="flex items-center rounded-3xl  hover:text-white">
              Login
              <LogIn />
            </Button>
          </li>
        </ul>

      </div>
    </nav>
  );
}

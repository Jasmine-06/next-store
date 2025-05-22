'use client';
import React, { useState } from "react";
import NavbarSearchbar from "./navbar-searchbar";
import Logo from "@/components/logo/Logo";
import Link from "next/link";
import { LogIn, Menu, Search, ShoppingCart, Store, X } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NavbarIndex() {
  const [showMobileSearch, setShowMobileSearch] = useState(false);

  return (
    <nav className="flex justify-between items-center bg-background shadow-md p-4">
      {/* Mobile search mode */}
      {showMobileSearch ? (
        <div className="flex items-center justify-between w-full gap-2">
          {/* Menu button stays visible */}
          <button className="md:hidden">
            <Menu className="h-6 w-6" />
          </button>

          {/* Search bar in the center */}
          <div className="flex-grow px-2">
            <NavbarSearchbar/>
          </div>

          {/* Close button to exit search mode */}
          <button onClick={() => setShowMobileSearch(false)} className="md:hidden">
            <X className="h-6 w-6" />
          </button>
        </div>
      ) : (
        // Normal navbar
        <>
          {/* Left: Menu + Logo */}
          <div className="flex items-center gap-3">
            <button className="md:hidden">
              <Menu className="h-6 w-6" />
            </button>
            <Logo />
          </div>

          {/* Center: Searchbar (only on desktop) */}
          <div className="flex-grow flex justify-center mx-6">
            <div className="hidden md:block w-full max-w-lg">
              <NavbarSearchbar />
            </div>
          </div>

          {/* Right: Icons and buttons */}
          <div className="flex-shrink-0 flex items-center gap-4">
            {/* Become a Seller (desktop only) */}
            <Link href="#" className="hidden md:flex items-center hover:text-gray-500 text-gray-900">
              <Store />
              <span className="ml-1 whitespace-nowrap">Become a seller</span>
            </Link>

            {/* Cart (desktop only) */}
            <Link href="#" className="hidden md:flex relative items-center hover:text-gray-500">
              <ShoppingCart className="h-6 w-6" />
              <span className="absolute -top-2 right-4 bg-red-600 text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">
                8
              </span>
              <span className="ml-1">Cart</span>
            </Link>

            {/* Mobile search icon */}
            <button onClick={() => setShowMobileSearch(true)} className="md:hidden">
              <Search className="h-5 w-5" />
            </button>

            {/* Login Button */}
            <Button
              variant="default"
              className="flex items-center gap-2 rounded-3xl hover:text-white">
              Login
              <LogIn className="h-4 w-4" />
            </Button>
          </div>
        </>
      )}
    </nav>
  );
}

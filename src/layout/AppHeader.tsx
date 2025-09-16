"use client";
import { ThemeToggleButton } from "@/components/common/ThemeToggleButton";
// import NotificationDropdown from "@/components/header/NotificationDropdown";
import UserDropdown from "@/components/header/UserDropdown";
import { useSidebar } from "@/context/SidebarContext";
import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect, useRef } from "react";
import NavMenu from "./NavMenu";

const AppHeader: React.FC = () => {
  const [isApplicationMenuOpen, setApplicationMenuOpen] = useState(false);
  const { isMobileOpen, toggleSidebar, toggleMobileSidebar } = useSidebar();
  const inputRef = useRef<HTMLInputElement>(null);

  const handleToggle = () => {
    if (window.innerWidth >= 1024) {
      toggleSidebar();
    } else {
      toggleMobileSidebar();
    }
  };

  const toggleApplicationMenu = () => {
    setApplicationMenuOpen(!isApplicationMenuOpen);
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key === "k") {
        event.preventDefault();
        inputRef.current?.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full bg-white border-b border-gray-200 dark:border-gray-800 dark:bg-gray-900">
      <div className="flex flex-col lg:flex-row items-center justify-between w-full px-4 py-3 lg:px-6">
        {/* Top Row: Logo + Mobile Actions */}
        <div className="flex items-center justify-between w-full lg:w-auto">
          {/* Sidebar toggle button */}
          <button
            className="lg:hidden text-gray-500 dark:text-gray-400"
            onClick={handleToggle}
            aria-label="Toggle Sidebar"
          >
            {isMobileOpen ? (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M6.22 7.28a.75.75 0 011.06 0L12 11.94l4.72-4.72a.75.75 0 111.06 1.06L13.06 13l4.72 4.72a.75.75 0 11-1.06 1.06L12 14.06l-4.72 4.72a.75.75 0 11-1.06-1.06L10.94 13 6.22 8.28a.75.75 0 010-1.06z"
                  fill="currentColor"
                />
              </svg>
            ) : (
              <svg width="16" height="12" viewBox="0 0 16 12" fill="none">
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M1.33.25h13.33a.75.75 0 110 1.5H1.33a.75.75 0 010-1.5zm0 10h13.33a.75.75 0 110 1.5H1.33a.75.75 0 010-1.5zM1.33 5.25a.75.75 0 000 1.5H8a.75.75 0 000-1.5H1.33z"
                  fill="currentColor"
                />
              </svg>
            )}
          </button>

          {/* Logo (mobile + desktop) */}
          <Link href="/" className="ml-3 lg:ml-6 flex items-center">
            <Image
              width={154}
              height={32}
              className="dark:hidden"
              src="/images/logo/logo.svg"
              alt="Logo"
            />
            <Image
              width={154}
              height={32}
              className="hidden dark:block"
              src="/images/logo/logo-dark.svg"
              alt="Logo"
            />
          </Link>

          {/* App Menu button (mobile only) */}
          <button
            onClick={toggleApplicationMenu}
            className="lg:hidden ml-auto text-gray-700 dark:text-gray-400"
          >
            <svg width="24" height="24" fill="none">
              <path
                d="M6 11.995a1 1 0 112 0 1 1 0 01-2 0zM12 11.995a1 1 0 112 0 1 1 0 01-2 0zM18 11.995a1 1 0 112 0 1 1 0 01-2 0z"
                fill="currentColor"
              />
            </svg>
          </button>
        </div>

        {/* Expanded menu on mobile (or always shown on lg+) */}
        <div
          className={`w-full items-center justify-between flex-col gap-4 mt-4 lg:mt-0 lg:flex lg:flex-row ${
            isApplicationMenuOpen ? "flex" : "hidden"
          } lg:flex`}
        >
          {/* hidden lg:flex items-center gap-6 */}
          {/* Center: Nav Menu */}
          <div className="hidden lg:flex items-center gap-6 ml-6">
            <NavMenu />
          </div>

          {/* Right: Actions */}
          <div className="flex items-center gap-4 justify-end ">
            <ThemeToggleButton />
            <UserDropdown />
          </div>
        </div>
      </div>
    </header>
  );
};

export default AppHeader;

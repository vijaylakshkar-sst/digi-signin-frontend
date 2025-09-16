// components/NavMenu.tsx
"use client";
import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { CalenderIcon, ChevronDownIcon, GridIcon, ListIcon, PageIcon, TableIcon } from "../icons";

type SubItem = { name: string; path: string; pro?: boolean; new?: boolean };
type NavItem = {
  name: string;
  icon?: React.ReactNode;
  path?: string;
  subItems?: SubItem[];
};

const navItems: NavItem[] = [
  {
    name: "Dashboard",
    icon: <GridIcon />,
    path: "/dashboard",
    subItems: [{ name: "Ecommerce", path: "/", pro: false }],
  },
 {
    icon: <CalenderIcon />,
    name: "Calendar",
    path: "/calendar",
  },

  {
    name: "Forms",
    icon: <ListIcon />,
    subItems: [{ name: "Form Elements", path: "/form-elements", pro: false }],
  },
  {
    name: "Tables",
    icon: <TableIcon />,
    subItems: [{ name: "Basic Tables", path: "/basic-tables", pro: false }],
  },
  {
    name: "Pages",
    icon: <PageIcon />,
    subItems: [
      { name: "Blank Page", path: "/blank", pro: false },
      { name: "404 Error", path: "/error-404", pro: false },
    ],
  },
  // Add more nav items here
];

const NavMenu: React.FC = () => {
  const pathname = usePathname();
  const isActive = useCallback((path: string) => pathname === path, [pathname]);

  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const handleToggle = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  useEffect(() => {
    navItems.forEach((item, index) => {
      if (item.subItems?.some((sub) => isActive(sub.path))) {
        setOpenIndex(index);
      }
    });
  }, [pathname, isActive]);

  return (
    <div className="flex gap-6 items-center">
      {navItems.map((item, index) => {
        const isOpen = openIndex === index;

        return item.subItems ? (
          <div key={item.name} className="relative group">
            <button
              onClick={() => handleToggle(index)}
              className={`flex items-center gap-1 px-3 py-2 text-sm font-medium rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 ${
                isOpen ? "text-blue-600 dark:text-blue-400" : "text-gray-700 dark:text-gray-300"
              }`}
            >
              {item.icon}
              {item.name}
              <ChevronDownIcon className="w-4 h-4" />
            </button>

            <div
              className={`absolute left-0 top-full mt-2 w-48 rounded-md shadow-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 z-50 ${
                isOpen ? "block" : "hidden"
              }`}
            >
              {item.subItems.map((sub) => (
                <Link
                  key={sub.name}
                  href={sub.path}
                  className={`flex items-center justify-between px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 ${
                    isActive(sub.path)
                      ? "text-blue-600 dark:text-blue-400"
                      : "text-gray-700 dark:text-gray-200"
                  }`}
                >
                  {sub.name}
                  <span className="ml-auto flex gap-1">
                    {sub.new && (
                      <span className="text-xs text-white bg-green-500 px-1.5 py-0.5 rounded">
                        NEW
                      </span>
                    )}
                    {sub.pro && (
                      <span className="text-xs text-white bg-purple-500 px-1.5 py-0.5 rounded">
                        PRO
                      </span>
                    )}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        ) : (
          <Link
            key={item.name}
            href={item.path || "#"}
            className={`flex items-center gap-1 px-3 py-2 text-sm font-medium rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 ${
              isActive(item.path || "")
                ? "text-blue-600 dark:text-blue-400"
                : "text-gray-700 dark:text-gray-300"
            }`}
          >
            {item.icon}
            {item.name}
          </Link>
        );
      })}
    </div>
  );
};

export default NavMenu;

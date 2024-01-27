"use client";
import { DropdownMenu, Text } from "@radix-ui/themes";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { PropsWithChildren, forwardRef } from "react";
import "react-loading-skeleton/dist/skeleton.css";
import AppLogo from "./AppLogo";

export function NavBar() {
  const path = usePathname();

  return (
    <nav className="flex space-x-6 border-b-2 h-14 items-center">
      <Link href="/">
        <AppLogo />
      </Link>
      <ul className="flex space-x-2">
        <li>
          <MenuLink isActive={path === "/workouts"} href="/workouts" hoverable>
            Workouts
          </MenuLink>
        </li>
        <li>
          <DropdownMenu.Root>
            <DropdownMenu.Trigger>
              <Text
                className={`${
                  path.includes("/exercises") && "text-red-300"
                } hover:cursor-pointer hover:text-red-500 transition-colors`}
              >
                Exercises
              </Text>
            </DropdownMenu.Trigger>
            <DropdownMenu.Content>
              <DropdownMenu.Item>
                <MenuLink href="/exercises">View</MenuLink>
              </DropdownMenu.Item>
              <DropdownMenu.Item>
                <MenuLink href="/exercises/new">Create</MenuLink>
              </DropdownMenu.Item>
            </DropdownMenu.Content>
          </DropdownMenu.Root>
        </li>
      </ul>
    </nav>
  );
}

const MenuLink = forwardRef<
  HTMLButtonElement,
  PropsWithChildren<{ href: string; isActive?: boolean; hoverable?: boolean }>
>(({ isActive = false, href, hoverable = false, children }, ref) => {
  return (
    <Link
      className={`
        ${isActive && "text-red-300"}
        ${hoverable && "hover:text-red-500 transition-colors"}
      `}
      href={href}
    >
      {children}
    </Link>
  );
});

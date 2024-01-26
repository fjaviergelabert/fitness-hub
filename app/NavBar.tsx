"use client";
import { DropdownMenu, Text } from "@radix-ui/themes";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { PropsWithChildren, forwardRef } from "react";
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
          <MenuLink isActive={path === "/workouts"} href="/workouts">
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
              <DropdownMenu.Item shortcut="⌘ V">
                <Link href="/exercises">View</Link>
              </DropdownMenu.Item>
              <DropdownMenu.Item shortcut="⌘ C">
                <Link href="/exercises/new">Create</Link>
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
  PropsWithChildren<{ href: string; isActive?: boolean }>
>(({ isActive = false, href, children }, ref) => {
  return (
    <Link
      className={`${
        isActive && "text-red-300"
      } hover:text-red-500 transition-colors`}
      href={href}
    >
      {children}
    </Link>
  );
});

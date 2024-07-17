"use client";
import { Button, DropdownMenu, Text } from "@radix-ui/themes";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { PropsWithChildren, forwardRef } from "react";
import "react-loading-skeleton/dist/skeleton.css";
import AppLogo from "./AppLogo";

export function NavBar() {
  const path = usePathname();
  const session = useSession();

  return (
    <nav className="flex space-x-6 border-b-2 h-14 items-center px-4">
      <Link href="/">
        <AppLogo />
      </Link>
      <ul className="flex space-x-2 flex-grow">
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
            <DropdownMenu.Content sideOffset={5} align="start">
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
      {session.status === "unauthenticated" && (
        <Button variant="surface" asChild>
          <Link href={"/api/auth/signin"}>Sign In</Link>
        </Button>
      )}
      {session.status === "authenticated" && (
        <Button variant="soft" asChild>
          <Link href={"/api/auth/signout"}>Sign out</Link>
        </Button>
      )}
    </nav>
  );
}

const MenuLink = forwardRef<
  HTMLAnchorElement,
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

MenuLink.displayName = "MenuLink";

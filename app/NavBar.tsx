"use client";
import * as Auth from "@/app/_shared/components/Authorize";
import { Avatar, Button, DropdownMenu, Text } from "@radix-ui/themes";
import { Session } from "next-auth";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { PropsWithChildren, forwardRef } from "react";
import "react-loading-skeleton/dist/skeleton.css";
import AppLogo from "./AppLogo";

export function NavBar({ session }: { session: Session | null }) {
  const path = usePathname();
  return (
    <nav className="flex space-x-6 border-b-2 h-14 items-center px-4">
      <Link href={`${session?.user ? "/dashboard" : "/"}`}>
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
                className={` flex gap-1 items-center ${
                  path.includes("/exercises") && "text-red-300"
                } hover:cursor-pointer hover:text-red-500 transition-colors`}
              >
                Exercises
                <DropdownMenu.TriggerIcon />
              </Text>
            </DropdownMenu.Trigger>
            <DropdownMenu.Content sideOffset={5} align="start">
              <DropdownMenu.Item>
                <MenuLink href="/exercises">View</MenuLink>
              </DropdownMenu.Item>
              <Auth.PERSONAL_TRAINER>
                <DropdownMenu.Item>
                  <MenuLink href="/exercises/new">Create</MenuLink>
                </DropdownMenu.Item>
              </Auth.PERSONAL_TRAINER>
            </DropdownMenu.Content>
          </DropdownMenu.Root>
        </li>
        <Auth.ADMIN>
          <li>
            <MenuLink
              isActive={path === "/admin/users"}
              href="/admin/users"
              hoverable
            >
              Users
            </MenuLink>
          </li>
        </Auth.ADMIN>
      </ul>

      <Auth.USER
        fallback={
          <Button variant="surface" asChild>
            <Link href={"/api/auth/signin"}>Sign In</Link>
          </Button>
        }
      >
        <DropdownMenu.Root>
          <DropdownMenu.Trigger>
            <Text className="cursor-pointer">
              <Avatar
                size="3"
                src={session?.user?.image || ""}
                radius="full"
                fallback="?"
              />
            </Text>
          </DropdownMenu.Trigger>
          <DropdownMenu.Content sideOffset={5} align="start">
            {session?.user.name && (
              <DropdownMenu.Item disabled>
                {session?.user.name}
              </DropdownMenu.Item>
            )}

            <DropdownMenu.Separator />
            <DropdownMenu.Item>
              <Link className="flex-1" href="/profile">
                Profile
              </Link>
            </DropdownMenu.Item>
            <DropdownMenu.Item className="cursor-pointer" color="red">
              <Link className="flex-1" href={"/api/auth/signout"}>
                Sign out
              </Link>
            </DropdownMenu.Item>
          </DropdownMenu.Content>
        </DropdownMenu.Root>
      </Auth.USER>
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

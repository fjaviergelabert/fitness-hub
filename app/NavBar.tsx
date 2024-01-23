"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import AppLogo from "./AppLogo";

export function NavBar() {
  const path = usePathname();
  const links = [
    { label: "Workouts", path: "/workouts" },
    { label: "Exercises", path: "/exercises" },
  ];

  return (
    <nav className="flex space-x-6 border-b-2 h-14 items-center">
      <Link href="/">
        <AppLogo />
      </Link>
      <ul className="flex space-x-2">
        {links.map((link) => (
          <li>
            <Link
              className={`${
                path === link.path && "text-red-300"
              } hover:text-red-500 transition-colors`}
              href={link.path}
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

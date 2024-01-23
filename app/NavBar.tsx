import Link from "next/link";
import AppLogo from "./AppLogo";

const linkStyle = "hover:text-red-400 transition-colors";

export function NavBar() {
  return (
    <nav className="flex space-x-6 border-b-2 h-14 items-center w-full">
      <Link href="/">
        <AppLogo />
      </Link>
      <ul className="flex space-x-2">
        <li>
          <Link className={`${linkStyle}`} href="/workouts">
            Workouts
          </Link>
        </li>
        <li>
          <Link className={`${linkStyle}`} href="/exercises">
            Exercises
          </Link>
        </li>
      </ul>
    </nav>
  );
}

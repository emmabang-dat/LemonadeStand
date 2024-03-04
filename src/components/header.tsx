import React from "react";
import { CitrusIcon } from "../../public/svg/citrusIcon";
import Link from "next/link";
import { ModeToggle } from "./dark-mode";

function Header() {
  return (
    <header className="flex items-center h-14 px-4 border-b lg:h-20 dark:border-gray-800">
      <div className="flex items-center gap-2">
        <Link
          className="flex items-center font-semibold text-gray-900 dark:text-gray-50"
          href="/"
        >
          <CitrusIcon className="h-6 w-6 text-primary" />
          <span className="pl-4">Lemonade Stand</span>
        </Link>
      </div>
      <nav className="ml-auto flex items-center gap-4 lg:gap-6">
        <Link
          className="font-medium text-gray-500 hover:text-primary dark:text-gray-400 dark:hover:text-primary"
          href="/"
        >
          Home
        </Link>
        <Link
          className="font-medium text-gray-500 hover:text-primary dark:text-gray-400 dark:hover:text-primary"
          href="/contact"
        >
          Contact
        </Link>
        <Link
          className="font-medium text-gray-500 hover:text-primary dark:text-gray-400 dark:hover:text-primary"
          href="/panel"
        >
          Panel
        </Link>
        <div className="flex items-center gap-2">
          <ModeToggle />
        </div>
      </nav>
    </header>
  );
}

export default Header;

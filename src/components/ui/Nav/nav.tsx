"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/search", label: "Szukaj" },
  { href: "/host/listings/new", label: "Wynajmij swój domek" },
];

export default function Nav() {
  const pathname = usePathname();

  return (
    <nav className="hidden items-center gap-7 text-[15px] font-semibold md:flex">
      {links.map(({ href, label }) => {
        const active = pathname === href;
        return (
          <Link
            key={href}
            href={href}
            aria-current={active ? "page" : undefined}
            className={`underline-offset-8 decoration-2 hover:underline ${
              active ? "underline" : ""
            }`}
          >
            {label}
          </Link>
        );
      })}
    </nav>
  );
}

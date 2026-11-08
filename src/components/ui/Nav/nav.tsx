'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const links = [
  { href: '/search', label: 'Szukaj' },
  { href: '/host/listings/new', label: 'Wynajmij swój domek' },
]

export default function Nav() {
  const pathname = usePathname()

  return (
    <nav className="flex items-center gap-6 text-sm font-medium">
      {links.map(({ href, label }) => (
        <Link
          key={href}
          href={href}
          className={pathname === href ? 'font-bold underline' : 'hover:underline'}
        >
          {label}
        </Link>
      ))}

      <Link href="/login" className="rounded-full border border-current px-4 py-2">
        Zaloguj się
      </Link>
    </nav>
  )
}

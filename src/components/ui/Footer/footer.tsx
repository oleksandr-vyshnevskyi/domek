import Link from 'next/link'
import Logo from "@/components/ui/Logo/logo";
const sections = [
  {
    title: 'Dla gości',
    links: [
      { href: '/search', label: 'Szukaj noclegu' },
      { href: '/account/bookings', label: 'Moje rezerwacje' },
    ],
  },
  {
    title: 'Dla gospodarzy',
    links: [
      { href: '/host/listings/new', label: 'Dodaj ogłoszenie' },
      { href: '/host', label: 'Panel gospodarza' },
    ],
  },
  {
    title: 'Domek',
    links: [
      { href: '/regulamin', label: 'Regulamin' },
      { href: '/prywatnosc', label: 'Prywatność' },
      { href: '/kontakt', label: 'Kontakt' },
    ],
  },
]

export default function Footer() {
  return (
    <footer className="bg-dark text-on-dark mt-auto">
      <div className="mx-auto grid w-full max-w-page gap-8 p-8 md:grid-cols-[2fr_1fr_1fr_1fr]">
        <div>
          <Logo />
          <p className="mt-2 text-sm">Noclegi od gospodarzy w całej Polsce.</p>
        </div>

        {sections.map((section) => (
          <div key={section.title}>
            <h2 className="mb-2 text-sm font-bold text-white">{section.title}</h2>
            <ul className="space-y-2 text-sm">
              {section.links.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="hover:underline">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </footer>
  )
}

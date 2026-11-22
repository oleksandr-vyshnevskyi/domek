import Link from "next/link";

const sections = [
  {
    title: "Dla gości",
    links: [
      { href: "/search", label: "Szukaj noclegu" },
      { href: "/account/bookings", label: "Moje rezerwacje" },
    ],
  },
  {
    title: "Dla gospodarzy",
    links: [
      { href: "/host/listings/new", label: "Dodaj ogłoszenie" },
      { href: "/host", label: "Panel gospodarza" },
    ],
  },
  {
    title: "Domek",
    links: [
      { href: "/regulamin", label: "Regulamin" },
      { href: "/prywatnosc", label: "Prywatność" },
      { href: "/kontakt", label: "Kontakt" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="mt-auto bg-darker text-on-dark">
      <div className="mx-auto w-full max-w-page px-4 pt-12 pb-8 sm:px-6 lg:px-8">
        <div className="grid gap-8 text-[15px] sm:grid-cols-2 md:grid-cols-[2fr_1fr_1fr_1fr]">
          <div className="flex flex-col gap-2.5">
            <span className="text-xl font-extrabold text-white">Domek</span>
            <p className="leading-relaxed text-on-dark-muted">
              Noclegi od gospodarzy w całej Polsce.
            </p>
          </div>

          {sections.map((section) => (
            <div key={section.title} className="flex flex-col gap-2.5">
              <h2 className="text-[15px] text-white">{section.title}</h2>
              <ul className="flex flex-col gap-2.5">
                {section.links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="hover:text-white hover:underline">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-8 border-t border-[#4A3728] pt-5 text-[13px] text-on-dark-muted">
          © 2026 Domek · projekt portfolio
        </div>
      </div>
    </footer>
  );
}

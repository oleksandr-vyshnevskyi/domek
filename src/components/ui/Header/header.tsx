import Logo from '@/components/ui/Logo/logo'
import Nav from '@/components/ui/Nav/nav'

export default function Header({ dark = false }: { dark?: boolean }) {
  return (
    <header
      className={`sticky top-0 z-40 w-full ${
        dark ? 'bg-dark text-white' : 'border-border bg-background border-b'
      }`}
    >
      <div className="mx-auto flex w-full max-w-page items-center justify-between p-4">
        <Logo />
        <Nav />
      </div>
    </header>
  )
}


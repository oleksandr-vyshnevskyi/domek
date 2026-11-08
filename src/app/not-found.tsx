import Link from 'next/link'

export default function NotFound() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center gap-4 p-4 text-center">
      <h1 className="text-display text-primary">404</h1>
      <p className="text-muted-foreground">Nie znaleziono tej strony.</p>
      <Link
        href="/"
        className="bg-primary text-primary-foreground rounded-full px-6 py-3 font-medium hover:opacity-90"
      >
        Wróć na stronę główną
      </Link>
    </main>
  )
}

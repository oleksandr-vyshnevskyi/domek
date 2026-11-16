import Header from '@/components/ui/Header/header'
import Footer from '@/components/ui/Footer/footer'

export default function HomeLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header dark/>
      <main className="mx-auto w-full max-w-page px-4 sm:px-6 lg:px-8">
  {children}
</main>
      <Footer />
    </>
  )
}

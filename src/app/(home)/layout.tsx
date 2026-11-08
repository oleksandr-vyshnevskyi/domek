import Header from '@/components/ui/Header/header'
import Footer from '@/components/ui/Footer/footer'

export default function HomeLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header dark/>
      {children}
      <Footer />
    </>
  )
}

import Header from '@/components/ui/Header/header'
import Footer from '@/components/ui/Footer/footer'

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header/>
      {children}
      <Footer />
    </>
  )
}

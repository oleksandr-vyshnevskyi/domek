import Header from '@/components/ui/Header/header'
import Footer from '@/components/ui/Footer/footer'
import List from '@/components/ui/List/list'

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header/>
      <List/>
      {children}
      <Footer />
    </>
  )
}

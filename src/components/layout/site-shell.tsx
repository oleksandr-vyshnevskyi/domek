import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";

type Props = { children: React.ReactNode; dark?: boolean };

export default function SiteShell({ children, dark = false }: Props) {
  return (
    <>
      <Header dark={dark} />
      <main className="mx-auto w-full max-w-page px-4 sm:px-6 lg:px-8">{children}</main>
      <Footer />
    </>
  );
}

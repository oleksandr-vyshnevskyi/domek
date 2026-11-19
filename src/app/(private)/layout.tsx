import { Suspense } from "react";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/session";
import Header from "@/components/ui/Header/header";
import Footer from "@/components/ui/Footer/footer";

async function Guard({ children }: { children: React.ReactNode }) {
  const session = await getSession();
  if (!session) redirect("/login");
  return <>{children}</>;
}

export default function PrivateLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main className="mx-auto w-full max-w-page px-4 sm:px-6 lg:px-8">
        <Suspense fallback={null}>
          <Guard>{children}</Guard>
        </Suspense>
      </main>
      <Footer />
    </>
  );
}

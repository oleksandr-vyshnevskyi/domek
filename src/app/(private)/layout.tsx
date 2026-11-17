import { Suspense } from "react";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/session";

async function Guard({ children }: { children: React.ReactNode }) {
  const session = await getSession();
  if (!session) redirect("/login");
  return <>{children}</>;
}

export default function PrivateLayout({ children }: { children: React.ReactNode }) {
  return (
    <Suspense fallback={null}>
      <Guard>{children}</Guard>
    </Suspense>
  );
}
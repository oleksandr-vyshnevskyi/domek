import { Suspense } from "react";
import SiteShell from "@/components/layout/site-shell";
import { requireUser } from "@/lib/session";

async function Guard({ children }: { children: React.ReactNode }) {
  await requireUser();
  return <>{children}</>;
}

export default function PrivateLayout({ children }: { children: React.ReactNode }) {
  return (
    <SiteShell>
      <Suspense fallback={null}>
        <Guard>{children}</Guard>
      </Suspense>
    </SiteShell>
  );
}

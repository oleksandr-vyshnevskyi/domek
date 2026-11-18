import { Suspense } from "react";
import Logo from "@/components/ui/Logo/logo";
import Nav from "@/components/ui/Nav/nav";
import { UserMenu } from "@/components/user-menu";

export default function Header({ dark = false }: { dark?: boolean }) {
  return (
    <header
      className={`sticky top-0 z-40 w-full ${
        dark ? "bg-dark text-white" : "border-b border-border bg-background/95 backdrop-blur"
      }`}
    >
      <div className="mx-auto flex w-full max-w-page items-center justify-between gap-4 px-4 py-3.5 sm:px-6 lg:px-8">
        <Logo dark={dark} />
        <div className="flex items-center gap-7">
          <Nav />
          <Suspense fallback={<div className="size-10 rounded-full bg-muted" />}>
            <UserMenu dark={dark} />
          </Suspense>
        </div>
      </div>
    </header>
  );
}

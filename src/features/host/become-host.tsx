import { House } from "lucide-react";
import { Button } from "@/components/ui/button";
import { becomeHost } from "@/features/host/actions";

export function BecomeHost() {
  return (
    <div className="mx-auto flex max-w-xl flex-col items-center gap-5 py-20 text-center">
      <span className="flex size-14 items-center justify-center rounded-full bg-secondary text-secondary-foreground">
        <House className="size-6" aria-hidden="true" />
      </span>
      <h1 className="text-[34px] leading-tight">Zostań gospodarzem</h1>
      <p className="text-[17px] leading-relaxed text-muted-foreground">
        Dodawaj swoje mieszkania, ustalaj ceny i zarządzaj ogłoszeniami w jednym miejscu.
        Możesz zacząć od razu, bez dodatkowej weryfikacji.
      </p>
      <form action={becomeHost}>
        <Button type="submit" size="lg">
          Zostań gospodarzem
        </Button>
      </form>
    </div>
  );
}

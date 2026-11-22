import { signInAsDemo } from "@/features/auth/demo-actions";
import { Button } from "@/components/ui/button";

export function DemoLogin() {
  return (
    <div className="flex flex-col gap-2.5 rounded-card bg-secondary p-[18px]">
      <span className="text-sm font-extrabold text-secondary-foreground">
        Szybkie demo — bez rejestracji
      </span>
      <div className="grid grid-cols-2 gap-2.5">
        <form action={signInAsDemo.bind(null, "guest")}>
          <Button type="submit" variant="outline" className="w-full bg-card">
            Wejdź jako gość
          </Button>
        </form>
        <form action={signInAsDemo.bind(null, "host")}>
          <Button type="submit" variant="outline" className="w-full bg-card">
            Wejdź jako gospodarz
          </Button>
        </form>
      </div>
    </div>
  );
}

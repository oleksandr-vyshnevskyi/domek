import Link from "next/link";
import { getSession } from "@/lib/session";
import { Button } from "@/components/ui/Button/button";
import { UserDropdown } from "@/components/user-dropdown";

export async function UserMenu() {
  const session = await getSession();

  if (!session) {
    return (
      <div className="flex items-center gap-2">
                <Button variant="ghost" nativeButton={false} render={<Link href="/login" />}>
            Zaloguj się
            </Button>
            <Button nativeButton={false} render={<Link href="/register" />}>
            Zarejestruj się
            </Button>
      </div>
    );
  }

  const { name, email, image } = session.user;
  return <UserDropdown name={name} email={email} image={image ?? null} />;
}
import Link from "next/link";
import { getSession } from "@/lib/session";
import { UserDropdown } from "@/components/user-dropdown";

export async function UserMenu({ dark = false }: { dark?: boolean }) {
  const session = await getSession();

  if (!session) {
    return (
      <Link
        href="/login"
        className={`rounded-full border-[1.5px] px-[18px] py-2.5 text-[15px] font-semibold transition-colors ${
          dark
            ? "border-white text-white hover:bg-white hover:text-dark"
            : "border-foreground text-foreground hover:bg-foreground hover:text-background"
        }`}
      >
        Zaloguj się
      </Link>
    );
  }

  const { name, email, image } = session.user;
  return <UserDropdown name={name} email={email} image={image ?? null} />;
}

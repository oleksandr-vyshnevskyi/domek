"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { GoogleButton } from "@/features/auth/google-button";
import { AuthDivider } from "@/features/auth/auth-divider";

const errors: Record<string, string> = {
  USER_ALREADY_EXISTS: "Konto z tym adresem e-mail już istnieje.",
  INVALID_EMAIL: "Nieprawidłowy adres e-mail.",
  PASSWORD_TOO_SHORT: "Hasło jest za krótkie (minimum 8 znaków).",
};

export default function RegisterPage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setPending(true);
    const form = new FormData(e.currentTarget);
    const { error } = await authClient.signUp.email({
      name: String(form.get("name")),
      email: String(form.get("email")),
      password: String(form.get("password")),
    });
    setPending(false);
    if (error) {
      setError(errors[error.code ?? ""] ?? "Nie udało się utworzyć konta.");
      return;
    }
    router.push("/");
    router.refresh();
  }

  return (
    <div className="flex flex-col gap-[22px]">
      <h1 className="text-[32px]">Utwórz konto</h1>

      <GoogleButton />

      <AuthDivider>lub e-mailem</AuthDivider>

      <form onSubmit={onSubmit} className="flex flex-col gap-3.5">
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="name">Imię</Label>
          <Input id="name" name="name" autoComplete="given-name" required />
        </div>
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="email">E-mail</Label>
          <Input id="email" name="email" type="email" placeholder="jan@example.com" required />
        </div>
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="password">Hasło</Label>
          <Input id="password" name="password" type="password" minLength={8} required />
          <span className="text-[13px] text-muted-foreground">Minimum 8 znaków</span>
        </div>
        {error && (
          <p role="alert" className="text-sm font-semibold text-destructive">
            {error}
          </p>
        )}
        <Button type="submit" size="lg" disabled={pending} className="mt-1 w-full">
          {pending ? "Tworzenie konta..." : "Zarejestruj się"}
        </Button>
      </form>

      <p className="text-center text-[15px] text-muted-foreground">
        Masz już konto?{" "}
        <Link href="/login" className="font-bold text-foreground hover:text-primary">
          Zaloguj się
        </Link>
      </p>
    </div>
  );
}

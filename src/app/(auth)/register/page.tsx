"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/Button/button";
import { Input } from "@/components/ui/Input/input";
import { Label } from "@/components/ui/Label/label";
import { GoogleButton } from "@/components/google-button";

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
    <form onSubmit={onSubmit} className="mx-auto flex max-w-sm flex-col gap-4 py-16">
      <h1 className="text-2xl font-semibold">Rejestracja</h1>
      <div className="flex flex-col gap-2">
        <Label htmlFor="name">Imię</Label>
        <Input id="name" name="name" required />
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor="email">E-mail</Label>
        <Input id="email" name="email" type="email" required />
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor="password">Hasło</Label>
        <Input id="password" name="password" type="password" minLength={8} required />
      </div>
      {error && <p className="text-sm text-red-600">{error}</p>}
      <Button type="submit" disabled={pending}>
        {pending ? "Tworzenie konta..." : "Zarejestruj się"}
      </Button>
      <div className="flex items-center gap-2 text-xs text-muted-foreground">
        <span className="h-px flex-1 bg-border" />
        lub
        <span className="h-px flex-1 bg-border" />
      </div>
      <GoogleButton />
      <p className="text-sm">
        Masz już konto? <Link href="/login" className="underline">Zaloguj się</Link>
      </p>
    </form>
  );
}
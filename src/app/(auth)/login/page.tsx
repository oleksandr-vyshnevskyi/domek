"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/Button/button";
import { Input } from "@/components/ui/Input/input";
import { Label } from "@/components/ui/Label/label";
import { GoogleButton } from "@/components/google-button";
import { AuthDivider } from "@/components/auth-divider";

const errors: Record<string, string> = {
  INVALID_EMAIL_OR_PASSWORD: "Nieprawidłowy e-mail lub hasło.",
  INVALID_EMAIL: "Nieprawidłowy adres e-mail.",
};

export default function LoginPage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setPending(true);
    const form = new FormData(e.currentTarget);
    const { error } = await authClient.signIn.email({
      email: String(form.get("email")),
      password: String(form.get("password")),
    });
    setPending(false);
    if (error) {
      setError(errors[error.code ?? ""] ?? "Nie udało się zalogować.");
      return;
    }
    router.push("/");
    router.refresh();
  }

  return (
    <div className="flex flex-col gap-[22px]">
      <h1 className="text-[32px]">Zaloguj się</h1>

      <GoogleButton />

      <AuthDivider>lub e-mailem</AuthDivider>

      <form onSubmit={onSubmit} className="flex flex-col gap-3.5">
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="email">E-mail</Label>
          <Input id="email" name="email" type="email" placeholder="jan@example.com" required />
        </div>
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="password">Hasło</Label>
          <Input id="password" name="password" type="password" required />
        </div>
        {error && (
          <p role="alert" className="text-sm font-semibold text-destructive">
            {error}
          </p>
        )}
        <Button type="submit" size="lg" disabled={pending} className="mt-1 w-full">
          {pending ? "Logowanie..." : "Zaloguj się"}
        </Button>
      </form>

      <p className="text-center text-[15px] text-muted-foreground">
        Nie masz konta?{" "}
        <Link href="/register" className="font-bold text-foreground hover:text-primary">
          Zarejestruj się
        </Link>
      </p>
    </div>
  );
}

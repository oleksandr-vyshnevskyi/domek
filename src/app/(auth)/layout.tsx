import Logo from "@/components/ui/Logo/logo";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-1 flex-col lg:flex-row">
      <section className="flex flex-col justify-between gap-8 bg-dark px-6 py-8 text-white sm:px-12 sm:py-10 lg:w-1/2">
        <Logo dark />
        <div className="flex max-w-md flex-col gap-3.5">
          <h2 className="text-3xl leading-tight sm:text-[40px]">
            Twój następny wyjazd zaczyna się tutaj
          </h2>
          <p className="text-[17px] leading-relaxed text-on-dark">
            Zaloguj się, żeby rezerwować noclegi albo zarządzać swoimi ogłoszeniami.
          </p>
        </div>
        <span className="hidden lg:block" />
      </section>

      <section className="flex flex-1 items-center justify-center px-6 py-12">
        <div className="w-full max-w-[420px]">{children}</div>
      </section>
    </div>
  );
}

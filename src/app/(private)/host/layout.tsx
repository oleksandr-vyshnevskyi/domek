import { requireUser } from "@/lib/session";
import { BecomeHost } from "@/features/host/become-host";

export default async function HostLayout({ children }: { children: React.ReactNode }) {
  const user = await requireUser();
  if (!user.isHost) return <BecomeHost />;
  return <>{children}</>;
}

import SiteShell from "@/components/layout/site-shell";

export default function HomeLayout({ children }: { children: React.ReactNode }) {
  return <SiteShell dark>{children}</SiteShell>;
}

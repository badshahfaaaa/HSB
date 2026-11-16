"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/components/AuthProvider";
import { AdminGuard } from "@/components/AdminGuard";

const NAV = [
  { href: "/admin", label: "Properties" },
  { href: "/admin/inquiries", label: "Inquiries" },
  { href: "/admin/team", label: "Team" },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <AdminGuard>
      <AdminShell>{children}</AdminShell>
    </AdminGuard>
  );
}

function AdminShell({ children }: { children: React.ReactNode }) {
  const { signOut } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  const handleSignOut = async () => {
    await signOut();
    router.push("/admin/login");
  };

  return (
    <div className="admin">
      <aside className="admin__sidebar">
        <Link href="/admin" className="admin__brand">
          HSB <span>Admin</span>
        </Link>
        <nav className="admin__nav">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`admin__nav-link${pathname === item.href ? " is-active" : ""}`}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="admin__sidebar-foot">
          <Link href="/" className="admin__site-link">View website →</Link>
          <button onClick={handleSignOut} className="admin__signout">
            Sign out
          </button>
        </div>
      </aside>
      <main className="admin__main">
        {children}
      </main>
    </div>
  );
}

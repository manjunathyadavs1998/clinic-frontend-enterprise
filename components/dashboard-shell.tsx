import Link from "next/link";
import { CalendarRange, ClipboardPlus, FileText, FlaskConical, Home, LayoutDashboard, Stethoscope, Wallet } from "lucide-react";

const navItems = [
  { href: "/", label: "Home", icon: Home },
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/doctors", label: "Doctors", icon: Stethoscope },
  { href: "/consultations", label: "Consultations", icon: ClipboardPlus },
  { href: "/lab-tests", label: "Lab Tests", icon: FlaskConical },
  { href: "/billing", label: "Billing", icon: Wallet },
  { href: "/reports", label: "Reports", icon: FileText }
];

export function DashboardShell({
  title,
  subtitle,
  children
}: {
  title: string;
  subtitle: string;
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-slate-50">
      <div className="grid min-h-screen lg:grid-cols-[280px_1fr]">
        <aside className="border-r border-slate-200 bg-clinic-navy px-5 py-6">
          <div className="rounded-3xl bg-white/10 p-5">
            <p className="text-xl font-black text-white">CareBridge</p>
            <p className="mt-1 text-sm text-white/70">Hospital Operations Suite</p>
          </div>

          <nav className="mt-8 space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className="flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium text-white/80 transition hover:bg-white/10 hover:text-white"
                >
                  <Icon className="h-4 w-4" />
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="mt-10 rounded-3xl bg-gradient-to-br from-brand-500 to-brand-700 p-5 text-white">
            <p className="text-sm font-semibold">Today&apos;s Shift</p>
            <p className="mt-2 text-2xl font-black">8 AM - 8 PM</p>
            <p className="mt-3 text-sm text-white/80">Reception, doctor, lab, and billing modules active.</p>
          </div>
        </aside>

        <main className="p-5 md:p-8">
          <div className="card p-6">
            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand-700">Clinic Management</p>
                <h1 className="mt-2 text-3xl font-black text-clinic-navy">{title}</h1>
                <p className="mt-2 text-slate-600">{subtitle}</p>
              </div>
              <div className="inline-flex items-center gap-2 rounded-2xl bg-slate-50 px-4 py-3 text-sm text-slate-600">
                <CalendarRange className="h-4 w-4" />
                Today&apos;s Operations Overview
              </div>
            </div>
          </div>

          <div className="mt-6">{children}</div>
        </main>
      </div>
    </div>
  );
}

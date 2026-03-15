"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Logo } from "@/components/logo";

const links = [
  { href: "#services", label: "Services" },
  { href: "#dashboard", label: "Dashboard" },
  { href: "#contact", label: "Contact" }
];

export function Navbar() {
  const router = useRouter();
  const [loggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const accessToken = localStorage.getItem("accessToken");
    setLoggedIn(Boolean(accessToken));
    setUsername(localStorage.getItem("username"));

    function handleStorage(event: StorageEvent) {
      if (event.key === "accessToken" || event.key === "username") {
        const token = localStorage.getItem("accessToken");
        setLoggedIn(Boolean(token));
        setUsername(localStorage.getItem("username"));
      }
    }

    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  async function handleLogout() {
    setBusy(true);

    const token = typeof window !== "undefined" ? localStorage.getItem("accessToken") : null;

    try {
      if (token) {
        await fetch("http://localhost:8080/api/v1/auth/logout", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      }
    } catch {
      // ignore network errors; still clear local state
    } finally {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("username");
      localStorage.removeItem("roles");
      localStorage.removeItem("availableDoctors");
      localStorage.removeItem("selectedDoctorId");
      setLoggedIn(false);
      setUsername(null);
      setBusy(false);
      router.push("/login");
    }
  }

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-clinic-navy/90 backdrop-blur">
      <div className="container-app flex h-20 items-center justify-between">
        <Logo />
        <nav className="hidden items-center gap-8 md:flex">
          {links.map((link) => (
            <Link key={link.label} href={link.href} className="text-sm font-medium text-white/80 transition hover:text-white">
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          {loggedIn ? (
            <button
              type="button"
              onClick={handleLogout}
              disabled={busy}
              className="hidden items-center justify-center rounded-2xl border border-white/20 px-4 py-2 text-sm font-medium text-white/80 transition hover:text-white md:inline-flex"
            >
              <span className="mr-2 h-6 w-6 rounded-full bg-white/10 text-center text-xs font-bold leading-6 text-white">
                {username ? username.charAt(0).toUpperCase() : "U"}
              </span>
              Logout
            </button>
          ) : (
            <Link
              href="/login"
              className="hidden rounded-2xl border border-white/20 px-4 py-2 text-sm font-medium text-white md:inline-flex"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}

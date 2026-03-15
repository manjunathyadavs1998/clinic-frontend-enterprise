"use client";

import Image from "next/image";
import Link from "next/link";
import { CalendarCheck2, ShieldCheck, Stethoscope, WalletCards } from "lucide-react";
import { stats } from "@/lib/data";
import { MouseEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { doctors } from "@/lib/doctors";

const highlights = [
  { icon: CalendarCheck2, label: "Quick Appointment Scheduling" },
  { icon: Stethoscope, label: "Doctor & Consultation Tracking" },
  { icon: WalletCards, label: "Simple Billing and Payment Status" },
  { icon: ShieldCheck, label: "Secure Role Based Access" }
];

export function Hero() {
  const router = useRouter();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % doctors.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const doctor = doctors[index];

  function handleLaunchDashboard(event: MouseEvent<HTMLAnchorElement>) {
    const accessToken = typeof window !== "undefined" ? localStorage.getItem("accessToken") : null;
    if (!accessToken) {
      event.preventDefault();
      router.push("/login");
    }
  }

  return (
    <section className="bg-hero">
      <div className="container-app grid gap-10 py-16 lg:grid-cols-[1.15fr_0.85fr] lg:py-24">
        <div className="flex flex-col justify-center">
          <span className="badge w-fit bg-white/10 text-white">
            Modern Digital Care Experience
          </span>

          <h1 className="mt-6 max-w-3xl text-4xl font-black leading-tight text-white sm:text-5xl lg:text-6xl">
            Welcome to Srinivas Clinic, Mulbagal&apos;s Best Hospital
          </h1>

          <p className="mt-5 max-w-2xl text-base leading-7 text-white/80 sm:text-lg">
            Providing compassionate care, experienced doctors, and modern medical services
            for individuals and families. Your health and well-being are our highest priority.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/dashboard"
              className="btn-primary bg-white text-clinic-navy hover:bg-slate-100"
              onClick={handleLaunchDashboard}
            >
              Launch Dashboard
            </Link>

            <Link
              href="#services"
              className="btn-secondary border-white/20 bg-white/10 text-white hover:bg-white/15"
            >
              Explore Features
            </Link>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            {highlights.map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.label}
                  className="rounded-3xl border border-white/10 bg-white/10 p-4 backdrop-blur-sm"
                >
                  <div className="flex items-center gap-3">
                    <div className="rounded-2xl bg-white/10 p-3">
                      <Icon className="h-5 w-5 text-white" />
                    </div>
                    <p className="text-sm font-medium text-white">{item.label}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="relative">
          <div className="card overflow-hidden rounded-[2rem] border-0">
            <div className="relative flex min-h-[440px] flex-col items-center justify-center bg-clinic-sky px-6 py-10 sm:px-10">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-700">
                Meet Our Team
              </p>

              <div className="relative mt-6 h-40 w-40 overflow-hidden rounded-full shadow-lg ring-4 ring-white/70">
                <Image
                  src={doctor.image}
                  alt={doctor.name}
                  fill
                  className="object-cover"
                  priority
                />
              </div>

              <div className="mt-6 w-full max-w-[320px] text-center">
                <h3 className="text-2xl font-bold leading-snug text-clinic-navy break-normal whitespace-normal">
                  {doctor.name}
                </h3>

                <p className="mt-2 text-base font-semibold text-brand-600 break-normal whitespace-normal">
                  {doctor.specialization}
                </p>
              </div>
            </div>
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {stats.map((item) => (
              <div
                key={item.label}
                className="rounded-3xl border border-white/10 bg-white/10 p-5 backdrop-blur"
              >
                <p className="text-3xl font-black text-white">{item.value}</p>
                <p className="mt-1 text-sm text-white/75">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
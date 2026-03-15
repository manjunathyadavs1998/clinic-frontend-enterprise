"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { DashboardShell } from "@/components/dashboard-shell";
import { billingItems, consultations, stats } from "@/lib/data";
import { useAvailableDoctors } from "@/lib/hooks/useAvailableDoctors";

export default function DashboardPage() {
  const router = useRouter();
  const { doctors, loading: doctorsLoading } = useAvailableDoctors();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) {
      router.replace("/login");
      return;
    }

    setReady(true);
  }, [router]);

  if (!ready) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-sm text-slate-500">Checking credentials…</p>
      </div>
    );
  }

  const statsWithDoctors = stats.map((item) =>
    item.label === "Doctors Available"
      ? { ...item, value: doctors.length.toString() }
      : item
  );

  return (
    <DashboardShell
      title="Operations Dashboard"
      subtitle="Track appointments, available doctors, lab requests, and billing from one place."
    >
      <div className="grid gap-6 xl:grid-cols-[1fr_360px]">
        <div className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {statsWithDoctors.map((stat) => (
              <div key={stat.label} className="card p-5">
                <p className="text-sm text-slate-500">{stat.label}</p>
                <p className="mt-3 text-3xl font-black text-clinic-navy">
                  {stat.label === "Doctors Available" && doctorsLoading ? "…" : stat.value}
                </p>
              </div>
            ))}
          </div>

          <div className="card p-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-clinic-navy">Consultation Queue</h2>
              <button className="btn-primary px-4 py-2">Create Record</button>
            </div>
            <div className="mt-6 overflow-x-auto">
              <table className="min-w-full text-left text-sm">
                <thead className="border-b border-slate-100 text-slate-500">
                  <tr>
                    <th className="pb-3 font-medium">Consultation</th>
                    <th className="pb-3 font-medium">Patient</th>
                    <th className="pb-3 font-medium">Doctor</th>
                    <th className="pb-3 font-medium">Symptoms</th>
                    <th className="pb-3 font-medium">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {consultations.map((item) => (
                    <tr key={item.id} className="border-b border-slate-100">
                      <td className="py-4 font-semibold text-clinic-navy">{item.id}</td>
                      <td className="py-4">
                        <p className="font-medium">{item.patient}</p>
                        <p className="text-xs text-slate-500">{item.phone}</p>
                      </td>
                      <td className="py-4">{item.doctor}</td>
                      <td className="py-4">{item.symptoms}</td>
                      <td className="py-4">
                        <span className="rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold text-brand-700">{item.status}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="card p-6">
            <h2 className="text-xl font-bold text-clinic-navy">Available Doctors</h2>
            <div className="mt-5 space-y-4">
              {doctors.length === 0 ? (
                <p className="text-sm text-slate-500">{doctorsLoading ? "Loading doctors…" : "No doctors available."}</p>
              ) : (
                doctors.map((doctor) => (
                  <div key={doctor.id} className="rounded-2xl bg-slate-50 p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-semibold text-clinic-navy">{doctor.fullName}</p>
                        <p className="text-sm text-slate-500">{doctor.specialization}</p>
                      </div>
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-semibold ${
                          doctor.available ? "bg-emerald-50 text-emerald-700" : "bg-slate-100 text-slate-500"
                        }`}
                      >
                        {doctor.available ? "Available" : "Unavailable"}
                      </span>
                    </div>
                    <div className="mt-3 flex items-center justify-between text-sm text-slate-500">
                      <span>Room {doctor.roomNumber}</span>
                      <span>₹{doctor.consultationFee}</span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="card p-6">
            <h2 className="text-xl font-bold text-clinic-navy">Billing Snapshot</h2>
            <div className="mt-5 space-y-3">
              {billingItems.map((bill) => (
                <div key={bill.id} className="rounded-2xl border border-slate-100 p-4">
                  <div className="flex items-center justify-between">
                    <p className="font-semibold text-clinic-navy">{bill.patient}</p>
                    <p className="font-bold text-brand-700">{bill.total}</p>
                  </div>
                  <p className="mt-2 text-sm text-slate-500">{bill.id} · {bill.status}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </DashboardShell>
  );
}

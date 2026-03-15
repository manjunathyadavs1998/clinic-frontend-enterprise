"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { DashboardShell } from "@/components/dashboard-shell";

type Doctor = {
  id: number;
  fullName: string;
  username: string;
  specialization: string;
  consultationFee: number;
  available: boolean;
  roomNumber: string;
};

export default function DoctorsPage() {
  const router = useRouter();
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const accessToken = typeof window !== "undefined" ? localStorage.getItem("accessToken") : null;
    if (!accessToken) {
      router.replace("/login");
      return;
    }

    async function loadDoctors() {
      setLoading(true);
      setError(null);

      try {
        const res = await fetch("http://localhost:8080/api/v1/doctors", {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        if (!res.ok) {
          const text = await res.text();
          throw new Error(text || res.statusText);
        }

        const data = (await res.json()) as Doctor[];
        setDoctors(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : String(err));
      } finally {
        setLoading(false);
      }
    }

    loadDoctors();
  }, [router]);

  function handleSelectDoctor(doctorId: number) {
    localStorage.setItem("selectedDoctorId", String(doctorId));
    // keep the user on the page for now; other flows can read this value when creating a consultation
  }

  return (
    <DashboardShell
      title="Doctors"
      subtitle="Manage doctor availability, consultation fees, specialization, and room assignments."
    >
      <div className="card p-6">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl font-bold text-clinic-navy">Doctor Directory</h2>
          <button className="btn-primary px-4 py-2">Add Doctor</button>
        </div>

        {loading ? (
          <p className="text-sm text-slate-500">Loading doctors…</p>
        ) : error ? (
          <p className="text-sm text-red-600">{error}</p>
        ) : (
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {doctors.map((doctor) => (
              <div key={doctor.id} className="rounded-3xl border border-slate-100 p-5">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-lg font-bold text-clinic-navy">{doctor.fullName}</h3>
                    <p className="text-sm text-slate-500">{doctor.specialization}</p>
                  </div>
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${
                      doctor.available
                        ? "bg-emerald-50 text-emerald-700"
                        : "bg-rose-50 text-rose-700"
                    }`}
                  >
                    {doctor.available ? "Available" : "Unavailable"}
                  </span>
                </div>
                <div className="mt-5 space-y-2 text-sm text-slate-600">
                  <p>Room: {doctor.roomNumber || "—"}</p>
                  <p>Consultation Fee: ₹{doctor.consultationFee}</p>
                </div>

                <div className="mt-6 flex gap-3">
                  <button
                    className="btn-secondary flex-1 px-4 py-2"
                    onClick={() => handleSelectDoctor(doctor.id)}
                  >
                    Select
                  </button>
                  <button className="btn-primary flex-1 px-4 py-2" disabled={!doctor.available}>
                    {doctor.available ? "Book" : "Not Available"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </DashboardShell>
  );
}

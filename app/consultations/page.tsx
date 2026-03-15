"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import { DashboardShell } from "@/components/dashboard-shell";
import { useAvailableDoctors, AvailableDoctor } from "@/lib/hooks/useAvailableDoctors";

type ConsultationRecord = {
  id: number;
  patientName: string;
  patientPhone: string;
  symptoms: string;
  doctorId: number;
  doctorName: string;
  consultationFee: number;
  status: string;
  doctorNotes: string | null;
  scheduledAt: string;
  createdBy: string;
};

export default function ConsultationsPage() {
  const { doctors, loading: doctorsLoading, error: doctorsError, refresh: refreshDoctors } = useAvailableDoctors();
  const [patientName, setPatientName] = useState("");
  const [phone, setPhone] = useState("");
  const [symptoms, setSymptoms] = useState("");
  const [selectedDoctorId, setSelectedDoctorId] = useState<number | "">("");
  const [scheduledAt, setScheduledAt] = useState("");
  const [notes, setNotes] = useState<string | null>(null);
  const [records, setRecords] = useState<ConsultationRecord[]>([]);
  const [creating, setCreating] = useState(false);
  const [loadingRecords, setLoadingRecords] = useState(true);
  const [recordsError, setRecordsError] = useState<string | null>(null);

  const selectedDoctor = useMemo<AvailableDoctor | undefined>(() => {
    return doctors.find((d) => d.id === selectedDoctorId);
  }, [doctors, selectedDoctorId]);

  async function fetchConsultations() {
    const token = typeof window !== "undefined" ? localStorage.getItem("accessToken") : null;
    if (!token) {
      setRecordsError("You must be logged in to view consultations.");
      setLoadingRecords(false);
      return;
    }

    setLoadingRecords(true);
    setRecordsError(null);

    try {
      const res = await fetch("http://localhost:8080/api/v1/consultations", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || res.statusText);
      }

      const data = (await res.json()) as ConsultationRecord[];
      setRecords(data);
    } catch (err) {
      setRecordsError(err instanceof Error ? err.message : String(err));
    } finally {
      setLoadingRecords(false);
    }
  }

  async function handleCreateConsultation(event: FormEvent) {
    event.preventDefault();

    if (!selectedDoctorId) {
      setNotes("Please select a doctor.");
      return;
    }

    const token = typeof window !== "undefined" ? localStorage.getItem("accessToken") : null;
    if (!token) {
      setNotes("You must be logged in to create a consultation.");
      return;
    }

    setCreating(true);
    setNotes(null);

    const payload = {
      patientName,
      patientPhone: phone,
      symptoms,
      doctorId: selectedDoctorId,
      scheduledAt,
    };

    try {
      const res = await fetch("http://localhost:8080/api/v1/consultations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || res.statusText);
      }

      const created = (await res.json()) as ConsultationRecord;
      setRecords((prev) => [created, ...prev]);
      setPatientName("");
      setPhone("");
      setSymptoms("");
      setSelectedDoctorId("");
      setScheduledAt("");
      setNotes("Consultation created successfully.");
      await refreshDoctors();
    } catch (err) {
      setNotes(err instanceof Error ? err.message : String(err));
    } finally {
      setCreating(false);
    }
  }

  useEffect(() => {
    const storedDoctorId = typeof window !== "undefined" ? localStorage.getItem("selectedDoctorId") : null;
    if (storedDoctorId) {
      setSelectedDoctorId(Number(storedDoctorId));
    }

    void fetchConsultations();
  }, []);

  useEffect(() => {
    if (selectedDoctorId) {
      localStorage.setItem("selectedDoctorId", String(selectedDoctorId));
      return;
    }

    localStorage.removeItem("selectedDoctorId");
  }, [selectedDoctorId]);

  useEffect(() => {
    if (!notes) return;

    const timer = window.setTimeout(() => {
      setNotes(null);
    }, 1000);

    return () => {
      window.clearTimeout(timer);
    };
  }, [notes]);

  return (
    <DashboardShell
      title="Consultations"
      subtitle="Create consultation records for walk-in patients, assign doctors, and update statuses."
    >
      <div className="grid gap-6 xl:grid-cols-[420px_1fr]">
        <div className="card p-6">
          <h2 className="text-xl font-bold text-clinic-navy">Create Consultation</h2>
          <form className="mt-6 space-y-4" onSubmit={handleCreateConsultation}>
            <input
              value={patientName}
              onChange={(event) => setPatientName(event.target.value)}
              className="w-full rounded-2xl border border-slate-200 px-4 py-3"
              placeholder="Patient name"
            />
            <input
              value={phone}
              onChange={(event) => setPhone(event.target.value)}
              className="w-full rounded-2xl border border-slate-200 px-4 py-3"
              placeholder="Phone number"
            />
            <textarea
              value={symptoms}
              onChange={(event) => setSymptoms(event.target.value)}
              className="h-28 w-full rounded-2xl border border-slate-200 px-4 py-3"
              placeholder="Symptoms / health problem"
            />
            <select
              value={selectedDoctorId}
              onChange={(event) => setSelectedDoctorId(Number(event.target.value) || "")}
              className="w-full rounded-2xl border border-slate-200 px-4 py-3"
            >
              <option value="">Select doctor</option>
              {doctors.map((doctor) => (
                <option key={doctor.id} value={doctor.id}>
                  {doctor.fullName} ({doctor.specialization})
                </option>
              ))}
            </select>
            <input
              type="datetime-local"
              value={scheduledAt}
              onChange={(event) => setScheduledAt(event.target.value)}
              className="w-full rounded-2xl border border-slate-200 px-4 py-3"
            />

            {notes ? <p className="text-sm text-rose-600">{notes}</p> : null}

            <button type="submit" className="btn-primary w-full" disabled={creating}>
              {creating ? "Creating…" : "Create Consultation"}
            </button>
          </form>

          {doctorsError ? (
            <p className="mt-4 text-sm text-rose-600">Error loading doctors: {doctorsError}</p>
          ) : null}
        </div>

        <div className="card p-6">
          <h2 className="text-xl font-bold text-clinic-navy">Consultation Records</h2>
          <div className="mt-6 overflow-x-auto">
            {loadingRecords ? (
              <p className="text-sm text-slate-500">Loading consultation records…</p>
            ) : recordsError ? (
              <p className="text-sm text-rose-600">{recordsError}</p>
            ) : (
              <table className="min-w-full text-left text-sm">
                <thead className="border-b border-slate-100 text-slate-500">
                  <tr>
                    <th className="pb-3 font-medium">ID</th>
                    <th className="pb-3 font-medium">Patient</th>
                    <th className="pb-3 font-medium">Doctor</th>
                    <th className="pb-3 font-medium">Time</th>
                    <th className="pb-3 font-medium">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {records.map((item) => (
                    <tr key={item.id} className="border-b border-slate-100">
                      <td className="py-4 font-semibold text-clinic-navy">{item.id}</td>
                      <td className="py-4">{item.patientName}</td>
                      <td className="py-4">{item.doctorName}</td>
                      <td className="py-4">{item.scheduledAt}</td>
                      <td className="py-4">
                        <span className="rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold text-brand-700">
                          {item.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </DashboardShell>
  );
}

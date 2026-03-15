"use client";

import { useEffect, useState } from "react";

export type AvailableDoctor = {
  id: number;
  fullName: string;
  username: string;
  specialization: string;
  consultationFee: number;
  available: boolean;
  roomNumber: string;
};

export function useAvailableDoctors() {
  const [doctors, setDoctors] = useState<AvailableDoctor[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function fetchDoctors() {
    if (typeof window === "undefined") return;
    const token = localStorage.getItem("accessToken");
    if (!token) {
      setError("Not authenticated");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const res = await fetch("http://15.207.107.248:8080/api/v1/doctors/available", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || res.statusText);
      }

      const data = (await res.json()) as AvailableDoctor[];
      setDoctors(data);
      localStorage.setItem("availableDoctors", JSON.stringify(data));
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    const cached = typeof window !== "undefined" ? localStorage.getItem("availableDoctors") : null;
    if (cached) {
      try {
        setDoctors(JSON.parse(cached));
      } catch {
        // ignore invalid cache
      }
    }

    void fetchDoctors();
  }, []);

  return { doctors, loading, error, refresh: fetchDoctors };
}

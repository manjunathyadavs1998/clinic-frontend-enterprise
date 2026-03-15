import { billingItems, consultations, doctors } from "@/lib/data";

export function DashboardPreview() {
  return (
    <section id="dashboard" className="bg-white py-16 lg:py-24">
      <div className="container-app">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <span className="badge">Operational preview</span>
            <h2 className="mt-4 text-3xl font-black text-clinic-navy sm:text-4xl">A polished dashboard experience for your team.</h2>
            <p className="mt-3 max-w-2xl text-slate-600">
              Reception, doctor coordination, and billing modules are arranged in a clean admin-style layout with cards, tables, and action areas.
            </p>
          </div>
        </div>

        <div className="mt-10 grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
          <div className="card p-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-clinic-navy">Today&apos;s Consultations</h3>
              <button className="btn-primary px-4 py-2">New Consultation</button>
            </div>
            <div className="mt-6 overflow-x-auto">
              <table className="min-w-full text-left text-sm">
                <thead className="text-slate-500">
                  <tr className="border-b border-slate-100">
                    <th className="pb-3 font-medium">ID</th>
                    <th className="pb-3 font-medium">Patient</th>
                    <th className="pb-3 font-medium">Doctor</th>
                    <th className="pb-3 font-medium">Time</th>
                    <th className="pb-3 font-medium">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {consultations.map((row) => (
                    <tr key={row.id} className="border-b border-slate-100">
                      <td className="py-4 font-semibold text-clinic-navy">{row.id}</td>
                      <td className="py-4">
                        <p className="font-medium">{row.patient}</p>
                        <p className="text-xs text-slate-500">{row.phone}</p>
                      </td>
                      <td className="py-4">{row.doctor}</td>
                      <td className="py-4">{row.time}</td>
                      <td className="py-4">
                        <span className="rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold text-brand-700">{row.status}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="grid gap-6">
            <div className="card p-6">
              <h3 className="text-lg font-bold text-clinic-navy">Available Doctors</h3>
              <div className="mt-5 space-y-4">
                {doctors.map((doctor) => (
                  <div key={doctor.id} className="flex items-center justify-between rounded-2xl bg-slate-50 p-4">
                    <div>
                      <p className="font-semibold text-clinic-navy">{doctor.name}</p>
                      <p className="text-sm text-slate-500">{doctor.specialty} · Room {doctor.room}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-brand-700">{doctor.fee}</p>
                      <p className="text-xs text-slate-500">{doctor.status}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="card p-6">
              <h3 className="text-lg font-bold text-clinic-navy">Recent Billing</h3>
              <div className="mt-5 space-y-3">
                {billingItems.map((bill) => (
                  <div key={bill.id} className="rounded-2xl border border-slate-100 p-4">
                    <div className="flex items-center justify-between">
                      <p className="font-semibold text-clinic-navy">{bill.patient}</p>
                      <span className="text-sm font-semibold text-brand-700">{bill.total}</span>
                    </div>
                    <div className="mt-2 flex items-center justify-between text-sm text-slate-500">
                      <span>{bill.id}</span>
                      <span>{bill.status}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

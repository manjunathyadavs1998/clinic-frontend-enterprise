import { DashboardShell } from "@/components/dashboard-shell";

const tests = [
  { id: "T-301", name: "Blood Test", cost: "₹500", status: "Ordered" },
  { id: "T-302", name: "X-Ray", cost: "₹800", status: "Completed" },
  { id: "T-303", name: "ECG", cost: "₹600", status: "In Progress" }
];

export default function LabTestsPage() {
  return (
    <DashboardShell
      title="Lab Tests"
      subtitle="Capture optional test orders suggested by doctors and track their processing status."
    >
      <div className="grid gap-6 xl:grid-cols-[420px_1fr]">
        <div className="card p-6">
          <h2 className="text-xl font-bold text-clinic-navy">Create Lab Entry</h2>
          <div className="mt-6 space-y-4">
            <input className="w-full rounded-2xl border border-slate-200 px-4 py-3" placeholder="Consultation ID" />
            <select className="w-full rounded-2xl border border-slate-200 px-4 py-3">
              <option>Select test</option>
              <option>Blood Test</option>
              <option>X-Ray</option>
              <option>ECG</option>
            </select>
            <select className="w-full rounded-2xl border border-slate-200 px-4 py-3">
              <option>Status</option>
              <option>Ordered</option>
              <option>In Progress</option>
              <option>Completed</option>
            </select>
            <button className="btn-primary w-full">Save Test Record</button>
          </div>
        </div>

        <div className="card p-6">
          <h2 className="text-xl font-bold text-clinic-navy">Lab Status Table</h2>
          <div className="mt-6 overflow-x-auto">
            <table className="min-w-full text-left text-sm">
              <thead className="border-b border-slate-100 text-slate-500">
                <tr>
                  <th className="pb-3 font-medium">Test ID</th>
                  <th className="pb-3 font-medium">Test Name</th>
                  <th className="pb-3 font-medium">Cost</th>
                  <th className="pb-3 font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {tests.map((test) => (
                  <tr key={test.id} className="border-b border-slate-100">
                    <td className="py-4 font-semibold text-clinic-navy">{test.id}</td>
                    <td className="py-4">{test.name}</td>
                    <td className="py-4">{test.cost}</td>
                    <td className="py-4">
                      <span className="rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold text-brand-700">{test.status}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </DashboardShell>
  );
}

import { DashboardShell } from "@/components/dashboard-shell";
import { billingItems } from "@/lib/data";

export default function BillingPage() {
  return (
    <DashboardShell
      title="Billing"
      subtitle="Generate total bill from consultation fee and selected tests, then update payment status."
    >
      <div className="grid gap-6 xl:grid-cols-[420px_1fr]">
        <div className="card p-6">
          <h2 className="text-xl font-bold text-clinic-navy">Generate Bill</h2>
          <div className="mt-6 space-y-4">
            <input className="w-full rounded-2xl border border-slate-200 px-4 py-3" placeholder="Consultation ID" />
            <input className="w-full rounded-2xl border border-slate-200 px-4 py-3" placeholder="Consultation fee" />
            <input className="w-full rounded-2xl border border-slate-200 px-4 py-3" placeholder="Test total" />
            <select className="w-full rounded-2xl border border-slate-200 px-4 py-3">
              <option>Payment status</option>
              <option>Pending</option>
              <option>Paid</option>
              <option>Cancelled</option>
            </select>
            <button className="btn-primary w-full">Generate Bill</button>
          </div>
        </div>

        <div className="card p-6">
          <h2 className="text-xl font-bold text-clinic-navy">Billing Records</h2>
          <div className="mt-6 overflow-x-auto">
            <table className="min-w-full text-left text-sm">
              <thead className="border-b border-slate-100 text-slate-500">
                <tr>
                  <th className="pb-3 font-medium">Bill ID</th>
                  <th className="pb-3 font-medium">Patient</th>
                  <th className="pb-3 font-medium">Consultation</th>
                  <th className="pb-3 font-medium">Tests</th>
                  <th className="pb-3 font-medium">Total</th>
                  <th className="pb-3 font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {billingItems.map((bill) => (
                  <tr key={bill.id} className="border-b border-slate-100">
                    <td className="py-4 font-semibold text-clinic-navy">{bill.id}</td>
                    <td className="py-4">{bill.patient}</td>
                    <td className="py-4">{bill.consultation}</td>
                    <td className="py-4">{bill.tests}</td>
                    <td className="py-4 font-semibold">{bill.total}</td>
                    <td className="py-4">
                      <span className="rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold text-brand-700">{bill.status}</span>
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

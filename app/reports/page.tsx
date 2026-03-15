import { DashboardShell } from "@/components/dashboard-shell";

const reportCards = [
  { title: "Daily Consultation Trend", value: "128 visits", note: "Higher than yesterday by 12%" },
  { title: "Average Consultation Fee", value: "₹420", note: "Across all active doctors" },
  { title: "Lab Conversion Rate", value: "38%", note: "Patients who opted for tests" },
  { title: "Pending Payments", value: "₹14,700", note: "Awaiting collection at reception" }
];

export default function ReportsPage() {
  return (
    <DashboardShell
      title="Reports"
      subtitle="Simple reporting cards for admin and operations teams."
    >
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {reportCards.map((card) => (
          <div key={card.title} className="card p-6">
            <p className="text-sm text-slate-500">{card.title}</p>
            <p className="mt-4 text-3xl font-black text-clinic-navy">{card.value}</p>
            <p className="mt-3 text-sm text-slate-500">{card.note}</p>
          </div>
        ))}
      </div>
    </DashboardShell>
  );
}

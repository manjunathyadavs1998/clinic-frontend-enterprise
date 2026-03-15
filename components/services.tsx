import { services } from "@/lib/data";
import { Activity, ClipboardList, FlaskConical, UserCog } from "lucide-react";

const icons = [Activity, ClipboardList, FlaskConical, UserCog];

export function Services() {
  return (
    <section id="services" className="container-app py-16 lg:py-24">
     <div className="mx-auto max-w-2xl text-center">
  <span className="badge">Our Care</span>

  <h2 className="mt-4 text-3xl font-black text-clinic-navy sm:text-4xl">
    Quality medical care delivered with compassion.
  </h2>

  <p className="mt-4 text-slate-600">
    Our clinic offers expert consultations, health screenings, diagnostic tests,
    and personalized treatment plans to ensure the best care for every patient.
  </p>
</div>

      <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {services.map((service, index) => {
          const Icon = icons[index];
          return (
            <div key={service.title} className="card p-6">
              <div className="inline-flex rounded-2xl bg-brand-50 p-3 text-brand-600">
                <Icon className="h-6 w-6" />
              </div>
              <h3 className="mt-5 text-xl font-bold text-clinic-navy">{service.title}</h3>
              <p className="mt-3 text-sm leading-6 text-slate-600">{service.description}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}

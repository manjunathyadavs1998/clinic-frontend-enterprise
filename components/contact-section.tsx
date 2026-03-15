import { Phone, Mail, MapPin } from "lucide-react";

export function ContactSection() {
  return (
    <section id="contact" className="bg-slate-50 py-20">
      <div className="container-app">

        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-clinic-navy">
            Contact Srinivas Clinic
          </h2>
          <p className="mt-2 text-slate-600">
            We are here to help you with the best healthcare services.
          </p>
        </div>

        <div className="grid gap-10 lg:grid-cols-2">

          {/* CONTACT INFO */}
          <div className="space-y-6">

            <div className="flex items-center gap-4 rounded-2xl bg-white p-5 shadow">
              <Phone className="h-6 w-6 text-brand-600" />
              <div>
                <p className="font-semibold text-clinic-navy">Phone</p>
                <p className="text-slate-600">+91 98765 43210</p>
              </div>
            </div>

            <div className="flex items-center gap-4 rounded-2xl bg-white p-5 shadow">
              <Mail className="h-6 w-6 text-brand-600" />
              <div>
                <p className="font-semibold text-clinic-navy">Email</p>
                <p className="text-slate-600">srinivasclinic@gmail.com</p>
              </div>
            </div>

            <div className="flex items-center gap-4 rounded-2xl bg-white p-5 shadow">
              <MapPin className="h-6 w-6 text-brand-600" />
              <div>
                <p className="font-semibold text-clinic-navy">Address</p>
                <p className="text-slate-600">
                  Srinivas Clinic<br />
                  Mulbagal, Kolar District<br />
                  Karnataka, India
                </p>
              </div>
            </div>

          </div>

          {/* GOOGLE MAP */}
          <div className="overflow-hidden rounded-3xl shadow-lg">
            <iframe
              src="https://maps.google.com/maps?q=mulbagal%20karnataka&t=&z=13&ie=UTF8&iwloc=&output=embed"
              width="100%"
              height="350"
              loading="lazy"
              className="border-0"
            />
          </div>

        </div>

      </div>
    </section>
  );
}
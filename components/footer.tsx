import { Logo } from "@/components/logo";

export function Footer() {
  return (
    <footer id="contact" className="border-t border-slate-200 bg-slate-100 py-10">
      <div className="container-app flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <Logo dark />
        <div className="text-sm text-slate-500">
          <p>CareBridge Clinic Management UI</p>
          <p className="mt-1">Built with Next.js, React, and Tailwind CSS.</p>
        </div>
      </div>
    </footer>
  );
}

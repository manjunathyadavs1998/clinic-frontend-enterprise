import Image from "next/image";
import Link from "next/link";

export function Logo({ dark = false }: { dark?: boolean }) {
  return (
    <Link href="/" className="flex items-center gap-3">
      <div className="relative h-11 w-11 overflow-hidden rounded-2xl bg-white/10 ring-1 ring-white/20">
        <Image src="/hospital-logo.svg" alt="Hospital logo" fill className="object-cover" />
      </div>
      <div>
        <p className={`text-lg font-bold ${dark ? "text-clinic-navy" : "text-white"}`}>Srinivas Clinic</p>
        <p className={`text-xs ${dark ? "text-slate-500" : "text-white/70"}`}>Health is non profitable</p>
      </div>
    </Link>
  );
}

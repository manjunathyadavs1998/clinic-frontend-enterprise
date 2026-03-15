import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Srinivas Clinic",
  description: "Beautiful hospital frontend built with Next.js, React, and Tailwind CSS."
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

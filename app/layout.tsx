// app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";
import { ToastProvider } from "@/components/use-toast";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Guru Dental Clinic",
  description: "Dental Clinic Information Portal",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">
        <ToastProvider />
        {/* Header */}
        <header className="bg-blue-600 text-white p-4 shadow-md">
          <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center">
            <Link href={"/"} className="text-xl font-bold">
              Guru Dental Clinic
            </Link>
            <div className="text-sm">
              Dr. Love Preet Singh <br /> BDS (General Dentist)
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="w-full md:flex-grow max-w-6xl mx-auto p-6">
          {children}
        </main>

        {/* Footer */}
        <footer className="bg-gray-800 text-white p-4 mt-6">
          <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center text-sm">
            <span>© 2025 Guru Dental Clinic</span>
            <div>Contact: +91 | Email: guruclinic@example.com</div>
          </div>
        </footer>
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import "./globals.css";
import { ToastProvider } from "@/components/use-toast";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PinForm from "@/components/Pin";
import { cookies } from "next/headers";

export const metadata: Metadata = {
  title: "Guru Dental Clinic",
  description: "Dental Clinic Information Portal",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pinSuccess = cookies().get("daily_pin")?.value === new Date().toISOString().split("T")[0];
console.log("pinSuccess", pinSuccess)
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col w-full ">
        <ToastProvider />
        <PinForm open={!pinSuccess} />
        {/* Header */}
        <Header />

        {/* Page Content */}
        <main className="w-full flex-grow max-w-6xl mx-auto p-3 md:p-6">
          {children}
        </main>

        {/* Footer */}
        <Footer />
      </body>
    </html>
  );
}

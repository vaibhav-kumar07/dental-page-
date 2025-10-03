import type { Metadata } from "next";
import "./globals.css";
import { ToastProvider } from "@/components/use-toast";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

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
      <body className="min-h-screen flex flex-col w-full ">
        <ToastProvider />

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

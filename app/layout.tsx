import type { Metadata } from "next";
import "./globals.css";
import ClientBody from "./ClientBody";
import Script from "next/script";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import ChatWidget from "@/app/components/ChatWidget";

export const metadata: Metadata = {
  title: "VisaBits Consultants - Expert Visa Services for Schengen & European Travel",
  description:
    "Professional visa consultancy for Schengen and European destinations from the UK. We handle everything from documentation to flight bookings. Book your free consultation today.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body suppressHydrationWarning className="antialiased">
        <ClientBody>
          <Navigation />
          {children}
          <Footer />
        </ClientBody>
        <ChatWidget />
      </body>
    </html>
  );
}
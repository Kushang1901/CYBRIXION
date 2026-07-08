import type { Metadata } from "next";
import { Inter, Manrope } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "CYBRIXON | Cybersecurity Internship & Learning Platform",
  description: "Accelerate your career with structured, concept-first cybersecurity internships, real defensive projects, and verifiable digital credentials.",
  keywords: ["Cybersecurity", "Internship", "SOC Analyst", "VAPT", "GRC", "Learning Platform", "Ethical Hacking"],
  openGraph: {
    title: "CYBRIXON | Cybersecurity Internship & Learning Platform",
    description: "Build real cybersecurity skills with our structured, concept-first learning paths, practical assignments, and verified certificates.",
    type: "website",
    locale: "en_US",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${manrope.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#F7F9FC] text-[#0F172A]">
        {children}
      </body>
    </html>
  );
}

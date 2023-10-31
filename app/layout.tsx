import { Toaster } from "@/components/ui/toaster";
import "./globals.css";

export const metadata = {
  title: "Haikoo - Twitter clone, but Haikus only",
  description: "Twitter clone, but Haikus only",
};

import { Rubik } from "next/font/google";

const rubik = Rubik({
  variable: "--font-rubik",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <main
          className={`dark flex min-h-screen flex-col items-center bg-background ${rubik.variable} font-sans`}
        >
          {children}
          <Toaster />
        </main>
      </body>
    </html>
  );
}

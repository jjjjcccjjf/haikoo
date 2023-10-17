import "./globals.css";

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
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
          className={`_NO:bg-background flex min-h-screen flex-col items-center bg-orange-100 ${rubik.variable} font-rubik`}
        >
          {children}
        </main>
      </body>
    </html>
  );
}

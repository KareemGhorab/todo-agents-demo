import type { Metadata } from "next";
import { Neucha } from "next/font/google";
import clsx from "clsx";

import "./globals.css";

const neucha = Neucha({ weight: ["400"], subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Sooshial TODO",
  description: "A minimal TODO list app themed after Sooshial Medea",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <div className={clsx(neucha.className, "text-primary-400")}>
          {children}
        </div>
      </body>
    </html>
  );
}

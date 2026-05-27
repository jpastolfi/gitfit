import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "GitFit · Squat Quiz Challenge",
  description: "Acerta o quiz de saúde e fitness e conquista o teu prémio! 42 Lisboa fitness club.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt">
      <body>{children}</body>
    </html>
  );
}

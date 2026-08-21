import type { Metadata } from "next";
import "./globals.css";

import AuthProvider from "@/components/SessionProvider";

export const metadata: Metadata = {
  title: "ResumeForge",
  description: "AI Portfolio Generator",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className="h-full antialiased"
    >
      <body className="min-h-full flex flex-col">
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}

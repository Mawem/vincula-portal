import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import AuthContext from "@/components/AuthContext";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/options";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Vincula Pagos",
  description: "Plataforma de pagos",
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions);
  return (
    <html lang="es">
      <AuthContext session={session}>
      <body className={inter.className}>
          {children}
      </body>
      </AuthContext>
    </html>
  );
}

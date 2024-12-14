import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ReactQueryProvider from "@/utils/provider/ReactQueryProvider";
import { SessionProvider } from "next-auth/react";
import { TransactionProvider } from "@/context/TransactionContext";
import { UserProvider } from "@/context/UserContext";
import { EventProvider } from "@/context/EventContext";
import { UserVoucherProvider } from "@/context/UserVoucherContext";
// import { auth } from "@/auth";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // const session = await auth();
  return (
    <html lang="en">
      <ReactQueryProvider>
        <UserProvider>
          <EventProvider>
            <TransactionProvider>
              <UserVoucherProvider>
                <body
                  className={`${geistSans.variable} ${geistMono.variable} antialiased`}
                >
                  {children}
                </body>
              </UserVoucherProvider>
            </TransactionProvider>
          </EventProvider>
        </UserProvider>
      </ReactQueryProvider>
    </html>
  );
}

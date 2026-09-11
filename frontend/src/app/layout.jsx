import { Bai_Jamjuree } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";
import { ThemeProvider } from "@/context/ThemeContext";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

import { ToastProvider } from "@/context/ToastContext";

const baiJamjuree = Bai_Jamjuree({
  weight: ['300', '400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-bai-jamjuree',
  display: 'swap',
});

export const metadata = {
  title: "Khoj | Minimalist Peer-to-Peer Buy & Sell Marketplace",
  description: "Khoj is a modern, minimalist marketplace to buy and sell used and new products locally.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={baiJamjuree.variable} suppressHydrationWarning>
      <body className={`${baiJamjuree.className} antialiased flex flex-col min-h-screen selection:bg-amber-500/30 selection:text-amber-900 transition-colors duration-200 bg-slate-50 text-slate-900 dark:bg-[#0b0f17] dark:text-slate-100`}>
        <ThemeProvider>
          <AuthProvider>
            <ToastProvider>
              <Navbar />
              <main className="flex-1">
                {children}
              </main>
              <Footer />
            </ToastProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

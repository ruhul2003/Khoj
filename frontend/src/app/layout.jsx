import { Bai_Jamjuree } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

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
    <html lang="en" className={baiJamjuree.variable}>
      <body className={`${baiJamjuree.className} antialiased bg-[#080a0f] text-slate-100 flex flex-col min-h-screen selection:bg-indigo-500/30 selection:text-indigo-200`}>
        <AuthProvider>
          <Navbar />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}

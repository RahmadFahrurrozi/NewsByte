import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
<<<<<<< HEAD
import NavbarWrapper from "@/components/Navbar/NavbarWrapper";
import { ThemeProvider } from "@/contexts/ThemeProvider";
import { Toaster } from "@/components/ui/sonner";
import { AuthProvider } from "@/contexts/AuthContextProvider";
=======
import { ThemeProvider } from "@/contexts/ThemeProvider";
import NavbarWrapper from "@/components/Navbar/NavbarWrapper";
>>>>>>> e2b6909 (feat: menambahkan tampilan dashboard)

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "Newsbyte",
  description:
    "Aplikasi berita ringkas dan cepat. Baca berita penting dari berbagai sumber hanya dalam satu aplikasi.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${poppins.className} antialiased min-h-screen`}>
<<<<<<< HEAD
        <AuthProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <NavbarWrapper />
            <main className="px-6">{children}</main>
          </ThemeProvider>
          <Toaster position="top-right" richColors />
        </AuthProvider>
=======
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <NavbarWrapper />
          <main className="px-6">{children}</main>
        </ThemeProvider>
>>>>>>> e2b6909 (feat: menambahkan tampilan dashboard)
      </body>
    </html>
  );
}

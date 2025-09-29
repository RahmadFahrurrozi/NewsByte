import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import NavbarWrapper from "@/components/Navbar/NavbarWrapper";
import { ThemeProvider } from "@/contexts/ThemeProvider";
import { Toaster } from "@/components/ui/sonner";
import { AuthProvider } from "@/contexts/AuthContextProvider";
import ReactQueryProvider from "@/providers/ReactQueryProvider";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "Newsbyte",
  description:
    "Aplikasi berita ringkas dan cepat. Baca berita penting dari berbagai sumber hanya dalam satu aplikasi.",
  icons: {
    icon: "/window.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${poppins.className} antialiased min-h-screen`}>
        <AuthProvider>
          <ReactQueryProvider>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              <div className="min-h-screen w-full relative bg-background">
                <div
                  className="absolute inset-0 z-0 dark:block hidden"
                  style={{
                    background:
                      "radial-gradient(ellipse 80% 40% at 50% 0%, rgba(6, 182, 212, 0.25), transparent 70%), #000000",
                  }}
                />
                <div
                  className="absolute inset-0 z-0 dark:hidden block"
                  style={{
                    background:
                      "radial-gradient(ellipse 80% 40% at 50% 0%, rgba(6, 182, 212, 0.15), transparent 90%), #ffffff",
                  }}
                />
                <main className="relative z-10">{children}</main>
              </div>
            </ThemeProvider>
            <Toaster position="top-right" richColors />
          </ReactQueryProvider>
        </AuthProvider>
      </body>
    </html>
  );
}

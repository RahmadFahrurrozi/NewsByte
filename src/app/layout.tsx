import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import NavbarWrapper from "@/components/Navbar/NavbarWrapper";
import { ThemeProvider } from "@/components/theme-provider";

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
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <NavbarWrapper />
          <main className="px-6">{children}</main>
        </ThemeProvider>
      </body>
    </html>
  );
}

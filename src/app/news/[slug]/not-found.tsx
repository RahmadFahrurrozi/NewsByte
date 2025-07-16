import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="text-center py-20">
      <h1 className="text-2xl font-bold mb-2">404 - Berita Tidak Ditemukan</h1>
      <p className="text-muted-foreground">
        Silakan cek kembali URL atau kembali ke halaman utama.
      </p>
      <Link href={"/"}>
        <Button className="mt-6" variant="outline">
          Kembali ke Beranda
        </Button>
      </Link>
    </div>
  );
}

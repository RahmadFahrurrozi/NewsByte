// app/profile/page.tsx
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Image from "next/image";
import { IUser } from "@/types/IUser";

// Definisikan tipe untuk props komponen
interface AdminProfileClientProps {
  dataUser: IUser;
}

export default function AdminProfile({ dataUser }: AdminProfileClientProps) {
  const [activeTab, setActiveTab] = useState("profile");
  const [profile, setProfile] = useState({
    name: dataUser.username,
    email: dataUser.email,
    image: dataUser.photo,
  });
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPreviewImage(URL.createObjectURL(file));
      setProfile((prevProfile) => ({
        ...prevProfile,
        image: URL.createObjectURL(file),
      }));
      setImageFile(file);
    }
  };

  const handleUpdateProfile = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Logic untuk mengupdate data profil ke backend
    console.log("Update profile:", profile);
    // Tambahkan logika untuk mengirim data ke API
    try {
      const formData = new FormData();
      formData.append("username", profile.name ?? "admin");
      if (imageFile) {
        formData.append("photo", imageFile);
      }

      const response = await fetch("/api/admin/update-profile", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Gagal mengupdate profile!");
      }

      const result = await response.json();
      console.log("Profile berhasil di update", result);
    } catch (error: unknown) {
      if (error !== null && typeof error === "object" && "message" in error) {
        // Gunakan as untuk memberi tahu TypeScript tentang tipe error
        const errorMessage = (error as { message: string }).message;
        console.log("Error mengupdate profile", errorMessage);
      } else {
        console.log("Error mengupdate profile", "An unknown error occurred.");
      }
    }
  };

  return (
    <div className="flex justify-center items-start min-h-screen p-8 bg-black-100">
      <Card className="w-full max-w-2xl bg-black shadow-lg rounded-xl overflow-hidden">
        <div className="flex flex-col items-center p-6 border-b">
          <Image
            src={previewImage || profile.image || "/admin.jpg"}
            alt="Foto Profil Admin"
            width={100}
            height={100}
            priority={false}
            className="w-16 h-16 mb-3 rounded-full object-cover mr-4"
          />
          <h2 className="text-xl font-semibold">{profile.name}</h2>
        </div>
        <Card className="border-none shadow-none bg-black">
          <CardHeader>
            <CardTitle className="text-2xl font-bold">Ubah Data Diri</CardTitle>
            <CardDescription>
              Ubah nama dan foto profil Anda. Email tidak bisa diubah.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <form onSubmit={handleUpdateProfile} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nama</Label>
                <Input
                  id="name"
                  value={profile.name}
                  onChange={(e) =>
                    setProfile({ ...profile, name: e.target.value })
                  }
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" value={profile.email} disabled />
              </div>
              <div className="space-y-2">
                <Label htmlFor="image">Foto Profil</Label>
                <Input
                  id="image"
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                />
                {previewImage && (
                  <div className="mt-4">
                    <Label>Preview Foto</Label>
                    <img
                      src={previewImage}
                      alt="Preview"
                      className="mt-2 w-32 h-32 object-cover rounded-md border"
                    />
                  </div>
                )}
              </div>
              <Button type="submit" className="w-full">
                Simpan Perubahan
              </Button>
            </form>
          </CardContent>
        </Card>
      </Card>
    </div>
  );
}

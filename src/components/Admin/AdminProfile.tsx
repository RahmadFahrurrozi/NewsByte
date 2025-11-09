"use client";

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
import Image from "next/image";
import { IUser } from "@/types/IUser";
import { useUpdateProfile } from "@/hooks/useUpdateProfile";
import { LoadingSpinner } from "../LoadingSpinner";

export interface AdminProfileClientProps {
  dataUser: IUser;
}

export default function AdminProfile({ dataUser }: AdminProfileClientProps) {
  const { form, loading, profile, previewImage, handleSubmit } =
    useUpdateProfile({ dataUser: dataUser });
  const username = form.watch("username", dataUser.username);

  return (
    <div className="flex justify-center items-start min-h-screen p-8 bg-background">
      <Card className="w-full max-w-2xl bg-background shadow-lg rounded-xl overflow-hidden">
        <div className="flex flex-col items-center p-6 border-b">
          <Image
            src={previewImage || profile.photo || "/admin.jpg"}
            alt="Foto Profil Admin"
            width={100}
            height={100}
            priority={false}
            className="w-16 h-16 mb-3 rounded-full object-cover mr-4"
          />
          <h2 className="text-xl font-semibold">{username}</h2>
        </div>
        <Card className="border-none shadow-none bg-background">
          <CardHeader>
            <CardTitle className="text-2xl font-bold">
              Update Your Personal Information
            </CardTitle>
            <CardDescription>
              You can change your username and profile photo. You cannot change
              your email address yet.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <form
              onSubmit={form.handleSubmit(handleSubmit)}
              className="space-y-4"
            >
              <div className="space-y-2">
                <Label htmlFor="name">Username</Label>
                <Input id="name" {...form.register("username")} required />
                {form.formState.errors.username && (
                  <p>{form.formState.errors.username.message}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" value={profile.email} disabled />
              </div>
              <div className="space-y-2">
                <Label htmlFor="image">Profile Picture</Label>
                <Input
                  id="image"
                  type="file"
                  accept="image/*"
                  {...form.register("photo")}
                />
                {form.formState.errors.photo && (
                  <p>
                    {form.formState.errors.photo.message?.toString() ||
                      "File gambar tidak valid."}
                  </p>
                )}
                {previewImage && (
                  <div className="mt-4">
                    <Label>Preview Picture</Label>
                    <img
                      src={previewImage}
                      alt="Preview"
                      className="mt-2 w-32 h-32 object-cover rounded-md border"
                    />
                  </div>
                )}
              </div>
              <Button type={loading ? "button" : "submit"} className="w-full">
                {loading ? (
                  <LoadingSpinner />
                ) : (
                  <p>Update Personal Information</p>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </Card>
    </div>
  );
}

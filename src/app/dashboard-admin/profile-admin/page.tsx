// app/profile/page.tsx
"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useProfile } from "@/hooks/useUpdateUserProfile";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Camera, Loader2, Save } from "lucide-react";
import LoadingProfilePageSkeleton from "@/components/profilePageLoadingSkeleton";
import { useChangePassword } from "@/hooks/useChangePassword";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";

export default function AdminProfile() {
  const {
    profile,
    isLoading,
    error,
    form,
    onSubmit,
    isUpdating,
    isUploadingPhoto,
    profileCompletion,
  } = useProfile();

  const {
    formChangePassword,
    onSubmitChangePassword,
    isLoadingChangePassword,
  } = useChangePassword();

  if (!profile) return null;

  const avatarUrl = form.watch("photo")
    ? typeof form.watch("photo") === "string"
      ? form.watch("photo")
      : URL.createObjectURL(form.watch("photo") as File)
    : profile.photo || "/placeholder-avatar.jpg";

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      form.setValue("photo", file);
    }
  };

  const handleRemoveAvatar = () => {
    form.setValue("photo", undefined);
  };

  if (isLoading) {
    return <LoadingProfilePageSkeleton />;
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Error</CardTitle>
            <CardDescription>Failed to load profile data</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-destructive">{error.message}</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-start min-h-screen p-8 bg-background">
      <Card className="w-full max-w-2xl bg-background shadow-lg rounded-xl overflow-hidden">
        <div className="flex flex-col items-center p-6 border-b">
          <Avatar className="h-21 w-21">
            <AvatarImage src={avatarUrl} alt={profile.name} />
            <AvatarFallback className="text-2xl">
              {profile.name
                .split(" ")
                .map((n: string) => n[0])
                .join("")
                .toUpperCase()}
            </AvatarFallback>
          </Avatar>

          <h2 className="text-xl font-semibold">{profile.name}</h2>
        </div>
        <Tabs defaultValue="profile" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="change_password">Change Password</TabsTrigger>
          </TabsList>
          <TabsContent value="profile">
            <Card className="border-none shadow-none bg-background">
              <CardHeader>
                <CardTitle className="text-2xl font-bold">
                  Update Your Personal Information
                </CardTitle>
                <CardDescription>
                  You can change your username and profile photo. You cannot
                  change your email address yet.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <form onSubmit={onSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Username</Label>
                    <Input id="name" {...form.register("name")} required />
                    {form.formState.errors.name && (
                      <p>{form.formState.errors.name.message}</p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" value={profile.email} disabled />
                  </div>
                  <div className="flex gap-2">
                    <Button
                      type="button"
                      variant="outline"
                      asChild
                      disabled={isUploadingPhoto}
                    >
                      <label htmlFor="avatar-upload" className="cursor-pointer">
                        {isUploadingPhoto ? (
                          <>
                            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                            Uploading...
                          </>
                        ) : (
                          <>
                            <Camera className="h-4 w-4 mr-2" />
                            Change Photo
                          </>
                        )}
                        <Input
                          id="avatar-upload"
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={handleAvatarChange}
                          disabled={isUploadingPhoto}
                        />
                      </label>
                    </Button>
                    <Button
                      type="button"
                      variant="ghost"
                      onClick={handleRemoveAvatar}
                      disabled={isUploadingPhoto}
                    >
                      Remove
                    </Button>
                  </div>

                  <p className="text-xs text-muted-foreground text-center">
                    Recommended: Square image, at least 200x200 pixels
                  </p>
                  <Button
                    type="submit"
                    className="cursor-pointer"
                    disabled={isUpdating || isUploadingPhoto}
                  >
                    {isUpdating ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Saving...
                      </>
                    ) : (
                      <>
                        <Save className="mr-2 h-4 w-4" />
                        Save Changes
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="change_password">
            <Card className="border-none shadow-none bg-background">
              <CardHeader>
                <CardTitle className="text-2xl font-bold">
                  Change Your Old Password
                </CardTitle>
                <CardDescription>You can change your password.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Form {...formChangePassword}>
                  <form onSubmit={onSubmitChangePassword} className="space-y-4">
                    <div className="space-y-2">
                      <FormField
                       control={formChangePassword.control}
                       name="old_password"
                       render={({field}) => (
                        <FormItem>
                         <FormLabel>Old Password</FormLabel>
                         <FormControl>
                          <Input type="password" placeholder="***" {...field} />
                         </FormControl>
                        </FormItem>
                       )}
                      />
                    </div>
                    <div className="space-y-2">
                      <FormField
                       control={formChangePassword.control}
                       name="new_password"
                       render={({field}) => (
                        <FormItem>
                         <FormLabel>New Password</FormLabel>
                         <FormControl>
                          <Input type="password" placeholder="Minimal 6 characters" {...field} />
                         </FormControl>
                        </FormItem>
                       )}
                      />
                    </div>
                    <div className="space-y-2">
                      <FormField
                       control={formChangePassword.control}
                       name="confirm_new_password"
                       render={({field}) => (
                        <FormItem>
                         <FormLabel>Confirm New Password</FormLabel>
                         <FormControl>
                          <Input type="password" placeholder="Retype new password" {...field} />
                         </FormControl>
                        </FormItem>
                       )}
                      />
                    </div>
                    <Button
                      type="submit"
                      className="cursor-pointer"
                      disabled={isLoadingChangePassword}
                    >
                      {isLoadingChangePassword ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Saving...
                        </>
                      ) : (
                        <>
                          <Save className="mr-2 h-4 w-4" />
                          Change Password
                        </>
                      )}
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  );
}

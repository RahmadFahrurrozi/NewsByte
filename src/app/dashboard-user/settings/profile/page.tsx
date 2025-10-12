"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Save, Camera, User, Link2, Loader2, CheckCircle } from "lucide-react";
import { useProfile } from "@/hooks/useUpdateUserProfile";
import { formatDateWithTime } from "@/utils/formatedDate";

export default function ProfileSettingsPage() {
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
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
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

  if (!profile) return null;

  const avatarUrl = form.watch("photo")
    ? typeof form.watch("photo") === "string"
      ? form.watch("photo")
      : URL.createObjectURL(form.watch("photo") as File)
    : profile.photo || "/placeholder-avatar.jpg";

  return (
    <div className="px-4 pb-6 sm:px-6 lg:px-8">
      <div className="flex flex-col gap-2 mb-6">
        <h1 className="text-3xl font-bold">Profile Settings</h1>
        <p className="text-muted-foreground">
          Manage your personal information and profile details
        </p>
      </div>

      {/* Account Info Card */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            Account Information
          </CardTitle>
          <CardDescription>
            Your account details and membership information
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-6">
            <div className="space-y-2">
              <Label className="text-muted-foreground">Member since</Label>
              <p className="font-medium">
                {formatDateWithTime(profile.created_at)}
              </p>
            </div>

            <div className="space-y-2">
              <Label className="text-muted-foreground">Account status</Label>
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-green-500"></div>
                <p className="font-medium">
                  {profile.account_status || "Active"}
                </p>
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-muted-foreground">Last updated</Label>
              <p className="font-medium">
                {formatDateWithTime(profile.updated_at)}
              </p>
            </div>

            <div className="space-y-2">
              <Label className="text-muted-foreground">
                Profile completion
              </Label>
              <div className="flex items-center gap-2">
                <div className="w-24 bg-secondary rounded-full h-2">
                  <div
                    className="bg-primary h-2 rounded-full transition-all"
                    style={{ width: `${profileCompletion}%` }}
                  ></div>
                </div>
                {profileCompletion === 100 ? (
                  <CheckCircle className="text-green-500 h-5 w-5" />
                ) : (
                  <span className="text-sm font-medium">
                    {profileCompletion}%
                  </span>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <form onSubmit={onSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Photo Section */}
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle>Profile Photo</CardTitle>
              <CardDescription>Update your profile picture</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-col items-center space-y-4">
                <Avatar className="h-32 w-32">
                  <AvatarImage src={avatarUrl} alt={profile.name} />
                  <AvatarFallback className="text-2xl">
                    {profile.name
                      .split(" ")
                      .map((n: string) => n[0])
                      .join("")
                      .toUpperCase()}
                  </AvatarFallback>
                </Avatar>

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
              </div>
            </CardContent>
          </Card>

          {/* Profile Information Section */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
              <CardDescription>
                Update your personal details and information
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    {...form.register("name")}
                    placeholder="Enter your full name"
                  />
                  {form.formState.errors.name && (
                    <p className="text-sm text-destructive">
                      {form.formState.errors.name.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="userName">Username</Label>
                  <div className="flex">
                    <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-input bg-muted text-muted-foreground text-sm">
                      @
                    </span>
                    <Input
                      id="userName"
                      {...form.register("userName")}
                      className="rounded-l-none"
                      placeholder="username"
                    />
                  </div>
                  {form.formState.errors.userName && (
                    <p className="text-sm text-destructive">
                      {form.formState.errors.userName.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input id="email" type="email" value={profile.email} disabled />
                <p className="text-xs text-mute">Email cannot be changed</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="bio">Bio</Label>
                <Textarea
                  id="bio"
                  {...form.register("bio")}
                  placeholder="Tell us a little about yourself"
                  rows={4}
                />
                {form.formState.errors.bio && (
                  <p className="text-sm text-destructive">
                    {form.formState.errors.bio.message}
                  </p>
                )}
                <p className="text-xs text-muted-foreground">
                  Brief description for your profile. Maximum 255 characters.
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Link2 className="h-4 w-4" />
                  <h3 className="font-semibold">Social Links</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="website">Website</Label>
                    <Input
                      id="website"
                      type="url"
                      {...form.register("website")}
                      placeholder="https://example.com"
                    />
                    {form.formState.errors.website && (
                      <p className="text-sm text-destructive">
                        {form.formState.errors.website.message}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="twitterx">Twitter/X</Label>
                    <Input
                      id="twitterx"
                      type="url"
                      {...form.register("twitterx")}
                      placeholder="https://twitter.com/username"
                    />
                    {form.formState.errors.twitterx && (
                      <p className="text-sm text-destructive">
                        {form.formState.errors.twitterx.message}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="medium">Medium</Label>
                    <Input
                      id="medium"
                      type="url"
                      {...form.register("medium")}
                      placeholder="https://medium.com/@username"
                    />
                    {form.formState.errors.medium && (
                      <p className="text-sm text-destructive">
                        {form.formState.errors.medium.message}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="linkedin">LinkedIn</Label>
                    <Input
                      id="linkedin"
                      type="url"
                      {...form.register("linkedin")}
                      placeholder="https://linkedin.com/in/username"
                    />
                    {form.formState.errors.linkedin && (
                      <p className="text-sm text-destructive">
                        {form.formState.errors.linkedin.message}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex justify-end pt-4">
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
              </div>
            </CardContent>
          </Card>
        </div>
      </form>
    </div>
  );
}

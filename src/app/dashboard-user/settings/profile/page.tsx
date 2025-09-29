"use client";

import { useState } from "react";
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
import { Save, Camera, User, Link2, FileText } from "lucide-react";

export default function ProfileSettingsPage() {
  const [profile, setProfile] = useState({
    name: "Rozi",
    username: "rozi123",
    email: "rozi@example.com",
    bio: "Frontend developer passionate about creating beautiful user experiences. Love working with React and Next.js.",
    website: "https://rozi.dev",
    twitter: "rozi_dev",
    github: "rozi_dev",
    linkedin: "rozi_dev",
  });

  const [avatar, setAvatar] = useState("/placeholder-avatar.jpg");

  const handleInputChange = (field: string, value: string) => {
    setProfile((prev) => ({ ...prev, [field]: value }));
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setAvatar(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    console.log("Profile saved:", profile);
  };

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
        <CardContent className="w-fit">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="space-y-2">
              <Label className="text-muted-foreground">Member since</Label>
              <p className="font-medium">January 15, 2023</p>
            </div>

            <div className="space-y-2">
              <Label className="text-muted-foreground">Account status</Label>
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-green-500"></div>
                <p className="font-medium">Active</p>
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-muted-foreground">Last updated</Label>
              <p className="font-medium">2 days ago</p>
            </div>

            <div className="space-y-2">
              <Label className="text-muted-foreground">
                Profile completion
              </Label>
              <div className="flex items-center gap-2">
                <div className="w-full bg-secondary rounded-full h-2">
                  <div
                    className="bg-primary h-2 rounded-full"
                    style={{ width: "85%" }}
                  ></div>
                </div>
                <span className="text-sm font-medium">85%</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

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
                <AvatarImage src={avatar} alt={profile.name} />
                <AvatarFallback className="text-2xl">
                  {profile.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>

              <div className="flex gap-2">
                <Button variant="outline" asChild>
                  <label htmlFor="avatar-upload" className="cursor-pointer">
                    <Camera className="h-4 w-4 mr-2" />
                    Change Photo
                    <Input
                      id="avatar-upload"
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleAvatarChange}
                    />
                  </label>
                </Button>
                <Button
                  variant="ghost"
                  onClick={() => setAvatar("/placeholder-avatar.jpg")}
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
                  value={profile.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  placeholder="Enter your full name"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <div className="flex">
                  <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-input bg-muted text-muted-foreground text-sm">
                    @
                  </span>
                  <Input
                    id="username"
                    value={profile.username}
                    onChange={(e) =>
                      handleInputChange("username", e.target.value)
                    }
                    className="rounded-l-none"
                    placeholder="username"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                value={profile.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                placeholder="Enter your email address"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="bio">Bio</Label>
              <Textarea
                id="bio"
                value={profile.bio}
                onChange={(e) => handleInputChange("bio", e.target.value)}
                placeholder="Tell us a little about yourself"
                rows={4}
              />
              <p className="text-xs text-muted-foreground">
                Brief description for your profile. URLs are hyperlinked.
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
                    value={profile.website}
                    onChange={(e) =>
                      handleInputChange("website", e.target.value)
                    }
                    placeholder="https://example.com"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="twitter">Twitter</Label>
                  <div className="flex">
                    <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-input bg-muted text-muted-foreground text-sm">
                      @
                    </span>
                    <Input
                      id="twitter"
                      value={profile.twitter}
                      onChange={(e) =>
                        handleInputChange("twitter", e.target.value)
                      }
                      className="rounded-l-none"
                      placeholder="username"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="github">GitHub</Label>
                  <div className="flex">
                    <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-input bg-muted text-muted-foreground text-sm">
                      @
                    </span>
                    <Input
                      id="github"
                      value={profile.github}
                      onChange={(e) =>
                        handleInputChange("github", e.target.value)
                      }
                      className="rounded-l-none"
                      placeholder="username"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="linkedin">LinkedIn</Label>
                  <div className="flex">
                    <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-input bg-muted text-muted-foreground text-sm">
                      @
                    </span>
                    <Input
                      id="linkedin"
                      value={profile.linkedin}
                      onChange={(e) =>
                        handleInputChange("linkedin", e.target.value)
                      }
                      className="rounded-l-none"
                      placeholder="username"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-end pt-4">
              <Button onClick={handleSave}>
                <Save className="mr-2 h-4 w-4" />
                Save Changes
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

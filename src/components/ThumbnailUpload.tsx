"use client";

import { useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { ImageIcon, Trash2 } from "lucide-react";

interface ThumbnailUploadProps {
  value?: File | null;
  onChange: (file: File | null) => void;
}

export function ThumbnailUpload({ value, onChange }: ThumbnailUploadProps) {
  const [preview, setPreview] = useState<string | null>(
    value ? URL.createObjectURL(value) : null
  );
  const [isDragOver, setIsDragOver] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleFile = (file: File) => {
    if (file && file.type.startsWith("image/")) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error("File size must be less than 5MB");
        return;
      }

      onChange(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFile(files[0]);
    }
  };

  const handleRemove = () => {
    onChange(null);
    setPreview(null);
    if (inputRef.current) inputRef.current.value = "";
  };

  return (
    <div
      className={cn(
        "relative flex flex-col items-center justify-center w-full min-h-48 border-2 border-dashed rounded-xl cursor-pointer transition-all duration-200 overflow-hidden",
        preview
          ? "border-muted bg-muted/20"
          : isDragOver
          ? "border-primary bg-primary/5 scale-[1.01] shadow-lg"
          : "border-border bg-muted/10"
      )}
      onClick={() => !preview && inputRef.current?.click()}
      onDragOver={(e) => {
        e.preventDefault();
        setIsDragOver(true);
      }}
      onDragLeave={(e) => {
        e.preventDefault();
        setIsDragOver(false);
      }}
      onDrop={handleDrop}
    >
      <Input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) handleFile(file);
        }}
      />

      {preview ? (
        <div className="relative w-full h-full group">
          <Image
            src={preview}
            alt="Preview"
            height={200}
            width={200}
            className="rounded-lg w-full h-full object-cover"
          />

          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-lg" />

          {/* Action buttons */}
          <div className="absolute inset-0 flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition-all duration-500">
            <Button
              type="button"
              variant="secondary"
              size="sm"
              className="bg-white/95 text-black hover:bg-white shadow-lg backdrop-blur-sm cursor-pointer"
              onClick={(e) => {
                e.stopPropagation();
                inputRef.current?.click();
              }}
            >
              <ImageIcon className="w-4 h-4 mr-2" />
              Change
            </Button>
            <Button
              type="button"
              variant="destructive"
              size="sm"
              className="bg-red-500/95 hover:bg-red-500 shadow-lg backdrop-blur-sm cursor-pointer"
              onClick={(e) => {
                e.stopPropagation();
                handleRemove();
              }}
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Remove
            </Button>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center gap-4 text-center p-8">
          <div
            className={cn(
              "p-4 rounded-full transition-all duration-200",
              isDragOver ? "bg-primary/20 scale-110" : "bg-muted/20"
            )}
          >
            <ImageIcon
              className={cn(
                "w-8 h-8 transition-colors duration-200",
                isDragOver ? "text-primary" : "text-muted-foreground"
              )}
            />
          </div>
          <div className="space-y-2">
            <div className="text-sm">
              {isDragOver ? (
                <span className="font-semibold text-primary animate-pulse">
                  Drop your image here
                </span>
              ) : (
                <>
                  <span className="font-semibold text-primary">
                    Click to upload
                  </span>{" "}
                  <span className="text-muted-foreground">
                    or drag and drop
                  </span>
                </>
              )}
            </div>
            <div className="text-xs text-muted-foreground">
              PNG, JPG, Webp up to 5MB
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

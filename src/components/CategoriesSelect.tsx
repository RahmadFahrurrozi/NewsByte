"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Building2, Code, HeartHandshake, Icon, Landmark } from "lucide-react";

interface ICategoriesSelectProps {
  value?: string;
  onChange?: (value: string) => void;
}

const CATEGORIES = [
  { label: "Politics", value: "Politics", icon: Landmark },
  { label: "Business", value: "Business", icon: Building2 },
  { label: "Technology", value: "Thechnology", icon: Code },
  { label: "Health", value: "Health", icon: HeartHandshake },
];

export default function CategoriesSelect({
  value,
  onChange,
}: ICategoriesSelectProps) {
  return (
    <Select onValueChange={onChange} defaultValue={value}>
      <SelectTrigger className="w-full cursor-pointer">
        <SelectValue placeholder="Select a category" />
      </SelectTrigger>
      <SelectContent>
        {CATEGORIES.map(({ value, label, icon: Icon }) => (
          <SelectItem key={value} value={value}>
            <div className="flex items-center gap-2">
              <Icon className="h-4 w-4" />
              <p>{label}</p>
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

import { Frown } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ErrorStateProps {
  onRetry: () => void;
  message?: string;
}

export default function ErrorState({
  onRetry,
  message = "Failed to load articles. Please try again.",
}: ErrorStateProps) {
  return (
    <div className="flex flex-col items-center justify-center p-8 text-center bg-card rounded-lg shadow-md space-y-4">
      <Frown size={48} className="text-muted-foreground" />
      <h3 className="text-xl font-semibold text-foreground">
        Oops, something went wrong!
      </h3>
      <p className="text-muted-foreground">{message}</p>
      <Button onClick={onRetry}>Try Again</Button>
    </div>
  );
}

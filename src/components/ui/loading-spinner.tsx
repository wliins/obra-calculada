import { cn } from "@/lib/utils";

interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function LoadingSpinner({ size = "md", className }: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: "h-4 w-4",
    md: "h-6 w-6",
    lg: "h-8 w-8"
  };

  return (
    <div
      className={cn(
        "animate-spin rounded-full border-2 border-current border-t-transparent",
        sizeClasses[size],
        className
      )}
    >
      <span className="sr-only">Carregando...</span>
    </div>
  );
}

interface LoadingPageProps {
  message?: string;
  className?: string;
}

export function LoadingPage({ message = "Carregando...", className }: LoadingPageProps) {
  return (
    <div className={cn("flex flex-col items-center justify-center min-h-[400px] space-y-4", className)}>
      <LoadingSpinner size="lg" className="text-primary" />
      <p className="text-muted-foreground">{message}</p>
    </div>
  );
}

import { useToast as useToastBase } from "@/components/ui/use-toast";

export function useToast() {
  const { toast } = useToastBase();
  
  return {
    toast,
    success: (title: string, description?: string) => {
      toast({
        title,
        description,
        variant: "default"
      });
    },
    error: (title: string, description?: string) => {
      toast({
        title,
        description,
        variant: "destructive"
      });
    },
    warning: (title: string, description?: string) => {
      toast({
        title,
        description,
        variant: "default"
      });
    },
    info: (title: string, description?: string) => {
      toast({
        title,
        description,
        variant: "default"
      });
    }
  };
}

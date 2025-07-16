import { cn } from "@/lib/utils"

const getValidateBorder = (error?: any) =>
  cn(error ? "border-red-500 focus-visible:border-red-500" : "");

export { getValidateBorder };


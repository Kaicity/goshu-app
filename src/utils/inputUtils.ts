import { cn } from "@/lib/utils"

const getValidateInput = (error?: any, type?: "border" | "text") => {
  switch (type) {
    case "border":
      return cn(error ? "border-red-500 focus-visible:border-red-500" : "");
    case "text":
      return cn(error ? "text-red-500" : "");
    default:
      return "";
  }
}
export { getValidateInput };

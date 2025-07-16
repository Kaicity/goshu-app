import clsx from "clsx";

export const getValidateBorder = (error?: any) =>
  clsx(error ? "border-red-500 focus-visible:border-red-500" : "border-gray-300");

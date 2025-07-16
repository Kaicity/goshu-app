import clsx from "clsx";

const getValidateBorder = (error?: any) =>
  clsx(error ? "border-red-500 focus-visible:border-red-500" : "border-gray-300");

export { getValidateBorder };
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { Doc } from "../../convex/_generated/dataModel"


export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export function getAverage({
  ratings
}:{
  ratings:  Doc<'ratings'>[]
}){
  
  const averageRating = ratings.reduce((sum, rating) => sum + (rating.stars ?? 0), 0) / ratings.length;
  return Number.isNaN(averageRating) ? 0 : averageRating
}

export function formatPrice(
  price: number | string,
  options: {
    currency?: "PHP",
    notation?: Intl.NumberFormatOptions["notation"]
  } = {}
) {
  const { currency = "PHP", notation = "standard" } = options;

  const numericPrice = typeof price === "string" ? parseFloat(price) : price;

  return new Intl.NumberFormat("en-PH", {
    style: "currency",
    currency,
    notation,
    maximumFractionDigits: 2
  }).format(numericPrice);
}
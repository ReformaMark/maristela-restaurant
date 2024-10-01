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
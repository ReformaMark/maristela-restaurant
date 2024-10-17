import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { Doc } from "../../convex/_generated/dataModel"
import { CalculateOrder } from "./types"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate({
  convexDate
}:{
  convexDate: number
}) {
  const roundedTimestamp = Math.floor(convexDate);

  const readableDate = new Date(roundedTimestamp);
  const formattedDate = readableDate.toLocaleString();

  return formattedDate
}

export function getAverage({
  ratings
}: {
  ratings?: Doc<'ratings'>[]
}) {

  const averageRating = ratings && ratings.reduce((sum, rating) => sum + (rating.stars ?? 0), 0) / ratings.length;
  return !averageRating ? 0 : Number.isNaN(averageRating) ? 0 : averageRating
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

export const calculateTotal = (orders: CalculateOrder[]) => {
  return orders.reduce((total, order) => {
    const price = order.menuItem ? order.menuItem.price : order.familyMeal?.price
    return total + (price! * order.quantity)
  }, 0)
}

export const statusColors = {
  unconfirmed: 'bg-yellow text-foreground hover:bg-yellow-600',
  confirmed: 'bg-blue-500 text-foreground hover:bg-blue-600',
  delivered: 'bg-green-500 text-foreground hover:bg-green-600',
  unsuccessful: 'bg-primary text-foreground hover:bg-primary/90',
}
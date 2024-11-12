import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { Doc } from "../../convex/_generated/dataModel"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate({
  convexDate
}: {
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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const calculateTotal = (orders: any[]) => {
  return orders?.reduce((total, order) => {
    const price = order.menuItem ? order.menuItem.price : order.familyMeal?.price
    return total + (price! * order.quantity)
  }, 0)
}

export const statusColors = {
  Pending: 'bg-yellow hover:bg-yellow/70 text-foreground text-white',
  Confirmed: 'bg-blue-500 hover:bg-blue-600 text-white',
  'Out for Delivery': 'bg-purple-500 hover:bg-purple-600 text-white',
  Completed: 'bg-green-500 hover:bg-green-600 text-white',
  Cancelled: 'bg-primary hover:bg-primary/70 text-white',
}

export function generateToken(length = 32) {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let token = '';
  for (let i = 0; i < length; i++) {
    token += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return token;
}
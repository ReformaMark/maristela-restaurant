import { Skeleton } from "@/components/ui/skeleton"

export function SkeletonCard() {
  return (
    <div className="w w-64 border-2 border-gray-100 rounded-xl shadow-lg">
        <Skeleton className="h-40 w-full rounded-xl mb-3" />
        <div className="px-5 pb-5">
            <Skeleton className="h-7 w-full text-xl mb-1" />
            <Skeleton className="h-4 w-full mt-2 px-5" />
            <Skeleton className="h-7 w-full mt-2 px-5" />
            <Skeleton className="h-10 mt-5 px-5" />
        </div>
        
    </div>
  )
}
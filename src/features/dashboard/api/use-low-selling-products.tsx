import { useQuery } from "convex/react"
import { api } from "../../../../convex/_generated/api"

export const useLowSellingProducts = () => {
    const data = useQuery(api.dashboard.lowSellingProducts)
    const isLoading = data === undefined

    return { data, isLoading }
}
import { useQuery } from "convex/react"
import { api } from "../../../../convex/_generated/api"

export const useTopSellingProducts = () => {
    const data = useQuery(api.dashboard.topSellingProducts)
    const isLoading = data === undefined

    return { data, isLoading }
}
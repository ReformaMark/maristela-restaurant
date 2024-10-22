import { useQuery } from "convex/react"
import { api } from "../../../../convex/_generated/api"

export const useCountOrders = () => {
    const data = useQuery(api.dashboard.totalOrders)
    const isLoading = data === undefined

    return { data, isLoading }
}
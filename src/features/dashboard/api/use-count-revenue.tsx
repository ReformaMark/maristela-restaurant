import { useQuery } from "convex/react"
import { api } from "../../../../convex/_generated/api"

export const useCountRevenue = () => {
    const data = useQuery(api.dashboard.totalRevenue)
    const isLoading = data === undefined

    return { data, isLoading }
}
import { useQuery } from "convex/react"
import { api } from "../../../../convex/_generated/api"

export const useOrderPopularity = () => {
    const data = useQuery(api.dashboard.getOrderPopularity)
    const isLoading = data === undefined

    return { data, isLoading }
}
import { useQuery } from "convex/react"
import { api } from "../../../../convex/_generated/api"

export const useProductPopularity = () => {
    const data = useQuery(api.dashboard.getProductPopularity)
    const isLoading = data === undefined

    return { data, isLoading }
}
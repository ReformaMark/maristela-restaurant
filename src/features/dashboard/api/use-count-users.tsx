import { useQuery } from "convex/react"
import { api } from "../../../../convex/_generated/api"

export const useCountUsers = () => {
    const data = useQuery(api.dashboard.totalUsers)
    const isLoading = data === undefined

    return { data, isLoading }
}
import { useQuery } from "convex/react"
import { api } from "../../../../convex/_generated/api"

export const useAllTransactions = () => {
    const data = useQuery(api.transactions.getAllTransactions)
    const isLoading = data === undefined

    return { data, isLoading }
}
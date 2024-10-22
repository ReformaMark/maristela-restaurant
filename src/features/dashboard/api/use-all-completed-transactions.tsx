import { useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";

export const useAllCompletedTransactions = () => {
    const data = useQuery(api.transactions.getCompletedTransactions)
    const isLoading = data === undefined

    return { data, isLoading }
}
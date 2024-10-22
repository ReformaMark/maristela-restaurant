import { useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";

export const useAllPendingTransactions = () => {
    const data = useQuery(api.transactions.getPendingTransactions)
    const isLoading = data === undefined

    return { data, isLoading }
}
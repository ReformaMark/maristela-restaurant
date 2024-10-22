import { useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";

export const useAllCancelledTransactions = () => {
    const data = useQuery(api.transactions.getCancelledTransactions)
    const isLoading = data === undefined

    return { data, isLoading }
}
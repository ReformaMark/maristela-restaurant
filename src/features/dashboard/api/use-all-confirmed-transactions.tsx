import { useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";

export const useAllConfirmedTransactions = () => {
    const data = useQuery(api.transactions.getConfirmedTransactions)
    const isLoading = data === undefined

    return { data, isLoading }
}
import { useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";

export const useAllOutForDeliveryTransactions = () => {
    const data = useQuery(api.transactions.getOutForDeliveryTransactions)
    const isLoading = data === undefined

    return { data, isLoading }
}
import { useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { useState } from "react";

export const useAllTransactions = (initialLimit = 10) => {
    const [limit, setLimit] = useState(initialLimit);
    const [cursor, setCursor] = useState<string | null>(null);
  
    const result = useQuery(api.transactions.getAllTransactions, { limit, cursor: cursor || undefined });
  
    const loadMore = () => {
      if (result?.continueCursor) {
        setCursor(result.continueCursor);
        setLimit((prevLimit) => prevLimit + initialLimit);
      }
    };
  
    return {
      data: result?.transactions || [],
      isLoading: result === undefined,
      loadMore,
      hasMore: !!result?.continueCursor,
    };
  };
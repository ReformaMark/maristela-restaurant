import { useQuery } from "convex/react";
import { useCallback, useState } from "react";
import { api } from "../../../../convex/_generated/api";

export const useAllTransactions = (initialLimit = 10) => {
  const [limit, setLimit] = useState(initialLimit);
  const [cursor, setCursor] = useState<string | null>(null);
  const [searchOrderId, setSearchOrderId] = useState<string | null>(null);

  const result = useQuery(api.transactions.getAllTransactions, { 
    limit, 
    cursor: cursor || undefined 
  });

  const searchResult = useQuery(
    api.transactions.getTransactionByOrderId,
    searchOrderId ? { orderId: searchOrderId } : "skip"
  );

  const loadMore = useCallback(() => {
    if (result?.continueCursor) {
      setCursor(result.continueCursor);
      setLimit((prevLimit) => prevLimit + initialLimit);
    }
  }, [result?.continueCursor, initialLimit]);

  const searchTransaction = useCallback((orderId: string) => {
    setSearchOrderId(orderId);
  }, []);

  const resetSearch = useCallback(() => {
    setSearchOrderId(null);
    setCursor(null);
    setLimit(initialLimit);
  }, [initialLimit]);

  return {
    data: searchOrderId 
      ? (searchResult ? [searchResult] : []) 
      : result?.transactions || [],
    isLoading: searchOrderId 
      ? searchResult === undefined 
      : result === undefined,
    loadMore,
    hasMore: !!result?.continueCursor,
    searchTransaction,
    resetSearch,
    isSearchActive: !!searchOrderId,
    searchError: searchResult === null,
  };
};
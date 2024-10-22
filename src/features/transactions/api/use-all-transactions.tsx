import { useQuery } from "convex/react";
import { useCallback, useEffect, useState } from "react";
import { api } from "../../../../convex/_generated/api";
import { Id } from "../../../../convex/_generated/dataModel";

export const useAllTransactions = (initialLimit = 10) => {
  const [limit, setLimit] = useState(initialLimit);
  const [cursor, setCursor] = useState<string | null>(null);
  const [searchId, setSearchId] = useState<Id<"transactions"> | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [accumulatedTransactions, setAccumulatedTransactions] = useState<any[]>([]);

  const result = useQuery(api.transactions.getAllTransactions, { limit, cursor: cursor || undefined });
  const searchResult = useQuery(api.transactions.getTransactionById,
    searchId ? { transactionId: searchId } : "skip"
  );

  useEffect(() => {
    if (result?.transactions) {
      setAccumulatedTransactions(prev => {
        const newTransactions = result.transactions.filter(
          (transaction) => !prev.some(t => t._id === transaction._id)
        );
        return [...prev, ...newTransactions];
      });
    }
  }, [result?.transactions]);

  const loadMore = useCallback(() => {
    if (result?.continueCursor) {
      setCursor(result.continueCursor);
      setLimit((prevLimit) => prevLimit + initialLimit);
    }
  }, [result?.continueCursor, initialLimit]);

  const searchTransaction = useCallback((id: Id<"transactions">) => {
    setSearchId(id);
  }, []);

  const resetSearch = useCallback(() => {
    setSearchId(null);
    setCursor(null);
    setLimit(initialLimit);
    setAccumulatedTransactions([]);
  }, [initialLimit]);

  return {
    data: searchId ? (searchResult ? [searchResult] : []) : accumulatedTransactions,
    isLoading: searchId ? searchResult === undefined : result === undefined,
    loadMore,
    hasMore: !!result?.continueCursor,
    searchTransaction,
    resetSearch,
    isSearchActive: !!searchId,
    searchError: searchResult === null,
  };
};

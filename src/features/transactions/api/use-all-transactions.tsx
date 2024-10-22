import { useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { useState } from "react";
import { Id } from "../../../../convex/_generated/dataModel";

export const useAllTransactions = (initialLimit = 10) => {
  const [limit, setLimit] = useState(initialLimit);
  const [cursor, setCursor] = useState<string | null>(null);
  const [searchId, setSearchId] = useState<Id<"transactions"> | null>(null);

  const result = useQuery(api.transactions.getAllTransactions, { limit, cursor: cursor || undefined });
  const searchResult = useQuery(api.transactions.getTransactionById, 
    searchId ? { transactionId: searchId } : "skip"
  );

  const loadMore = () => {
    if (result?.continueCursor) {
      setCursor(result.continueCursor);
      setLimit((prevLimit) => prevLimit + initialLimit);
    }
  };

  const searchTransaction = (id: Id<"transactions">) => {
    setSearchId(id);
  };

  const resetSearch = () => {
    setSearchId(null);
    setCursor(null);
    setLimit(initialLimit);
  };

  return {
    data: searchId ? (searchResult ? [searchResult] : []) : (result?.transactions || []),
    isLoading: searchId ? searchResult === undefined : result === undefined,
    loadMore,
    hasMore: !!result?.continueCursor,
    searchTransaction,
    resetSearch,
    isSearchActive: !!searchId,
    searchError: searchResult === null,
  };
};

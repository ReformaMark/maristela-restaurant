import { useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";

export function useArimaForecastData({ startDate, endDate }: {
    startDate?: number,
    endDate?: number
}) {
    return useQuery(api.dashboard.getArimaSalesForecast, {
        startDate,
        endDate
    });
}
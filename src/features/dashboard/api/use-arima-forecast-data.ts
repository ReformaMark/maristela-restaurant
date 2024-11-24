import { useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";

export function useArimaForecastData({ startDate, endDate }: {
    startDate?: number,
    endDate?: number
}) {
    const data = useQuery(api.dashboard.getArimaSalesForecast, {
        startDate: startDate ?? undefined,
        endDate: endDate ?? undefined
    });

    return data;
}
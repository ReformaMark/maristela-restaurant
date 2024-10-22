import { useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";

export const useArimaForecastData = () => {
    const result = useQuery(api.dashboard.getArimaSalesForecast);
    return {
        data: result,
        isLoading: result === undefined,
        error: result === null
    };
};
import { useQuery } from "convex/react"
import { api } from "../../../../convex/_generated/api"

export const useForecastData = () => {
    const data = useQuery(api.dashboard.getSalesForecast)
    const isLoading = data === undefined

    return { data, isLoading }
}
import { useQuery } from "convex/react"
import { api } from "../../../../convex/_generated/api"

export const useAllMenus = () => {
    const data = useQuery(api.menus.allMenus)
    const isLoading = data === undefined

    return { data, isLoading }
}
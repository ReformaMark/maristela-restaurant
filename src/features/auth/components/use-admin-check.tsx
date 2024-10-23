import { useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";


export function useAdminCheck() {
    const isAdmin = useQuery(api.users.checkUserRole);
    return isAdmin;
}

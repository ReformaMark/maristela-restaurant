"use client";

import { useQuery } from "convex/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { api } from "../../convex/_generated/api";
import { useConvexAuth } from "convex/react";

export function Redirector({ children }: { children: React.ReactNode }) {
    const { isAuthenticated, isLoading } = useConvexAuth();
    const role = useQuery(api.users.checkUserRole);
    const router = useRouter();

    useEffect(() => {
        if (isLoading) return;
        if (!isAuthenticated) return;
        if (role === undefined) return;
        
        if (role === "admin") {
            router.push("/dashboard");
        }
    }, [isLoading, isAuthenticated, role, router]);

    if (isLoading || role === undefined) {
        return <div>Loading...</div>;
    }

    return <>{children}</>;
}

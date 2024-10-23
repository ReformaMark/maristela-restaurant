"use client";

import { useQuery } from "convex/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { api } from "../../../../convex/_generated/api";
import { useConvexAuth } from "convex/react";

export function AdminCheck({ children }: { children: React.ReactNode }) {
    const { isAuthenticated, isLoading } = useConvexAuth();
    const role = useQuery(api.users.checkUserRole);
    const router = useRouter();

    useEffect(() => {
        if (isLoading) return; // Still loading auth state
        if (!isAuthenticated) {
            router.push("/auth"); // Redirect to login if not authenticated
            return;
        }
        if (role === undefined) return; // Still loading role
        if (role !== "admin") {
            router.push("/"); // Redirect to unauthorized page if not admin
        }
    }, [isLoading, isAuthenticated, role, router]);

    if (isLoading || role === undefined) return <div>Loading...</div>;
    if (!isAuthenticated || role !== "admin") return null;

    return <>{children}</>;
}
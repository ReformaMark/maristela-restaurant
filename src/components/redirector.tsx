"use client";

import { useQuery } from "convex/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { api } from "../../convex/_generated/api";
import { useConvexAuth } from "convex/react";
import { FaSpinner } from "react-icons/fa"; // Import a spinner icon for better UI feedback

export function Redirector({ children }: { children: React.ReactNode }) {
    const { isAuthenticated, isLoading } = useConvexAuth();
    const role = useQuery(api.users.checkUserRole);
    const router = useRouter();

    useEffect(() => {
        if (isLoading || !isAuthenticated || role === undefined) return;
        
        if (role === "admin") {
            router.push("/dashboard");
        }
    }, [isLoading, isAuthenticated, role, router]);

    if (isLoading || role === undefined) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="flex flex-col items-center">
                    <FaSpinner className="text-4xl animate-spin text-blue-500 mb-2" />
                    <span className="text-lg font-medium text-gray-700">Loading please wait...</span>
                </div>
            </div>
        );
    }

    return <>{children}</>;
}

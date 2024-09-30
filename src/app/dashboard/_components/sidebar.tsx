"use client"

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { BoxIcon, ChartBarIcon, CogIcon, HomeIcon, TruckIcon, User2Icon } from "lucide-react";
import { usePathname } from "next/navigation";

export const Sidebar = ({ className }: { className?: string }) => {
    const pathname = usePathname()

    return (
        <div className={className}>
            <div className="flex h-full flex-col">
                <div className="flex h-14 items-center border-b border-red-200 px-4">
                    <span className="font-semibold">Admin Dashboard</span>
                </div>
                <nav className="flex-1 space-y-2 p-4">
                    <Button variant="ghost" className={cn("w-full justify-start hover:bg-red-200", pathname === "/dashboard" && "bg-red-100")}>
                        <HomeIcon className="mr-2 h-4 w-4" />
                        Overview
                    </Button>
                    <Button variant="ghost" className="w-full justify-start hover:bg-red-200">
                        <BoxIcon className="mr-2 h-4 w-4" />
                        Products
                    </Button>
                    <Button variant="ghost" className="w-full justify-start hover:bg-red-200">
                        <TruckIcon className="mr-2 h-4 w-4" />
                        Orders
                    </Button>
                    <Button variant="ghost" className="w-full justify-start hover:bg-red-200">
                        <User2Icon className="mr-2 h-4 w-4" />
                        Customers
                    </Button>
                    <Button variant="ghost" className="w-full justify-start hover:bg-red-200">
                        <ChartBarIcon className="mr-2 h-4 w-4" />
                        Analytics
                    </Button>
                    <Button variant="ghost" className="w-full justify-start hover:bg-red-200">
                        <CogIcon className="mr-2 h-4 w-4" />
                        Settings
                    </Button>
                </nav>
            </div>
        </div>
    )
}
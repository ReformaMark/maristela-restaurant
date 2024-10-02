"use client"

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { BoxIcon, HomeIcon, TruckIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { SidebarSection } from "./sidebar-section";

export const Sidebar = ({ className }: { className?: string }) => {
    const pathname = usePathname()

    return (
        <div className={className}>
            <div className="flex h-full flex-col">
                <div className="flex h-14 items-center border-b border-red-200 px-4">
                    <span className="font-semibold">Admin Dashboard</span>
                </div>
                <nav className="flex-1 space-y-2 p-4">
                    <Link
                        href="/dashboard"
                        className={cn("w-full", pathname === "/dashboard" && "bg-red-100", buttonVariants({
                            variant: "ghost",
                            className: "hover:bg-red-200 justify-start",
                        }))}
                    >
                        <HomeIcon className="mr-2 h-4 w-4" />
                        Overview
                    </Link>

                    <SidebarSection
                        label="Products"
                        icon={BoxIcon}
                    >
                        <Link
                            href="/dashboard/products"
                            className={cn("w-full", pathname === "/dashboard/products" && "bg-red-100", buttonVariants({
                                variant: "ghost",
                                className: "hover:bg-red-200 justify-start text-sm",
                            }))}
                        >
                            Add Products
                        </Link>

                        <Link
                            href="/dashboard/edit-products"
                            className={cn("w-full", pathname === "/dashboard/edit-products" && "bg-red-100", buttonVariants({
                                variant: "ghost",
                                className: "hover:bg-red-200 justify-start text-sm",
                            }))}
                        >
                            Edit Products
                        </Link>
                    </SidebarSection>

                    <Link
                        href="/dashboard/orders"
                        className={cn("w-full", pathname === "/dashboard/orders" && "bg-red-100", buttonVariants({
                            variant: "ghost",
                            className: "hover:bg-red-200 justify-start",
                        }))}
                    >
                        <TruckIcon className="mr-2 h-4 w-4" />
                        Orders
                    </Link>

                    {/* <Button variant="ghost" className="w-full justify-start hover:bg-red-200">
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
                    </Button> */}
                </nav>
            </div>
        </div>
    )
}
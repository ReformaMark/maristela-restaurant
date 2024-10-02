import { ConvexClientProvider } from "@/components/convex-client-provider";
import { ConvexAuthNextjsServerProvider } from "@convex-dev/auth/nextjs/server";
// import localFont from "next/font/local";

import "@/lib/globals.css";
import { Sidebar } from "./_components/sidebar";
import { DashboardHeader } from "./_components/dashboard-header";
import { Toaster } from "@/components/ui/sonner";

export const metadata = {
    title: 'Dashboard',
    description: 'admin-dashboard for maristela restaurant',
}

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <ConvexAuthNextjsServerProvider>
            <html lang="en">
                <body
                    className={''}
                >
                    <ConvexClientProvider>
                        <div className="flex h-screen">
                            <Sidebar className="hidden w-64 border-r bg-gray-100/60 lg:block border-red-200" />
                            <div className="flex-1 overflow-y-auto">
                                <DashboardHeader />
                                <Toaster />
                                {children}
                            </div>
                        </div>
                    </ConvexClientProvider>
                </body>
            </html>
        </ConvexAuthNextjsServerProvider>
    )
}

export default DashboardLayout;
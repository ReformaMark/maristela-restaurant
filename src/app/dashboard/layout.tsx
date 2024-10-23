import { ConvexClientProvider } from "@/components/convex-client-provider";
import { Toaster } from "@/components/ui/sonner";
import "@/lib/globals.css";
import { ConvexAuthNextjsServerProvider } from "@convex-dev/auth/nextjs/server";
import { DashboardHeader } from "./_components/dashboard-header";
import { Sidebar } from "./_components/sidebar";
import { AdminCheck } from "@/features/auth/components/admin-check";

export const metadata = {
    title: 'Dashboard',
    description: 'admin-dashboard for maristela restaurant',
}
const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <ConvexAuthNextjsServerProvider>
            <html lang="en">
                <body>
                    <ConvexClientProvider>
                        <AdminCheck>
                            <div className="flex h-screen">
                                <Sidebar className="hidden w-64 border-r bg-gray-100/60 lg:block border-red-200" />
                                <div className="flex-1 overflow-y-auto">
                                    <DashboardHeader />
                                    <Toaster />
                                    {children}
                                </div>
                            </div>
                        </AdminCheck>
                    </ConvexClientProvider>
                </body>
            </html>
        </ConvexAuthNextjsServerProvider>
    )
}

export default DashboardLayout;
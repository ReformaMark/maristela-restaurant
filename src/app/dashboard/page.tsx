import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CancelledOrdersCard } from "@/features/dashboard/components/cancelled-orders-card"
import { CompletedOrdersCard } from "@/features/dashboard/components/completed-orders-card"
import { ConfirmedOrdersCard } from "@/features/dashboard/components/confirmed-orders-card"
import { LowSellingProducts } from "@/features/dashboard/components/low-selling-products"
import { OutOfDeliveryCard } from "@/features/dashboard/components/out-of-delivery-card"
import { TopSellingProducts } from "@/features/dashboard/components/top-selling-products"
import { TotalMenuCard } from "@/features/dashboard/components/total-menu-card"
import { TotalOrdersCard } from "@/features/dashboard/components/total-orders-card"
import { TotalRevenueCard } from "@/features/dashboard/components/total-revenue-card"
import { TotalUsersCard } from "@/features/dashboard/components/total-users-card"
import { UnconfirmedOrdersCard } from "@/features/dashboard/components/unconfirmed-orders-card"
import {
    CalendarIcon
} from 'lucide-react'
import { OrderStatusDistributionCard } from "./_components/order-status-distribution-card"
import { ProductPopularityCard } from "./_components/product-popularity-card"
import { SalesForecastCard } from "@/features/dashboard/components/sales-forecast-card"

const DashboardPage = () => {
    return (
        <div className="flex h-screen bg-yellow-50">
            {/* Desktop sidebar */}


            {/* Main Content */}
            <main className="flex-1 overflow-y-auto">


                {/* Dashboard Content */}
                <div className="container mx-auto p-4">
                    <div className="flex flex-col items-start justify-between space-y-4 md:flex-row md:items-center md:space-y-0">
                        <h1 className="text-3xl font-bold">Dashboard</h1>
                        <div className="flex flex-col space-y-2 md:flex-row md:space-x-2 md:space-y-0">
                            {/* TODO: MAKE IT CALENDAR */}
                            <Button variant="outline" size="sm">
                                <CalendarIcon className="mr-2 h-4 w-4" />
                                Jan 20, 2023 - Feb 09, 2023
                            </Button>
                        </div>
                    </div>

                    <Tabs defaultValue="overview" className="mt-4">
                        <TabsList>
                            <TabsTrigger value="overview">Overview</TabsTrigger>
                            <TabsTrigger value="more-details">More Details</TabsTrigger>
                        </TabsList>

                        <TabsContent value="overview" className="mt-6 space-y-4">
                            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                                <TotalUsersCard />

                                <TotalOrdersCard />

                                <TotalMenuCard />

                                <TotalRevenueCard />
                            </div>

                            <div className="grid gap-4 md:grid-cols-2">
                                <TopSellingProducts />

                                <LowSellingProducts />
                            </div>

                            <SalesForecastCard />
                        </TabsContent>

                        <TabsContent value="more-details" className="mt-6 space-y-4">
                            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
                                <UnconfirmedOrdersCard />

                                <ConfirmedOrdersCard />

                                <OutOfDeliveryCard />

                                <CompletedOrdersCard />

                                <CancelledOrdersCard />
                            </div>

                            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                                <ProductPopularityCard />

                                <OrderStatusDistributionCard />

                                {/* <LocationProductPreferencesCard /> */}

                                {/* <LocationSalesPerformanceCard /> */}
                            </div>
                        </TabsContent>
                    </Tabs>
                </div>
            </main>
        </div>
    )

}

export default DashboardPage;
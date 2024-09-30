import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
    BellIcon,
    CalendarIcon,
    PackageIcon,
    ShoppingCartIcon,
    TrendingUpIcon,
    Users2Icon
} from 'lucide-react'
import { MobileSheet } from "./_components/mobile-sheet"
import { OverviewCard } from "./_components/overview-card"
import { Sidebar } from "./_components/sidebar"
import { UserAvatar } from "./_components/user-avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ProductPopularityCard } from "./_components/product-popularity-card"
import { OrderStatusDistributionCard } from "./_components/order-status-distribution-card"
import { LocationProductPreferencesCard } from "./_components/location-product-preferences-card"
import { LocationSalesPerformanceCard } from "./_components/location-sales-performance-card"



const DashboardPage = () => {
    return (
        <div className="flex h-screen bg-yellow-50">
            {/* Desktop sidebar */}
            <Sidebar className="hidden w-64 border-r bg-gray-100/60 lg:block border-red-200" />

            {/* Main Content */}
            <main className="flex-1 overflow-y-auto">
                {/* Top Navigation */}
                <header className="flex h-14 items-center justify-between border-b border-red-200 px-4 bg-gray-100/60">
                    <MobileSheet />

                    <div className="flex items-center space-x-2">
                        <Button variant="ghost" size="icon" className="text-white hover:text-black">
                            <BellIcon className="h-5 w-5" />
                        </Button>

                        <UserAvatar />
                    </div>
                </header>

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
                                <OverviewCard
                                    title="Total Users"
                                    icon={Users2Icon}
                                    data="2,345"
                                    description="+2.5% from last month"
                                    className="bg-gradient-to-br from-red-500 to-yellow-500 text-white"
                                />

                                <OverviewCard
                                    title="Total Orders"
                                    icon={ShoppingCartIcon}
                                    data="5,678"
                                    description="+12% from last month"
                                />

                                <OverviewCard
                                    title="Total Products"
                                    icon={PackageIcon}
                                    data="1,234"
                                    description="+5% from last month"
                                />

                                <OverviewCard
                                    title="Total Revenue"
                                    icon={TrendingUpIcon}
                                    data="$2,345"
                                    description="+7.2% from last month"
                                />
                            </div>

                            <div className="grid gap-4 md:grid-cols-2">
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Top Selling Products</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="space-y-4">
                                            {['Product A', 'Product B', 'Product C', 'Product D', 'Product E'].map((product, index) => (
                                                <div key={index} className="flex items-center">
                                                    <Avatar className="h-9 w-9">
                                                        <AvatarImage src={`/placeholder.svg?height=36&width=36`} alt={product} />
                                                        <AvatarFallback>{product[0]}</AvatarFallback>
                                                    </Avatar>
                                                    <div className="ml-4 space-y-1">
                                                        <p className="text-sm font-medium leading-none">{product}</p>
                                                        <p className="text-sm text-muted-foreground">{1000 - index * 100} units sold</p>
                                                    </div>
                                                    <div className="ml-auto font-medium">PHP{(5000 - index * 500).toLocaleString()}</div>
                                                </div>
                                            ))}
                                        </div>
                                    </CardContent>
                                </Card>
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Low Selling Products</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="space-y-4">
                                            {['Product V', 'Product W', 'Product X', 'Product Y', 'Product Z'].map((product, index) => (
                                                <div key={index} className="flex items-center">
                                                    <Avatar className="h-9 w-9">
                                                        <AvatarImage src={`/placeholder.svg?height=36&width=36`} alt={product} />
                                                        <AvatarFallback>{product[0]}</AvatarFallback>
                                                    </Avatar>
                                                    <div className="ml-4 space-y-1">
                                                        <p className="text-sm font-medium leading-none">{product}</p>
                                                        <p className="text-sm text-muted-foreground">{50 - index * 10} units sold</p>
                                                    </div>
                                                    <div className="ml-auto font-medium">PHP{(500 - index * 100).toLocaleString()}</div>
                                                </div>
                                            ))}
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>

                            <Card>
                                <CardHeader>
                                    <CardTitle>Sales Forecast</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    {/* <Line data={salesForecastData} /> */}
                                </CardContent>
                            </Card>
                        </TabsContent>

                        <TabsContent value="more-details" className="mt-6 space-y-4">
                            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                                <OverviewCard
                                    title="Unconfirmed Orders"
                                    icon={ShoppingCartIcon}
                                    data="345"
                                    description="-32% from last month"
                                />

                                <OverviewCard
                                    title="Confirmed Orders"
                                    icon={ShoppingCartIcon}
                                    data="1,234"
                                    description="+76% from last month"
                                />

                                <OverviewCard
                                    title="Delivered Orders"
                                    icon={ShoppingCartIcon}
                                    data="253"
                                    description="+2% from last month"
                                />

                                <OverviewCard
                                    title="Unsuccessful Orders"
                                    icon={ShoppingCartIcon}
                                    data="198"
                                    description="+11% from last month"
                                />
                            </div>

                            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                                <ProductPopularityCard />

                                <OrderStatusDistributionCard />

                                <LocationProductPreferencesCard />

                                <LocationSalesPerformanceCard />
                            </div>
                        </TabsContent>
                    </Tabs>
                </div>
            </main>
        </div>
    )

}

export default DashboardPage;
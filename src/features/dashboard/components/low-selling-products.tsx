"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { formatPrice } from "@/lib/utils"
import { useLowSellingProducts } from "../api/use-low-selling-products"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
export const LowSellingProducts = () => {
    const { data, isLoading } = useLowSellingProducts()
    const [viewType, setViewType] = useState<'revenue' | 'unitSold'>('unitSold')

    if (isLoading) {
        return <Skeleton className="h-[390px] w-full" />
    }

    const renderByUnitSold = () => (
        <div className="space-y-4">
            {data
                ?.sort((a, b) => a.unitsSold - b.unitsSold)
                .map((product, index) => (
                    <div key={index} className="flex items-center">
                        <Avatar className="h-9 w-9">
                            <AvatarImage src={product.image.url as string} alt={product.name} />
                            <AvatarFallback>{product.name.charAt(0).toUpperCase()}</AvatarFallback>
                        </Avatar>
                        <div className="ml-4 space-y-1">
                            <p className="text-sm font-medium leading-none">{product.name}</p>
                            <p className="text-sm text-muted-foreground">{product.category}</p>
                        </div>
                        <div className="ml-auto font-medium">
                            {product.unitsSold} Units Sold
                        </div>
                    </div>
                ))}
        </div>
    )

    const renderByRevenue = () => (
        <div className="space-y-4">
            {data
                ?.sort((a, b) => a.revenue - b.revenue)
                .map((product, index) => (
                    <div key={index} className="flex items-center">
                        <Avatar className="h-9 w-9">
                            <AvatarImage src={product.image.url as string} alt={product.name} />
                            <AvatarFallback>{product.name.charAt(0).toUpperCase()}</AvatarFallback>
                        </Avatar>
                        <div className="ml-4 space-y-1">
                            <p className="text-sm font-medium leading-none">{product.name}</p>
                            <p className="text-sm text-muted-foreground">{product.category}</p>
                        </div>
                        <div className="ml-auto font-medium">
                            {formatPrice(product.revenue)}
                        </div>
                    </div>
                ))}
        </div>
    )

    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Low Selling Products</CardTitle>
                <div className="flex flex-col gap-1 space-x-2 xl:flex-row">
                    <Button
                        variant={viewType === 'unitSold' ? 'default' : 'outline'}
                        onClick={() => setViewType('unitSold')}
                    >
                        By Units Sold
                    </Button>
                    <Button
                        variant={viewType === 'revenue' ? 'default' : 'outline'}
                        onClick={() => setViewType('revenue')}
                    >
                        By Revenue
                    </Button>
                </div>
            </CardHeader>
            <CardContent>
                {viewType === "unitSold" ? renderByUnitSold() : renderByRevenue()}
            </CardContent>
        </Card>
    )
}
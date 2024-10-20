"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useTopSellingProducts } from "../api/use-top-selling-products"
import { formatPrice } from "@/lib/utils"
import { useState } from "react"
import { Button } from "@/components/ui/button"
export const TopSellingProducts = () => {
    const { data, isLoading } = useTopSellingProducts()
    const [viewType, setViewType] = useState<'revenue' | 'unitSold'>('unitSold');

    if (isLoading) return null

    const renderByUnitSold = () => (
        <div className="space-y-4">
            {data
                ?.sort((a, b) => b.unitsSold - a.unitsSold)
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
                ?.sort((a, b) => b.revenue - a.revenue)
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
                <CardTitle>Top Selling Products</CardTitle>
                <div className="space-x-2">
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
            <CardContent className="flex-1 pb-0">
                {viewType === "unitSold" ? renderByUnitSold() : renderByRevenue()}
            </CardContent>
        </Card>
    )
}
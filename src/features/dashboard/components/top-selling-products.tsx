"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useTopSellingProducts } from "../api/use-top-selling-products"
import { formatPrice } from "@/lib/utils"
export const TopSellingProducts = () => {
    const { data, isLoading } = useTopSellingProducts()

    if (isLoading) return null

    console.log(`data here: ${JSON.stringify(data)}`)

    return (
        <Card>
            <CardHeader>
                <CardTitle>Top Selling Products</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    {data?.map((product, index) => (
                        <div key={index} className="flex items-center">
                            <Avatar className="h-9 w-9">
                                {product.image ? (
                                    <AvatarImage src={product.image.url as string} alt={product.name} />
                                ) : (
                                    <AvatarFallback>{product.name.charAt(0).toUpperCase()}</AvatarFallback>
                                )}
                            </Avatar>
                            <div className="ml-4 space-y-1">
                                <p className="text-sm font-medium leading-none">{product.name}</p>
                                <p className="text-sm text-muted-foreground">{product.unitsSold} units sold</p>
                            </div>
                            <div className="ml-auto font-medium">
                                {formatPrice(product.revenue)}
                            </div>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    )
}
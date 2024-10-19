"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { formatPrice } from "@/lib/utils"
import { useLowSellingProducts } from "../api/use-low-selling-products"
export const LowSellingProducts = () => {
    const { data, isLoading } = useLowSellingProducts()

    if (isLoading) return null

    return (
        <Card>
            <CardHeader>
                <CardTitle>Low Selling Products</CardTitle>
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
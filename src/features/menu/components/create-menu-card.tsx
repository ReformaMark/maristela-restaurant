"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { useGenerateUploadUrl } from "@/features/upload/api/use-generate-upload-url"
import { useConvexMutation } from "@convex-dev/react-query"
import { useMutation } from "@tanstack/react-query"
import {
    Clock,
    ImageIcon,
    PackageIcon,
    PlusIcon,
    ShoppingBag
} from 'lucide-react'
import Image from "next/image"
import React, { useRef, useState } from "react"
import { FaPesoSign } from "react-icons/fa6"
import { toast } from "sonner"
import { api } from "../../../../convex/_generated/api"
import { Id } from "../../../../convex/_generated/dataModel"
import { menuCategories, MenuCategoryType } from "../../../../data/menu-data"

type ProductData = {
    category: MenuCategoryType;
    productName: string;
    price: number;
    prepTime: number;
    quantity: number;
    description: string;
    recommended: boolean;
    special: boolean;
    image: File | null;
    storageId?: Id<"_storage">;
}

const initialProductData: ProductData = {
    category: menuCategories[0] as MenuCategoryType,
    productName: '',
    price: 0,
    recommended: false,
    special: false,
    prepTime: 0,
    description: '',
    image: null,
    quantity: 0,
}

export const CreateMenuCard = () => {
    const [productData, setProductData] = useState<ProductData>(initialProductData)
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [previewUrl, setPreviewUrl] = useState<string | null>(null)
    const { mutate: generateUploadUrl } = useGenerateUploadUrl()

    const fileInputRef = useRef<HTMLInputElement>(null)

    const { mutate, isPending } = useMutation({
        mutationFn: useConvexMutation(api.menus.create),
        onSuccess: () => {
            setProductData(initialProductData)
            setPreviewUrl(null)
            toast.success('Product created successfully')
        },
        onError: () => {
            toast.error('Failed to create product')
        },
    })

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target

        setProductData((prevData) => ({
            ...prevData,
            [name]: value,
        }))
    }

    const handleSwitchChange = (name: string) => (checked: boolean) => {
        setProductData((prevData) => ({
            ...prevData,
            [name]: checked,
        }))
    }

    const handleCategoryChange = (value: MenuCategoryType) => {
        setProductData((prevData) => ({
            ...prevData,
            category: value,
        }))
    }

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null

        setProductData((prevData) => ({
            ...prevData,
            image: file,
        }))

        if (file) {
            const reader = new FileReader()
            reader.onloadend = () => {
                setPreviewUrl(reader.result as string)
            }
            reader.readAsDataURL(file)
        } else {
            setPreviewUrl(null)
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        let storageId: Id<"_storage"> | undefined;

        try {
            if (productData.image) {
                const url = await generateUploadUrl({}, {
                    throwError: true
                })

                if (!url) {
                    toast.error('Failed to generate upload URL')
                    return
                }

                const result = await fetch(url, {
                    method: 'POST',
                    body: productData.image,
                    headers: {
                        'Content-Type': productData.image.type
                    }
                })

                if (!result.ok) {
                    toast.error('Failed to upload image')
                    return
                }

                const { storageId: uploadedStorageId } = await result.json()

                storageId = uploadedStorageId
            }

            await mutate({
                category: productData.category,
                name: productData.productName,
                price: Number(productData.price),
                recommended: productData.recommended,
                special: productData.special,
                prepTime: productData.prepTime.toString(),
                description: productData.description,
                image: storageId!,
                quantity: Number(productData.quantity)
            })
        } catch (error: unknown) {
            console.error(error)
            toast.error(error as string)
        }
    }

    const triggerFileInput = () => {
        fileInputRef.current?.click()
    }

    return (
        <Card className="w-full max-w-4xl border-red-200 bg-white shadow-lg transition-all duration-300 hover:shadow-xl">
            <CardHeader className="bg-primary p-6 text-white">
                <CardTitle className="flex items-center text-3xl font-bold">
                    <ShoppingBag className="mr-3 h-8 w-8" />
                    Add New Product
                </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
                <form
                    id="create-product-form"
                    onSubmit={handleSubmit}
                >
                    <div className="grid gap-6 md:grid-cols-2">
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="category" className="text-sm font-medium text-red-700">
                                    Category
                                </Label>
                                <Select
                                    onValueChange={handleCategoryChange}
                                    value={productData.category}
                                    disabled={isPending}
                                >
                                    <SelectTrigger className="border-red-200 bg-red-50 focus:ring-red-500">
                                        <SelectValue placeholder="Select a category" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {menuCategories.map((category) => (
                                            <SelectItem key={category} value={category}>
                                                {category}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="productName" className="text-sm font-medium text-red-700">
                                    Product Name
                                </Label>
                                <div className="relative">
                                    <ShoppingBag className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-red-400" />
                                    <Input
                                        id="productName"
                                        name="productName"
                                        value={productData.productName}
                                        onChange={handleInputChange}
                                        required
                                        className="border-red-200 bg-red-50 pl-10 focus:ring-red-500"
                                        placeholder="Enter product name"
                                        disabled={isPending}
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="price" className="text-sm font-medium text-red-700">
                                        Price
                                    </Label>
                                    <div className="relative">
                                        <FaPesoSign className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-red-400" />
                                        <Input
                                            id="price"
                                            name="price"
                                            type="number"
                                            step="0.01"
                                            value={productData.price}
                                            onChange={handleInputChange}
                                            required
                                            className="border-red-200 bg-red-50 pl-10 focus:ring-red-500"
                                            placeholder="0.00"
                                            min={0}
                                            disabled={isPending}
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="quantity" className="text-sm font-medium text-red-700">
                                        Quantity
                                    </Label>
                                    <div className="relative">
                                        <PackageIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-red-400" />
                                        <Input
                                            id="quantity"
                                            name="quantity"
                                            type="number"
                                            value={productData.quantity}
                                            onChange={handleInputChange}
                                            required
                                            className="border-red-200 bg-red-50 pl-10 focus:ring-red-500"
                                            placeholder="Enter quantity"
                                            min={0}
                                            disabled={isPending}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="prepTime" className="text-sm font-medium text-red-700">
                                    Preparation Time (minutes)
                                </Label>
                                <div className="relative">
                                    <Clock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-red-400" />
                                    <Input
                                        id="prepTime"
                                        name="prepTime"
                                        type="number"
                                        value={productData.prepTime}
                                        onChange={handleInputChange}
                                        required
                                        className="border-red-200 bg-red-50 pl-10 focus:ring-red-500"
                                        placeholder="Enter prep time"
                                        min={0}
                                        disabled={isPending}
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="description" className="text-sm font-medium text-red-700">
                                    Product Description
                                </Label>
                                <Textarea
                                    id="description"
                                    name="description"
                                    value={productData.description}
                                    onChange={handleInputChange}
                                    rows={4}
                                    required
                                    className="border-red-200 bg-red-50 focus:ring-red-500"
                                    placeholder="Describe your product..."
                                    disabled={isPending}
                                />
                            </div>

                            <Separator className="my-4" />

                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <Label htmlFor="recommended" className="text-sm font-medium text-red-700">
                                        Recommended
                                    </Label>
                                    <Switch
                                        id="recommended"
                                        checked={productData.recommended}
                                        onCheckedChange={handleSwitchChange('recommended')}
                                        className="data-[state=checked]:bg-yellow"
                                        disabled={isPending}
                                    />
                                </div>
                                <div className="flex items-center justify-between">
                                    <Label htmlFor="special" className="text-sm font-medium text-red-700">
                                        Special
                                    </Label>
                                    <Switch
                                        id="special"
                                        checked={productData.special}
                                        onCheckedChange={handleSwitchChange('special')}
                                        className="data-[state=checked]:bg-yellow"
                                        disabled={isPending}
                                    />
                                </div>
                            </div>

                            <Separator className="my-2 md:hidden block" />
                        </div>

                        <div className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="image" className="text-sm font-medium text-red-700">
                                    Product Image
                                </Label>
                                <div className="flex flex-col items-center space-y-4">
                                    <div
                                        className="flex h-64 w-full cursor-pointer items-center justify-center rounded-lg border-2 border-dashed border-red-300 bg-red-50 transition-all hover:bg-red-100"
                                        onClick={triggerFileInput}
                                    >
                                        {!!productData.image ? (
                                            // change this src to url object to accept images
                                            <div className="relative h-full w-full">
                                                <Image
                                                    src={URL.createObjectURL(productData.image)}
                                                    alt="Product preview"
                                                    layout="fill"
                                                    objectFit="cover"
                                                    className="rounded-lg"
                                                />
                                            </div>
                                            // <Image src={URL.createObjectURL(productData.image)} alt="Product preview" className="h-full w-full rounded-lg object-cover" fill />

                                            // <div className="p-2">
                                            //     <div className="relative size-[260px] flex items-center justify-center group/image">
                                            //         <button
                                            //             onClick={() => {
                                            //                 setProductData((prevData) => ({
                                            //                     ...prevData,
                                            //                     image: null,
                                            //                 }))
                                            //                 fileInputRef.current!.value = "";
                                            //             }}
                                            //             className="hidden group-hover/image:flex rounded-full bg-black/70 hover:bg-black absolute -top-2.5 -right-2.5 text-white size-6 z-[4] border-white items-center justify-center"
                                            //         >
                                            //             <XIcon className="size-3.5" />
                                            //         </button>
                                            //         <Image
                                            //             src={URL.createObjectURL(productData.image)}
                                            //             alt="Product preview"
                                            //             fill
                                            //             className="h-full w-full rounded-lg object-cover"
                                            //         />
                                            //     </div>
                                            // </div>
                                        ) : (
                                            <div className="text-center">
                                                <ImageIcon className="mx-auto h-12 w-12 text-red-400" />
                                                <p className="mt-2 text-sm text-gray-500">Click to upload or drag and drop</p>
                                                <p className="text-xs text-gray-500">SVG, PNG, JPG or GIF (max. 800x400px)</p>
                                            </div>
                                        )}
                                    </div>
                                    {/* <Button
                                        type="button"
                                        variant="outline"
                                        onClick={triggerFileInput}
                                        className="w-full border-red-200 text-red-600 hover:bg-red-50"
                                    >
                                        <UploadIcon className="mr-2 h-4 w-4" />
                                        Upload Image
                                    </Button> */}
                                    <input
                                        ref={fileInputRef}
                                        type="file"
                                        id="image"
                                        name="image"
                                        accept="image/*"
                                        onChange={handleImageChange}
                                        className="hidden"
                                        disabled={isPending}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </CardContent>
            <CardFooter className="flex justify-end space-x-4 bg-gray-50 p-6">
                <Button
                    type="submit"
                    form="create-product-form"
                    className="bg-primary text-white transition-all duration-300 ease-in hover:bg-primary/90"
                    disabled={isPending}
                >
                    <PlusIcon className="mr-2 h-5 w-5" />
                    Add Product
                </Button>
            </CardFooter>
        </Card >
    )
}
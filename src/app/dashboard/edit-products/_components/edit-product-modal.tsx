import { useRef, useState } from "react";

import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";

import {
    ClockIcon,
    PackageIcon,
    ShoppingBag,
    UploadIcon
} from 'lucide-react';

import { Separator } from "@/components/ui/separator";
import { FaPesoSign } from "react-icons/fa6";
import { menuCategories, MenuCategoryType, MenuDataWithRatings } from "../../../../../data/menu-data";
import { useMutation } from "@tanstack/react-query";
import { useConvexMutation } from "@convex-dev/react-query";
import { api } from "../../../../../convex/_generated/api";
import { toast } from "sonner";
import { useGenerateUploadUrl } from "@/features/upload/api/use-generate-upload-url";
import { Id } from "../../../../../convex/_generated/dataModel";
import { useConfirm } from "@/hooks/use-confirm";
import Image from "next/image";


interface EditProductModalProps {
    productData: MenuDataWithRatings;
    editOpen: boolean;
    setEditOpen: () => void;
}

export const EditProductModal = ({
    editOpen,
    productData,
    setEditOpen,
}: EditProductModalProps) => {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [currentProductData, setCurrentProductData] = useState<MenuDataWithRatings>(productData)
    const [ConfirmDialog, confirm] = useConfirm(
        "Are you sure you want to update this product?",
        "By updating this product, it will be listed in the menu instantly.",
    )
    const fileInputRef = useRef<HTMLInputElement>(null)

    const { mutate: generateUploadUrl } = useGenerateUploadUrl()

    const { mutate: updateMenu, isPending } = useMutation({
        mutationFn: useConvexMutation(api.menus.updateMenu),
        onSuccess: () => {
            toast.success('Product updated successfully')
            setEditOpen()
        },
        onError: (error) => {
            console.error(error)
        }
    })

    const triggerFileInput = () => {
        fileInputRef.current?.click()
    }

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null
        setSelectedFile(file)

        if (file) {
            const reader = new FileReader()
            reader.onloadend = () => {
                setCurrentProductData(prev => ({
                    ...prev!,
                    url: reader.result as string,
                }))
            }
            reader.readAsDataURL(file)
        }
    }

    const handleUpdate = async (e: React.FormEvent) => {
        e.preventDefault()

        const ok = await confirm()

        if (!ok) return

        let newStorageId: Id<"_storage"> | undefined = currentProductData.imageId;

        try {
            if (selectedFile) {
                const uploadUrl = await generateUploadUrl({}, { throwError: true });

                if (!uploadUrl) {
                    toast.error("Failed to generate upload URL");
                    return;
                }

                const result = await fetch(uploadUrl, {
                    method: 'POST',
                    body: selectedFile,
                    headers: {
                        'Content-Type': selectedFile.type
                    }
                });

                if (!result.ok) {
                    toast.error('Failed to upload image');
                    return;
                }

                const { storageId } = await result.json();
                newStorageId = storageId;
            }

            await updateMenu({
                id: productData._id,
                name: currentProductData.name,
                prepTime: currentProductData.prepTime,
                description: currentProductData.description,
                recommended: currentProductData.recommended,
                special: currentProductData.special,
                price: currentProductData.price,
                quantity: currentProductData.quantity,
                category: currentProductData.category,
                image: newStorageId,
            });

        } catch (error) {
            toast.error(error instanceof Error ? error.message : 'An unknown error occurred');
        }
    }

    return (
        <>

            <ConfirmDialog />

            <Dialog open={editOpen} onOpenChange={setEditOpen}>
                <DialogContent className="sm:max-w-[700px]" onClick={(e) => e.stopPropagation()}>
                    <DialogHeader>
                        <DialogTitle className="text-red-600">Edit Product</DialogTitle>
                    </DialogHeader>
                    <form onSubmit={handleUpdate}>
                        <div className="grid gap-4 py-4 md:grid-cols-2">
                            <div className="space-y-4">
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="name" className="text-right text-red-600">
                                        Product Name
                                    </Label>
                                    <div className="relative col-span-3">
                                        <ShoppingBag className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-red-400" />
                                        <Input
                                            id="name"
                                            value={currentProductData?.name}
                                            onChange={(e) => {
                                                setCurrentProductData(prev => ({
                                                    ...prev!,
                                                    name: e.target.value,
                                                }))
                                            }}
                                            className="border-red-200 bg-red-50 pl-10 focus:ring-red-500"
                                        />
                                    </div>
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="price" className="text-right text-red-600">
                                        Price
                                    </Label>
                                    <div className="relative col-span-3">
                                        <FaPesoSign className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-red-400" />
                                        <Input
                                            id="price"
                                            type="number"
                                            value={currentProductData?.price}
                                            onChange={(e) => {
                                                setCurrentProductData(prev => ({
                                                    ...prev!,
                                                    price: parseFloat(e.target.value),
                                                }))
                                            }}
                                            className="col-span-3 border-red-200 bg-red-50 pl-10 focus:ring-red-500"
                                        />
                                    </div>
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="quantity" className="text-right text-red-600">
                                        Quantity
                                    </Label>
                                    <div className="relative col-span-3">
                                        <PackageIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-red-400" />
                                        <Input
                                            id="quantity"
                                            type="number"
                                            value={currentProductData?.quantity}
                                            onChange={(e) => {
                                                setCurrentProductData(prev => ({
                                                    ...prev!,
                                                    quantity: parseFloat(e.target.value),
                                                }))
                                            }}
                                            className="col-span-3 border-red-200 bg-red-50 pl-10 focus:ring-red-500"
                                        />
                                    </div>
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="prepTime" className="text-sm font-medium text-red-700">
                                        Preparation Time (minutes)
                                    </Label>
                                    <div className="relative col-span-3">
                                        <ClockIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-red-400" />
                                        <Input
                                            id="prepTime"
                                            name="prepTime"
                                            type="number"
                                            value={currentProductData?.prepTime}
                                            onChange={(e) => {
                                                setCurrentProductData(prev => ({
                                                    ...prev!,
                                                    prepTime: e.target.value,
                                                }))
                                            }}
                                            required
                                            className="border-red-200 bg-red-50 pl-10 focus:ring-red-500 col-span-3"
                                            placeholder="Enter prep time"
                                            min={0}
                                        />
                                    </div>
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="category" className="text-right text-red-600">
                                        Category
                                    </Label>
                                    <Select
                                        value={currentProductData?.category}
                                        onValueChange={(v) => {
                                            setCurrentProductData(prev => ({
                                                ...prev!,
                                                category: v as MenuCategoryType,
                                            }))
                                        }}
                                    >
                                        <SelectTrigger className="col-span-3 border-red-200 bg-red-50 focus:ring-red-500">
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
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="description" className="text-sm font-medium text-red-700">
                                        Description
                                    </Label>
                                    <Textarea
                                        id="description"
                                        value={currentProductData?.description}
                                        onChange={(e) => {
                                            setCurrentProductData(prev => ({
                                                ...prev!,
                                                description: e.target.value,
                                            }))
                                        }}
                                        className="col-span-3 border-red-200 bg-red-50 focus:ring-red-500"
                                    />
                                </div>

                                <Separator className="my-4" />

                                <div className="grid grid-cols-4 items-center gap-4 space-x-7">
                                    <Label htmlFor="recommended" className="text-right text-red-600">
                                        Recommended
                                    </Label>
                                    <Switch
                                        id="recommended"
                                        checked={currentProductData?.recommended}
                                        onCheckedChange={(c) => {
                                            setCurrentProductData(prev => ({
                                                ...prev!,
                                                recommended: c,
                                            }))
                                        }}
                                        className="col-span-3 data-[state=checked]:bg-yellow"
                                    />
                                </div>

                                <div className="grid grid-cols-4 items-center gap-4 space-x-7">
                                    <Label htmlFor="special" className="text-right text-red-600">
                                        Special
                                    </Label>
                                    <Switch
                                        id="special"
                                        checked={currentProductData?.special}
                                        onCheckedChange={(c) => {
                                            setCurrentProductData(prev => ({
                                                ...prev!,
                                                special: c,
                                            }))
                                        }}
                                        className="col-span-3 data-[state=checked]:bg-yellow"
                                    />
                                </div>
                            </div>
                            <div className="flex flex-col items-center justify-center space-y-4">
                                <div className="relative h-48 w-48 overflow-hidden rounded-lg border-2 border-dashed border-red-300">
                                    {/* <img
                                        src={currentProductData?.url as string}
                                        alt={currentProductData?.name}
                                        className="h-full w-full object-cover"
                                    /> */}
                                    <Image
                                        src={currentProductData?.url as string}
                                        alt={currentProductData?.name}
                                        layout="fill"
                                        objectFit="cover"
                                        className="rounded-lg"
                                    />
                                </div>
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={triggerFileInput}
                                    className="w-48 border-red-200 text-red-600 hover:bg-red-50"
                                >
                                    <UploadIcon className="mr-2 h-4 w-4" />
                                    Change Image
                                </Button>
                                <input
                                    ref={fileInputRef}
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageChange}
                                    className="hidden"
                                />
                            </div>
                        </div>
                        <DialogFooter>
                            <Button type="submit" className="bg-red-600 text-white hover:bg-red-700" disabled={isPending}>
                                {isPending ? 'Saving...' : 'Save changes'}
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </>

    )
}
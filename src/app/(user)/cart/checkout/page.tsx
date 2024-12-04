'use client'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useMutation, useQuery } from 'convex/react'
import { api } from '../../../../../convex/_generated/api'
import { toast } from 'sonner'
import { formatPrice } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { barangays } from '@/lib/data'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Id } from '../../../../../convex/_generated/dataModel'
import { Card } from '@/components/ui/card'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'

const shippingFormSchema = z.object({
    firstname: z.string().min(1, "First name is required"),
    lastName: z.string().min(1, "Last name is required"), 
    streetAddress: z.string().min(1, "Street address is required"),
    apartmentNumber: z.string().optional(),
    barangay: z.string().min(1, "Barangay is required"),
    municipality: z.string().min(1, "Municipality is required"),
    province: z.string(),
    address: z.string().min(1, "Complete address is required"),
    phoneNumber: z.string().min(11, "Phone number must be 11 digits").max(11)
})

type ShippingFormValues = z.infer<typeof shippingFormSchema>

function CheckoutPage() {
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [showAddressForm, setShowAddressForm] = useState<boolean>(false)
    const [selectedAddressId, setSelectedAddressId] = useState<Id<"shippingAddress"> | null>(null)
    const cartItems = useQuery(api.cartItems.getCartItems)
    const savedAddresses = useQuery(api.shippingAddress.getShippingAddresses)
    const createOrder = useMutation(api.orders.createOrders)
    const createTransaction = useMutation(api.transactions.createTransaction)
    const createShippingAddress = useMutation(api.shippingAddress.createShippinngAddress)
    const deleteCartitems = useMutation(api.cartItems.deleteCartItems)
    const updateShippingAddress = useMutation(api.shippingAddress.updateShippingAddress)
    const router = useRouter()

    const form = useForm<ShippingFormValues>({
        resolver: zodResolver(shippingFormSchema),
        defaultValues: {
            firstname: "",
            lastName: "",
            streetAddress: "",
            apartmentNumber: "",
            barangay: "",
            municipality: "",
            province: "Batangas",
            address: "",
            phoneNumber: "",
        } 
    })

    function calcTotal(quantity?: number, price?: number) {
        return quantity && price ? quantity * price : 0
    }

    const subTotal = cartItems && cartItems.reduce((accumulator, item) => {
        return accumulator + ((item?.menu?.price || 0) * (item?.quantity || 0));
    }, 0);

    const onSaveAddress = async (data: ShippingFormValues) => {
        if (savedAddresses && savedAddresses.length >= 2) {
            toast.error("You can only save up to 2 addresses")
            return
        }

        try {
            const id = await createShippingAddress({
                firstname: data.firstname,
                lastName: data.lastName,
                streetAddress: data.streetAddress,
                apartmentNumber: data.apartmentNumber || "",
                barangay: data.barangay,
                municipality: data.municipality,
                province: data.province,
                address: data.address,
                phoneNumber: data.phoneNumber,
                isSaved: true
            })

            if (!id) {
                throw new Error("Failed to create shipping address.")
            }

            setSelectedAddressId(id)
            setShowAddressForm(false)
            form.reset()
            toast.success("Shipping address saved successfully!")
        } catch (error) {
            console.error("Failed to save shipping address:", error)
            toast.error("Failed to save shipping address. Please try again.")
        }
    }

    const onRemoveAddress = async (addressId: Id<"shippingAddress">) => {
        try {
            await updateShippingAddress({
                shippingId: addressId,
                isSaved: false
            })
            toast.success("Address removed from saved addresses")
            if (selectedAddressId === addressId) {
                setSelectedAddressId(null)
            }
        } catch (error) {
            console.error("Failed to remove address:", error)
            toast.error("Failed to remove address. Please try again.")
        }
    }

    const onPlaceOrder = async () => {
        setIsLoading(true)
        if (!cartItems || cartItems.length === 0 || !selectedAddressId) {
            toast.error("Please select a shipping address first")
            setIsLoading(false)
            return
        }

        try {
            const orders = await Promise.all(
                cartItems.map(async (item) => {
                    if (!item) {
                        return null
                    }

                    const menuName = item.menu?.name
                    const totalPrice = item.quantity * (item.menu?.price || 1)
                    const ids = await createOrder({
                        menuId: item.menuId,
                        menuName: menuName,
                        quantity: item.quantity,
                        status: 'unconfirmed',
                        totalPrice: totalPrice,
                    })

                    return ids || null
                })
            )

            const validOrders = orders.filter(order => order !== null)

            if (validOrders.length === 0) {
                throw new Error("Failed to create orders.")
            }

            toast.promise(createTransaction({
                orders: validOrders,
                status: 'Pending',
                mop: 'COD',
                shippingId: selectedAddressId,
            }), {
                loading: 'Placing your order...',
                success: "Order placed successfully!",
                error: 'Error occurred while placing the order.',
            })

            cartItems.forEach((item) => {
                if (!item) {
                    throw new Error("Failed to delete your cart items.")
                }
                deleteCartitems({ cartItemsId: item._id })
            })
            router.push('/cart/checkout/order-place')  
            setIsLoading(false)
        } catch (error) {
            console.error("Order submission failed:", error)
            toast.error("Failed to place the order. Please try again.")
            setIsLoading(false)
        }
    }

    return (
        <div className='px-3 sm:px-10 md:px-15 lg:px-24 text-text mb-24'>
            <h1 className='text-primary font-bold text-xl mb-5 text-center uppercase'>Checkout</h1> 
            <div className="grid grid-cols-12 justify-between md:gap-x-10 space-y-10">
                <div className="col-span-12 md:col-span-7">
                    <div className="flex justify-between items-center mb-5">
                        <h1 className='text-left text-lg font-medium text-primary tracking-wider'>
                            Shipping Address <span className='text-primary'>*</span>
                        </h1>
                        {(!savedAddresses || savedAddresses.filter(addr => addr.isSaved).length < 2) && (
                            <Button 
                                variant="outline" 
                                onClick={() => setShowAddressForm(!showAddressForm)}
                            >
                                {showAddressForm ? 'Cancel' : 'Add New Address'}
                            </Button>
                        )}
                    </div>

                    {savedAddresses && savedAddresses.filter(addr => addr.isSaved).length > 0 && (
                        <RadioGroup 
                            className="gap-4 mb-5"
                            value={selectedAddressId as string} 
                            onValueChange={(value) => setSelectedAddressId(value as Id<"shippingAddress">)}
                        >
                            {savedAddresses.filter(addr => addr.isSaved).map((address) => (
                                <div key={address._id} className="flex items-center space-x-4">
                                    <RadioGroupItem value={address._id} id={address._id} />
                                    <Card className="flex-1 p-4 cursor-pointer hover:border-primary">
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <div className="font-medium">
                                                    {address.firstname} {address.lastName}
                                                </div>
                                                <h1>{address.phoneNumber}</h1>
                                                <>
                                                    {address?.apartmmentNumer && (
                                                        <span>{address.apartmmentNumer} </span>
                                                    )}
                                                    {address.streetAddress && (
                                                        <span>{address?.streetAddress}</span>
                                                    )}
                                                </>
                                                {address?.barangay && (
                                                    <>
                                                        <span>, {address?.barangay}, </span>
                                                        <span>{address?.muncipality}, </span>
                                                        <span>{address?.province}</span>
                                                    </>
                                                )}
                                            </div>
                                            <Button 
                                                variant="ghost" 
                                                size="sm"
                                                className="text-red-500 hover:text-red-700"
                                                onClick={() => onRemoveAddress(address._id)}
                                            >
                                                Remove
                                            </Button>
                                        </div>
                                    </Card>
                                </div>
                            ))}
                        </RadioGroup>
                    )}

                    {showAddressForm && (
                        <form
                            id="create-shipping-form"
                            onSubmit={form.handleSubmit(onSaveAddress)}
                            className="space-y-5"
                        >
                            <div className="grid grid-cols-2 gap-x-5">
                                <div className="space-y-2">
                                    <Label htmlFor="firstname" className="text-sm font-medium text-red-700">
                                        First Name <span className='text-primary'>*</span>
                                    </Label>
                                    <div className="relative">
                                        <Input
                                            {...form.register("firstname")}
                                            className="border-red-200 bg-red-50 pl-10 focus:ring-red-500"
                                            placeholder="First Name"
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="lastName" className="text-sm font-medium text-red-700">
                                        Last Name <span className='text-primary'>*</span>
                                    </Label>
                                    <div className="relative">
                                        <Input
                                            {...form.register("lastName")}
                                            className="border-red-200 bg-red-50 pl-10 focus:ring-red-500"
                                            placeholder="Last Name"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-5">
                                <div className="space-y-2">
                                    <Label htmlFor="province" className="text-sm font-medium text-red-700">
                                        Province <span className='text-primary'>*</span>
                                    </Label>
                                    <Input
                                        {...form.register("province")}
                                        value="Batangas"
                                        disabled
                                        className="border-red-200 bg-red-50 pl-10 focus:ring-red-500"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="municipality" className="text-sm font-medium text-red-700">
                                        Municipality <span className='text-primary'>*</span>
                                    </Label>
                                    <Select
                                        onValueChange={(value) => form.setValue('municipality', value)}
                                    >
                                        <SelectTrigger className="col-span-3 border-red-200 bg-red-50 focus:ring-red-500">
                                            <SelectValue placeholder="Select a municipality" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {[...new Set(barangays.map(barangay => barangay.municipality))].map((municipality) => (
                                                <SelectItem key={municipality} value={municipality}>
                                                    {municipality}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="barangay" className="text-sm font-medium text-red-700">
                                        Barangay <span className='text-primary'>*</span>
                                    </Label>
                                    <Select
                                        disabled={!form.watch('municipality')}
                                        onValueChange={(value) => form.setValue('barangay', value)}
                                    >
                                        <SelectTrigger className="col-span-3 border-red-200 bg-red-50 focus:ring-red-500">
                                            <SelectValue placeholder="Select a barangay" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {barangays
                                                .filter(b => b.municipality === form.watch('municipality'))
                                                .map((barangay) => (
                                                    <SelectItem key={barangay.barangay} value={barangay.barangay}>
                                                        {barangay.barangay}
                                                    </SelectItem>
                                                ))
                                            }
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="streetAddress" className="text-sm font-medium text-red-700">
                                        Street <span className='text-primary'>*</span>
                                    </Label>
                                    <div className="relative">
                                        <Input
                                            {...form.register("streetAddress")}
                                            className="border-red-200 bg-red-50 pl-10 focus:ring-red-500"
                                            placeholder="Street"
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="apartmentNumber" className="text-sm font-medium text-red-700">
                                        Bldg/Apartment Number
                                    </Label>
                                    <div className="relative">
                                        <Input
                                            {...form.register("apartmentNumber")}
                                            className="border-red-200 bg-red-50 pl-10 focus:ring-red-500"
                                            placeholder="Bldg/Apartment Number"
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="phoneNumber" className="text-sm font-medium text-red-700">
                                        Phone Number <span className='text-primary'>*</span>
                                    </Label>
                                    <div className="relative">
                                        <Input
                                            {...form.register("phoneNumber")}
                                            type="tel"
                                            className="border-red-200 bg-red-50 pl-10 focus:ring-red-500"
                                            placeholder="Phone Number"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="address" className="text-sm font-medium text-red-700">
                                    Complete Address <span className='text-primary'>*</span>
                                </Label>
                                <div className="relative">
                                    <Input
                                        {...form.register("address")}
                                        className="border-red-200 bg-red-50 pl-10 focus:ring-red-500"
                                        placeholder="Complete Address"
                                    />
                                </div>
                            </div>
                            <Button
                                type="submit"
                                className="w-full mt-5 bg-primary text-white hover:bg-primary/90 transition-all duration-300"
                                disabled={isLoading}
                            >
                                Save Shipping Details
                            </Button>
                        </form>
                    )}
                </div>
                <div className="h-fit col-span-12 md:col-span-5 border border-gray-200 p-3 rounded-lg md:p-5">
                    <h1 className='uppercase text-lg font-semibold mb-5 text-center'>Order Summary</h1>
                    {cartItems && cartItems.map((item)=>(
                        <div key={item?._id} className="flex justify-between border-b-1 border-gray-800 ">
                            <h1 className=''>{item?.quantity} x {item?.menu?.name}</h1>
                            <h1>{formatPrice(calcTotal(item?.quantity, item?.menu?.price))}</h1>
                        </div>
                    ))}
                    <div className="flex justify-between mt-10 border-t-2 border-t-gray-500 pt-3">
                        <h1>Subtotal</h1>
                        <h1>{formatPrice(subTotal || 0)}</h1>
                    </div>
                    <div className="flex justify-between text-text text-sm">
                        <h1>Shipping Fee</h1>
                        <h1>{formatPrice(80)}</h1>
                    </div>
                    <div className="flex justify-between text-black font-semibold mt-3">
                        <h1 className=''>Total</h1>
                        <h1>{formatPrice(subTotal ? subTotal + 80 : 0)}</h1>
                    </div>
                    <Button
                        onClick={onPlaceOrder}
                        className="bg-primary uppercase text-bold w-full mt-5 tracking-widest text-white transition-all duration-300 ease-in hover:bg-primary/90"
                        disabled={isLoading || !selectedAddressId}
                    >
                        Place Order
                    </Button>
                    <h1 className='text-xs text-text font-thin'>* We are only accepting Cash On Delivery(COD) payment method.</h1>
                </div>
            </div>
        </div>
    )
}

export default CheckoutPage
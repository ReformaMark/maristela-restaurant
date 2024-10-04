'use client'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useQuery } from 'convex/react'
import { api } from '../../../../../convex/_generated/api'
import { toast, Toaster } from 'sonner'
import { formatPrice } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'

type ShippingAddress = {
    firstname: string,
    lastName: string,
    streetAddress: string,
    apartmmentNumer: string,
    address:string,
    phoneNumber: string,
}

const initialShipppinginfo: ShippingAddress = {
    firstname: "",
    lastName: "",
    streetAddress: "",
    apartmmentNumer: "",
    address: "",
    phoneNumber: "",
}

function CheckoutPage() {
    const [shippingInfo, setShippingInfo] = useState<ShippingAddress>(initialShipppinginfo)
    const cartartItems = useQuery(api.cartItems.getCartItems)
    // const user = useQuery(api.users.current)
    const router = useRouter()

 
    //calculate the total price of an item
    function calcTotal(quantity?:number,price?:number){
        return quantity && price ? quantity * price : 0
    }

    //calculate the total price of all the items in the cart
    const subTotal = cartartItems && cartartItems.reduce((accumulator, item) => {
        return accumulator + ((item?.menu?.price||0) * (item?.quantity || 0)) ;
    }, 0);

    if(cartartItems && cartartItems?.length < 1){
        router.back()
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target

        setShippingInfo((prevData) => ({
            ...prevData,
            [name]: value,
        }))
    }

    const promise = () => new Promise((resolve) => setTimeout(() => resolve({ name: 'Sonner' }), 2000));

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        toast.promise(promise, {
            loading: 'Placing your order...',
            success: (data) => {
                return `It's a prank! Hinde pa po tapos!`;
            },
            error: 'Error',
            });

    }   


  return (
    <div className='mt-20 md:mt-20 lg:mt-28 px-1 sm:px-10 md:px-15 lg:px-24  text-text mb-24'>
        <h1 className='text-primary font-bold text-xl mb-5 text-center uppercase'>Checkout</h1> 
        <Toaster richColors/>
        <div className="grid grid-cols-12 justify-between gap-x-10">
            <div className="col-span-7">
                <h1 className='text-left text-lg font-medium text-primary tracking-wider'>Shipping Address <span className='text-primary'>*</span></h1>
                <form
                    id="create-shipping-form"
                    onSubmit={handleSubmit}
                >
                    <div className="grid grid-cols-2 gap-x-5">
                        <div className="space-y-2">
                            <Label htmlFor="productName" className="text-sm font-medium text-red-700">
                                First Name <span className='text-primary'>*</span>
                            </Label>
                            <div className="relative">
                                <Input
                                    id="firstname"
                                    name="firstname"
                                    value={shippingInfo.firstname}
                                    onChange={handleInputChange}
                                    required
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
                                    id="lastName"
                                    name="lastName"
                                    value={shippingInfo.lastName}
                                    onChange={handleInputChange}
                                    required
                                    className="border-red-200 bg-red-50 pl-10 focus:ring-red-500"
                                    placeholder="Last Name"
                                
                                />
                            </div>
                        </div>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="streetAddress" className="text-sm font-medium text-red-700">
                            Street <span className='text-primary'>*</span>
                        </Label>
                        <div className="relative">
                            <Input
                                id="streetAddress"
                                name="streetAddress"
                                value={shippingInfo.streetAddress}
                                onChange={handleInputChange}
                                required
                                className="border-red-200 bg-red-50 pl-10 focus:ring-red-500"
                                placeholder="Street"
                            
                            />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="apartmmentNumer" className="text-sm font-medium text-red-700">
                            Bldg/Apartment Number <span className='text-primary'>*</span>
                        </Label>
                        <div className="relative">
                            <Input
                                id="apartmmentNumer"
                                name="apartmmentNumer"
                                value={shippingInfo.apartmmentNumer}
                                onChange={handleInputChange}
                            
                                className="border-red-200 bg-red-50 pl-10 focus:ring-red-500"
                                placeholder="Bldg/Apartment Number"
                            
                            />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="address" className="text-sm font-medium text-red-700">
                            Commplete Address <span className='text-primary'>*</span>
                        </Label>
                        <div className="relative">
                            <Input
                                id="address"
                                name="address"
                                value={shippingInfo.address}
                                onChange={handleInputChange}
                                required
                                className="border-red-200 bg-red-50 pl-10 focus:ring-red-500"
                                placeholder="Complete Address"
                            
                            />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="phoneNumber" className="text-sm font-medium text-red-700">
                            Phone Number <span className='text-primary'>*</span>
                        </Label>
                        <div className="relative">
                            <Input
                                id="phoneNumber"
                                name="phoneNumber"
                                value={shippingInfo.phoneNumber}
                                onChange={handleInputChange}
                                required
                                className="border-red-200 bg-red-50 pl-10 focus:ring-red-500"
                                placeholder="Phone Number"
                            
                            />
                        </div>
                    </div>
                
                </form>
            </div>
            <div className="col-span-5 border border-gray-200  rounded-lg 600 p-5">
                <h1 className='uppercase text-lg font-semibold mb-5 text-center'>Order Summary</h1>
                {cartartItems && cartartItems.map((item)=>(
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
                    <h1>{formatPrice(subTotal ? subTotal+80 : 0)}</h1>
                </div>
                <Button
                    type="submit"
                    form="create-shipping-form"
                    className="bg-primary uppercase text-bold w-full mt-5 tracking-widest text-white transition-all duration-300 ease-in hover:bg-primary/90"
                    
                >
                  Place Order
                </Button>
                <h1 className='text-xs text-text font-thin '>* We are only accepting Cash On Delivery(COD) payment method.</h1>
            </div>
        </div>
        
        
    </div>
  )
}

export default CheckoutPage
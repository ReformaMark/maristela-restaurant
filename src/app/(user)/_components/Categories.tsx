'use client'
import { useQuery } from 'convex/react'
import Link from 'next/link'
import React from 'react'
import { api } from '../../../../convex/_generated/api'
import Image from 'next/image'
import Pasta from '@/../public/img/CANTON_BIHON-removebg-preview.png'
import Silog from '@/../public/img/CHICKSILOG-removebg-preview.png'
import Pork from '@/../public/img/CRISPY_PATA-removebg-preview.png'
import Chicken from '@/../public/img/HOMESTYLE_CHICKEN-removebg-preview.png'
import Beverages from '@/../public/img/ICED_TEA-removebg-preview.png'
import Extra from '@/../public/img/JAVA_RICE_PLATTER-removebg-preview.png'
import Desserts from '@/../public/img/LECHE_FLAN-removebg-preview.png'
import Vegggies from '@/../public/img/PINAKBET-removebg-preview.png'
import Seafood from '@/../public/img/SINIGANG_NA_MAYA_MAYA-removebg-preview.png'
import SizzlingPlate from '@/../public/img/SIZZLING_TANIGUE-removebg-preview.png'
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
  } from "@/components/ui/carousel"
import { Card, CardContent } from "@/components/ui/card"
function Categories() {
    const allmenus = useQuery(api.menus.allMenus);
    const menus = allmenus?.filter(menu => menu.isArchived === false)
    const numberOfPork = ()=>{
        return menus?.filter((menu)=> menu.category === 'Pork').length
    }
    const numberOfChicken = ()=>{
        return menus?.filter((menu)=> menu.category === 'Chicken').length
    }
    const numberOfPP = ()=>{
        return menus?.filter((menu)=> menu.category === 'Pancit & Pasta').length
    }
    const numberOfExtras = ()=>{
        return menus?.filter((menu)=> menu.category === 'Extras').length
    }
    const numberOfBeverages = ()=>{
        return menus?.filter((menu)=> menu.category === 'Beverages').length
    }
    const numberOfSP = ()=>{
        return menus?.filter((menu)=> menu.category === 'Sizzling Plate').length
    }
    const numberOfSSM= ()=>{
        return menus?.filter((menu)=> menu.category === 'Super Silog Meals').length
    }
    const numberOfSeafood = ()=>{
        return menus?.filter((menu)=> menu.category === 'Seafood').length
    }
    const numberOfVeggies = ()=>{
        return menus?.filter((menu)=> menu.category === 'Veggies').length
    }
  return (
        <Carousel
          opts={{
            align: "start",
          }}
          className="w-full "
        >
          <CarouselContent className='mx-5'>
            <CarouselItem className="pl-1 md:basis-1/3 lg:basis-1/4">
                <div className="p-1">
                <Card>
                    <CardContent className="flex aspect-square bg-gray-100 items-center justify-center p-6">
                        <Link href={`/Beverages`} className=" hover:text-primary flex flex-col items-center justify-center text-text text-lg font-medium transition-colors duration-400 ease-in-out">
                            <Image src={Beverages} alt='Pork' width={500} height={500} className='s size-56 object-cover  hover:scale-105 transition-all duration-400 shadow-sm ease-in-out'/>
                            <div className="flex justify-center gap-x-1 items-center mt-[-30px] bg-white text-black w-full text-lg font-cairo font-bold py-1 uppercase">
                                <h1>Beverages</h1>
                                <h1>({numberOfBeverages()})</h1>
                            </div>
                        </Link>
                    </CardContent>
                </Card>
                </div>
            </CarouselItem>
            <CarouselItem className="pl-5 md:basis-1/3 lg:basis-1/4">
                <div className="">
                <Card>
                    <CardContent className="flex aspect-square bg-gray-100 items-center justify-center p-6">
                        <Link href={`/Chicken`}   className=" hover:text-primary flex flex-col items-center justify-center text-text text-lg font-medium transition-colors duration-400 ease-in-out">
                        <Image src={Chicken} alt='Pork' width={200} height={200} className='s size-56 object-cover   hover:scale-105 transition-all duration-400 shadow-sm ease-in-out'/>
                            <div className="flex justify-center gap-x-1 items-center mt-[-30px] bg-white text-black w-full text-lg font-cairo font-bold py-1 uppercase">
                                <h1>Chicken</h1>
                                <h1>({numberOfChicken()})</h1>
                            </div>
                        </Link>
                    </CardContent>
                </Card>
                </div>
            </CarouselItem>
            <CarouselItem className="pl-5 md:basis-1/3 lg:basis-1/4">
                <div className="">
                <Card>
                    <CardContent className="flex aspect-square bg-gray-100 items-center justify-center p-6">
                        <Link href={`/Desserts`} className=" hover:text-primary flex flex-col items-center justify-center text-text text-lg font-medium transition-colors duration-400 ease-in-out">
                            <Image src={Desserts} alt='Pork' width={200} height={200} className='s size-56 object-cover   hover:scale-105 transition-all duration-400 shadow-sm ease-in-out'/>
                            <div className="flex justify-center gap-x-1 items-center mt-[-30px] bg-white text-black w-full text-lg font-cairo font-bold py-1 uppercase">
                                    <h1>Desserts</h1>
                                    <h1>({numberOfVeggies()})</h1>
                                </div>
                        </Link>
                    </CardContent>
                </Card>
                </div>
            </CarouselItem>
            <CarouselItem className="pl-5 md:basis-1/3 lg:basis-1/4">
                <div className="">
                <Card>
                    <CardContent className="flex aspect-square bg-gray-100 items-center justify-center p-6">
                        <Link href={`/Extras`} className=" hover:text-primary flex flex-col items-center justify-center text-text text-lg font-medium transition-colors duration-400 ease-in-out">
                            <Image src={Extra} alt='Pork' width={200} height={200} className='s size-56 object-cover   hover:scale-105 transition-all duration-400 shadow-sm ease-in-out'/>
                            <div className="flex justify-center gap-x-1 items-center mt-[-30px] bg-white text-black w-full text-lg font-cairo font-bold py-1 uppercase">
                                <h1>Extras</h1>
                                <h1>({numberOfExtras()})</h1>
                            </div>
                        </Link>
                    </CardContent>
                </Card>
                </div>
            </CarouselItem>
            <CarouselItem className="pl-5 md:basis-1/4 lg:basis-1/4">
                <div className="">
                <Card>
                    <CardContent className="flex aspect-square bg-gray-100 items-center justify-center p-6">
                        <Link href={`/Pancit & Pasta`} className=" hover:text-primary flex flex-col items-center justify-center text-text text-lg font-medium transition-colors duration-400 ease-in-out">
                            <Image src={Pasta} alt='Pork' width={200} height={200} className='s size-56 object-cover   hover:scale-105 transition-all duration-400 shadow-sm ease-in-out'/>
                            <div className="flex justify-center gap-x-1 items-center mt-[-30px] bg-white text-black w-full text-[0.6rem] md:text-lg font-cairo font-bold py-1 uppercase">
                                <h1>Pancit & Pasta</h1>
                                <h1>({numberOfPP()})</h1>
                            </div>
                        </Link>
                    </CardContent>
                </Card>
                </div>
            </CarouselItem>
            <CarouselItem className="pl-5 md:basis-1/4 lg:basis-1/4">
                <div className="">
                <Card>
                    <CardContent className="flex aspect-square bg-gray-100 items-center justify-center p-6">
                        <Link href={`/Pork`} className=" hover:text-primary flex flex-col items-center justify-center text-text text-lg font-medium transition-colors duration-400 ease-in-out">
                            <Image src={Pork} alt='Pork' width={200} height={200} className='s size-56 object-cover   hover:scale-105 transition-all duration-400 shadow-sm ease-in-out'/>
                            <div className="flex justify-center gap-x-1 items-center mt-[-30px] bg-white text-black w-full text-lg font-cairo font-bold py-1 uppercase">
                                <h1>Pork</h1>
                                <h1>({numberOfPork()})</h1>
                            </div>
                        </Link>    
                    </CardContent>
                </Card>
                </div>
            </CarouselItem>
            <CarouselItem className="pl-5 md:basis-1/3 lg:basis-1/4">
                <div className="">
                <Card>
                    <CardContent className="flex aspect-square bg-gray-100 items-center justify-center p-6"> 
                        <Link href={`/Seafood`} className=" hover:text-primary flex flex-col items-center justify-center text-text text-lg font-medium transition-colors duration-400 ease-in-out">
                            <Image src={Seafood} alt='Pork' width={200} height={200} className='s size-56 object-cover   hover:scale-105 transition-all duration-400 shadow-sm ease-in-out'/>
                            <div className="flex justify-center gap-x-1 items-center mt-[-30px] bg-white text-black w-full text-lg font-cairo font-bold py-1 uppercase">
                                <h1>Seafood</h1>
                                <h1>({numberOfSeafood()})</h1>
                            </div>
                        </Link>   
                    </CardContent>
                </Card>
                </div>
            </CarouselItem>
            <CarouselItem className="pl-5 md:basis-1/3 lg:basis-1/4">
                <div className="">
                <Card>
                    <CardContent className="flex aspect-square bg-gray-100 items-center justify-center p-6">   
                        <Link href={`/Sizzling Plate`} className=" hover:text-primary flex flex-col items-center justify-center text-text text-lg font-medium transition-colors duration-400 ease-in-out">
                            <Image src={SizzlingPlate} alt='Pork' width={200} height={200} className='s size-56 object-cover   hover:scale-105 transition-all duration-400 shadow-sm ease-in-out'/>
                            <div className="flex justify-center gap-x-1 items-center mt-[-30px] bg-white text-black w-full  text-[0.6rem] md:text-lg font-cairo font-bold py-1 uppercase">
                                <h1>Sizzling Plate</h1>
                                <h1>({numberOfSP()})</h1>
                            </div>
                        </Link>
                    </CardContent>
                </Card>
                </div>
            </CarouselItem>
            <CarouselItem className="pl-5 md:basis-1/3 lg:basis-1/4">
                <div className="">
                <Card>
                    <CardContent className="flex aspect-square bg-gray-100 items-center justify-center p-6">   
                        <Link href={`/Super Silog Meals`} className=" hover:text-primary flex flex-col items-center justify-center text-text text-lg font-medium transition-colors duration-400 ease-in-out">
                            <Image src={Silog} alt='Pork' width={200} height={200} className='s size-56 object-cover   hover:scale-105 transition-all duration-400 shadow-sm ease-in-out'/>
                            <div className="flex justify-center gap-x-1 items-center mt-[-30px] bg-white text-black w-full  text-[0.6rem] md:text-lg font-cairo font-bold py-1 uppercase">
                                <h1>Silog Meals</h1> 
                                <h1>({numberOfSSM()})</h1>
                            </div>
                        </Link>
                    </CardContent>
                </Card>
                </div>
            </CarouselItem>
            <CarouselItem className="pl-5 md:basis-1/3 lg:basis-1/4">
                <div className="">
                <Card>
                    <CardContent className="flex aspect-square bg-gray-100 items-center justify-center p-6">   
                        <Link href={`/Veggies`} className=" hover:text-primary flex flex-col items-center justify-center text-text text-lg font-medium transition-colors duration-400 ease-in-out">
                            <Image src={Vegggies} alt='Pork' width={200} height={200} className='s size-56 object-cover   hover:scale-105 transition-all duration-400 shadow-sm ease-in-out'/>
                            <div className="flex justify-center gap-x-1 items-center mt-[-30px] bg-white text-black w-full text-lg font-cairo font-bold py-1 uppercase">
                                <h1>Veggies</h1>
                                <h1>({numberOfVeggies()})</h1>
                            </div>
                        </Link>
                    </CardContent>
                </Card>
                </div>
            </CarouselItem>
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>

  )
}

export default Categories
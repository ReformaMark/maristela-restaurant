'use client'
import Autoplay from "embla-carousel-autoplay"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel"
import HeroImage1 from '@/../public/img/hero-img-1.png'
import HeroImage2 from '@/../public/img/hero-img-2.jpg'
import Image from "next/image";
import { useRef } from "react";

const images = [HeroImage1, HeroImage2];
 
export function CarouselDemo() {
    const plugin = useRef(
        Autoplay({ delay: 4000, stopOnInteraction: false })
      )
    
  return (
    <Carousel
    plugins={[plugin.current]}
    className="w-full rounded-xl"
  >
    <CarouselContent className="w-full px-0 rounded-xl">
      {images.map((image, index) => (
        <CarouselItem 
          key={index}
          className="w-full "
        >
         
            <Image src={image} alt={`Image ${index + 1}`} className="size-full rounded-3xl bg-yellow" />
     
        </CarouselItem>
      ))}
    </CarouselContent>
    
  </Carousel>
  )
}
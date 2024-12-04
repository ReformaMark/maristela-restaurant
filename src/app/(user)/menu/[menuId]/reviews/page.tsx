'use client'

import { useQuery } from "convex/react";
import { api } from "../../../../../../convex/_generated/api";
import { Id } from "../../../../../../convex/_generated/dataModel";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import ReactStars from "react-stars";
import { formatDate, getAverage } from "@/lib/utils";
import Image from "next/image";
import Logo from "@/../public/img/maristela.jpg";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, Star } from "lucide-react";
import { useRouter } from "next/navigation";


export default function ReviewsPage({params}: {params: {menuId: string}}) {
  const ratings = useQuery(api.ratings.getRatings, {menuId: params.menuId as Id<"menus">});
  const menu = useQuery(api.menus.getOneMenu, {menuId: params.menuId as Id<'menus'>})
  const router = useRouter()

  return <div className="min-h-[calc(100vh-100px)] w-full text-center flex flex-col items-center px-0 md:px-48 mt-5">
      <div className="flex gap-x-3 items-center justify-center mb-10 self-start px-5">
          <ArrowLeft onClick={()=> router.back()} className='border-yellow border-2 text-yellow p-1 rounded-full cursor-pointer size-8'/>
          <h1 className="font-bold text-pretty text-primary">Ratings and Reviews</h1>
      </div>
      <div className="flex gap-x-3 self-start px-3 md:px-48">
        
        <Image src={menu?.url || Logo} alt="Menu Image" width={500} height={500} className="object-cover size-20" />
        <div className="">
            <h1 className="text-pretty text-primary font-bold">{menu?.name}</h1>
            <h1 className='text-xs text-gray-500 flex items-center'>
                Ratings : {ratings ? getAverage({ratings}).toFixed(1) : 0} <Star color='yellow' fill='yellow' size={14}/>
            </h1>
        </div>
    </div>
    <Separator className="px-3 md:px-48 my-3" />
   
    <div className="px-3 md:px-48 w-full space-y-3">
      {ratings && ratings.length > 0 ? (
        ratings.map((rating) => (
          <div key={rating._id} className="border-b flex-shrink-0 w-full border-gray-100 py-2 px-5 bg-gray-100 shadow-md mb-1">
            <div className="flex gap-x-3 items-center">
              <div className="text-center">
                <Avatar className='o outline-1 outline-black'>
                  <AvatarImage src="" />
                  <AvatarFallback>{rating.isAnonymous ? "AN" : rating.user?.name.charAt(0).toUpperCase()}</AvatarFallback>
                </Avatar>
                <h1 className='text-text text-xs'>{rating.isAnonymous ? "Anonymous" : rating.user?.name}</h1>
              </div>
              <div className="">
                <ReactStars count={5} size={10} value={rating.stars} edit={false} half={true} />
                <p className='text-[0.6rem] md:text-xs text-text line-clamp-3'>{rating.feedbackMessage}</p>
              </div>
            </div>
            <div className="ml-auto text-right mt-3">
              <h1 className='text-text text-[0.4rem] md:text-xs'>{formatDate({convexDate:rating._creationTime})}</h1>
            </div>
          </div>
        ))
      ) : (
        <h1 className='text-text text-center flex justify-center items-center my-10'>{menu?.name} has no ratings and reviews yet.</h1>
      )}
    </div>
  </div>;
}
'use client'

import { useMutation, useQuery } from 'convex/react';
import { useEffect, useState } from 'react';
import { FaCheck } from 'react-icons/fa';
import { MdClose } from 'react-icons/md';
import ReactStars from 'react-stars'
import { api } from '../../convex/_generated/api';
import { toast } from 'sonner';
import { Id } from '../../convex/_generated/dataModel';
import { Input } from './ui/input';

interface RatingStarsProps {
  edit: boolean
  average?: number
  size: number
  menuId?: Id<'menus'>
  transactionId?: Id<'transactions'>
}

export default function RatingStars({ edit, average,size, menuId, transactionId}: RatingStarsProps) {
  const [editable, setEditable ] = useState<boolean>(edit)
  const [hidden, setHidden] = useState<boolean>(true) 
  const [feedbackMessage, setFeedbackMessage] = useState('')
  const rate = useMutation(api.ratings.rateMenu)
  const getRating = useQuery(api.ratings.getRating,{transactionId:transactionId, menuId:menuId})
  
  const [rating, setRating] = useState(average || 0)


  useEffect(()=>{
    const stars = getRating?.stars
    if(!stars){
      setEditable(true)
    } else {
      setEditable(false)
      setRating(stars)
      setHidden(true)
    }
  
  },[getRating, editable])

  const handleOnChange = (newRating: number)=>{
   
    if(editable){
      setHidden(false)
      setRating(newRating)
    } else {
      setHidden(true)
    }
 
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFeedbackMessage(e.target.value)
  }

  console.log(editable)

  const handleRating = ()=> {
    if(!menuId){
      return 
    }
    if(!transactionId){
      return 
    }
    toast.promise(rate({
      stars: rating,
      feedbackMessage: feedbackMessage,
      menuId: menuId,
      transactionId: transactionId
    }), {
      loading: 'Adding your rating...',
      success: "Rated successfully!",
      error: 'Error occurred while rating the product.',
  })
  setEditable(false)
} 
  return (
    <div className="flex gap-x-2 md:gap-x-5 items-center">
      <ReactStars count={5} size={size} value={rating} onChange={handleOnChange} edit={editable} half={true} />
      {!average && !hidden &&  (
        <div className="flex gap-x-3 items-center ">
          <div className="relative">
                <Input
                    id="feedback"
                    name="feedback"
                    value={feedbackMessage}
                    onChange={handleInputChange}
                    className="border-red-200 py-0 text-xs md:text-sm bg-red-50 px-2 focus:ring-red-500 w-full"
                    placeholder="Feedback message ..."
                
                />
            </div>
          <FaCheck onClick={handleRating} className='size-5 cursor-pointer text-yellow'/>
          <MdClose onClick={()=> {
            setRating(getRating?.stars || 0)
            setHidden(true)
            }} className='size-5 cursor-pointer text-primary'/>
            
        </div>
      )}
    </div>
  )
}
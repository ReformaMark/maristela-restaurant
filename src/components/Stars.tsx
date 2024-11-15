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
import { Checkbox } from './ui/checkbox';
import { badWords } from '@/lib/data';


// Function to check for bad words
function containsBadWords(text: string): boolean {
  const lowerText = text.toLowerCase();
  return badWords.some(word => lowerText.includes(word));
}

interface RatingStarsProps {
  edit: boolean
  average?: number
  size: number
  menuId?: Id<'menus'>
  transactionId?: Id<'transactions'>
}

export default function RatingStars({ edit, average, size, menuId, transactionId}: RatingStarsProps) {
  const [editable, setEditable] = useState<boolean>(edit)
  const [hidden, setHidden] = useState<boolean>(true)
  const [feedbackMessage, setFeedbackMessage] = useState('')
  const [isAnonymous, setIsAnonymous] = useState(false)
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
    const text = e.target.value;
    if (containsBadWords(text)) {
      toast.error("Please avoid using inappropriate language");
      return;
    }
    setFeedbackMessage(text);
  }

  const handleRating = ()=> {
    if(!menuId || !transactionId){
      return 
    }

    if (containsBadWords(feedbackMessage)) {
      toast.error("Please remove inappropriate language before submitting");
      return;
    }
    
    toast.promise(rate({
      stars: rating,
      feedbackMessage: feedbackMessage,
      menuId: menuId,
      transactionId: transactionId,
      isAnonymous: isAnonymous
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
        <div className="flex gap-x-3 items-center">
          <div className="flex flex-col gap-y-2">
            <Input
              id="feedback"
              name="feedback"
              value={feedbackMessage}
              onChange={handleInputChange}
              className="border-red-200 py-0 text-xs md:text-sm bg-red-50 px-2 focus:ring-red-500 w-full"
              placeholder="Feedback message ..."
            />
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="anonymous" 
                checked={isAnonymous}
                onCheckedChange={(checked) => setIsAnonymous(checked as boolean)}
              />
              <label htmlFor="anonymous" className="text-xs text-gray-600">
                Post anonymously
              </label>
            </div>
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
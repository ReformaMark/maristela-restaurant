'use client'

import ReactStars from 'react-stars'

interface RatingStarsProps {
  edit: boolean
  average?: number
  onChange?: () => void;
}



export default function RatingStars({ edit, average, onChange }: RatingStarsProps) {
//   const [rating, setRating] = useState(average || 0)
  return (
    <ReactStars count={5} size={25} value={average} onChange={onChange} edit={edit} half={true} />
  )
}
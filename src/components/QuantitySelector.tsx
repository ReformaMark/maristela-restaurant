import { motion } from 'framer-motion'
import { FaMinus, FaPlus } from 'react-icons/fa'
type QuantitySelectorProps = {
    quantity: number
    handleQuantity: (operation: 'add' | 'subtract') => void
}
const QuantitySelector = ({ quantity, handleQuantity }:QuantitySelectorProps) => (
    <div className='text-lg flex items-center justify-center gap-x-4'>
        <motion.button
            onClick={() => handleQuantity('subtract')}
            whileTap={{ scale: 0.8 }}
            disabled={quantity <= 1 ? true : false}
            className='flex items-center justify-center w-10 h-10 rounded-full border border-gray-300 bg-white shadow-lg cursor-pointer transition duration-200 ease-in-out hover:bg-gray-100'
        >
            <FaMinus className='text-xl text-gray-700' />
        </motion.button>

        <span className='text-2xl font-bold text-gray-800'>{quantity}</span>

        <motion.button
            onClick={() => handleQuantity('add')}
            
            whileTap={{ scale: 0.8 }}
            className='flex items-center justify-center w-10 h-10 rounded-full border border-gray-300 bg-white shadow-lg cursor-pointer transition duration-200 ease-in-out hover:bg-gray-100'
        >
            <FaPlus className='text-xl text-gray-700' />
        </motion.button>
    </div>
)

export default QuantitySelector

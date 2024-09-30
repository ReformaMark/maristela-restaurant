import { FaCopyright } from "react-icons/fa"

export const AuthFooter = () => {
    return (
        <span className="text-light flex gap-x-2 items-center mb-3">
            <FaCopyright />
            <a href="#" className='text-yellow'>Maristela&apos;s Restaurant</a>, All right reserved.
        </span>
    )
}
import { FaCircleCheck } from 'react-icons/fa6'
import SubmitButton from './SubmitButton'
import { RxCross2 } from 'react-icons/rx'

const RegisteredModal = ({ onClose, message }) => {
    return (
        <div className="bg-black/50 z-60 text-white fixed inset-0 flex items-center justify-center p-2">
            <div className="bg-slate-700 max-h-[90vh] max-w-[90vw] lg:max-w-[40vw] overflow-y-auto flex flex-col w-full rounded-xl p-4 shadow-lg">
                <button onClick={onClose} className="place-self-end cursor-pointer transition-all duration-300 hover:bg-red-500 rounded-md p-1"><RxCross2 size={24} /></button>
                <h1 className='flex items-center justify-center gap-3 text-center text-xl sm:text-2xl font-semibold'>{message}</h1>
                <SubmitButton text="Go To Login" />
            </div>
        </div>
    )
}

export default RegisteredModal
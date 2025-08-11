import { LuLoaderCircle } from "react-icons/lu"

const SubmitButton = ({ text, onClick, isLoading }) => {
  return (
    <button type="submit" onClick={onClick} className='text-green-500 font-semibold bg-green-900/40 hover:bg-green-900/70 duration-300 min-w-48 min-h-11 mt-8 cursor-pointer mx-auto block px-5 py-2 rounded-full border-2 border-green-500'>{isLoading ? <LuLoaderCircle className="mx-auto animate-spin text-green-500" /> : text}</button>
  )
}

export default SubmitButton
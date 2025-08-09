import React from 'react'
import { LuLoaderCircle } from 'react-icons/lu'

const LoadingSpinner = () => {
    return (
        <div className='flex items-center justify-center bg-slate-800 min-h-[100vh]'><LuLoaderCircle size={60} className='animate-spin text-white' /></div>
    )
}

export default LoadingSpinner
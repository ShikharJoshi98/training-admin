import { useEffect, useState } from "react";
import { FaChalkboardTeacher, FaRegEdit, FaUsers } from "react-icons/fa";
import { LuBadgeInfo, LuBookOpenText } from "react-icons/lu";
import { useLocation, useNavigate } from "react-router-dom"

const Sidebar = ({ setPage }) => {
    const navigate = useNavigate();
    const { pathname } = useLocation();
    const [active, setActive] = useState('/');

    useEffect(() => {
        setActive(pathname);
    },[pathname])

    return (
        <div> 
            <aside className=" w-44 min-h-[100vh] overflow-hidden bg-white hidden p-4 lg:block sticky top-0 left-0 border-r-[1px] border-gray-300">
                <h1 className="mb-10 text-2xl font-semibold">Admin Panel</h1>
                <ul className="list-none space-y-1">
                    <li onClick={() => { setPage('Pages'); navigate(''); }} className={`${active === "/" ? 'bg-gray-200 font-semibold' : 'bg-white hover:bg-gray-100'} cursor-pointer flex items-center gap-2 p-1 rounded-md`}><FaRegEdit /> Pages</li>
                    <li onClick={() => { setPage('Courses'); navigate('Courses') }} className={`${active === "/Courses" ? 'bg-gray-200 font-semibold' : 'bg-white hover:bg-gray-100'} flex items-center gap-2 cursor-pointer p-1 rounded-md`}><LuBookOpenText />Courses</li>
                    <li onClick={() => { setPage('Tutorials'); navigate('Tutorials') }} className={`${active === "/Tutorials" ? 'bg-gray-200 font-semibold' : 'bg-white hover:bg-gray-100'} flex items-center gap-2 cursor-pointer p-1 rounded-md`}><FaChalkboardTeacher />Tutorials</li>
                    <li onClick={() => { setPage('Testimonials');; navigate('Testimonials') }} className={`${active === "/Testimonials" ? 'bg-gray-200 font-semibold' : 'bg-white hover:bg-gray-100 '} cursor-pointer flex items-center gap-2 p-1 rounded-md`}><FaUsers />Testimonials</li>
                    <li onClick={() => { setPage('Training Info'); navigate('TrainingInfo') }} className={`${active === "/TrainingInfo" ? 'bg-gray-200 font-semibold' : 'bg-white hover:bg-gray-100'} items-center gap-2 flex cursor-pointer p-1 rounded-md`}><LuBadgeInfo />Training Info</li>
                </ul>
            </aside>
        </div>
    )
}

export default Sidebar
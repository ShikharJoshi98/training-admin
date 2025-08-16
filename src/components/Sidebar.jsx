import { useEffect, useState } from "react";
import { FaChalkboardTeacher, FaRegEdit, FaUsers } from "react-icons/fa";
import { LuBadgeInfo, LuBookOpenText, LuLayoutDashboard, LuUsers } from "react-icons/lu";
import { useLocation, useNavigate } from "react-router-dom"

const Sidebar = () => {
    const navigate = useNavigate();
    const { pathname } = useLocation();
    const [active, setActive] = useState('/');

    useEffect(() => {
        setActive(pathname);
    }, [pathname])

    return (
        <div>
            <aside className="w-44 min-h-[100vh] overflow-hidden bg-slate-800 hidden p-4 lg:block sticky top-0 left-0 border-r-[1px] border-white/20">
                <h1 className="mb-10 text-2xl text-white font-semibold">Admin Panel</h1>
                <ul className="list-none space-y-1 text-white">
                    <li onClick={() => { navigate(''); }} className={`${active === "/dashboard" ? 'bg-slate-600 font-semibold' : 'hover:bg-slate-700'} cursor-pointer flex items-center gap-2 p-1 rounded-md`}><LuLayoutDashboard /> Dashboard</li>
                    <li onClick={() => { navigate('Courses') }} className={`${active === "/dashboard/Courses" ? 'bg-slate-600 font-semibold' : 'hover:bg-slate-700'} flex items-center gap-2 cursor-pointer p-1 rounded-md`}><LuBookOpenText />Courses</li>
                    <li onClick={() => { navigate('Tutorials') }} className={`${active === "/dashboard/Tutorials" ? 'bg-slate-600 font-semibold' : 'hover:bg-slate-700'} flex items-center gap-2 cursor-pointer p-1 rounded-md`}><FaChalkboardTeacher />Tutorials</li>
                    <li onClick={() => { navigate('Testimonials') }} className={`${active === "/dashboard/Testimonials" ? 'bg-slate-600 font-semibold' : 'hover:bg-slate-700'} cursor-pointer flex items-center gap-2 p-1 rounded-md`}><FaUsers />Testimonials</li>
                    <li onClick={() => { navigate('TrainingInfo') }} className={`${active === "/dashboard/TrainingInfo" ? 'bg-slate-600 font-semibold' : 'hover:bg-slate-700'} items-center gap-2 flex cursor-pointer p-1 rounded-md`}><LuBadgeInfo />Institute</li>
                    <li onClick={() => { navigate('Users') }} className={`${active === "/dashboard/Users" ? 'bg-slate-600 font-semibold' : 'hover:bg-slate-700'} items-center gap-2 flex cursor-pointer p-1 rounded-md`}><LuUsers />Users</li>
                </ul>
            </aside>
        </div>
    )
}

export default Sidebar
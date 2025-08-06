import { useEffect, useState } from "react";
import { FaAngleDoubleLeft, FaChalkboardTeacher, FaUsers } from "react-icons/fa";
import { LuBadgeInfo, LuBookOpenText, LuLayoutDashboard, LuMenu } from "react-icons/lu"
import { useLocation, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [active, setActive] = useState('/');
  const [openSideNav, setOpenSideNav] = useState(false);

  useEffect(() => {
    setActive(pathname);
  }, [pathname])
  return (
    <>
      {openSideNav && (<div className="fixed inset-0 transition-opacity duration-300 bg-black/20 bg-opacity-50 z-10" onClick={() => setOpenSideNav(false)}></div>)}
      <aside className={`fixed top-0 left-0 h-screen w-44 bg-slate-800 text-white shadow-lg z-10 p-4 transition-transform duration-300 ease-in-out ${openSideNav ? 'translate-x-0' : '-translate-x-full'}`}>
        <h1 className="mb-10 text-xl font-semibold">Admin Panel</h1>
        <FaAngleDoubleLeft onClick={() => setOpenSideNav(false)} className="my-5" />
        <ul className="list-none space-y-1">
          <li onClick={() => { navigate('/dashboard'); setOpenSideNav(false); }} className={`${active === "/dashboard" ? 'bg-slate-600 font-semibold' : 'hover:bg-slate-700'} flex items-center gap-2 cursor-pointer p-1 rounded-md`}><LuLayoutDashboard />Dashboard</li>
          <li onClick={() => { navigate('Courses'); setOpenSideNav(false); }} className={`${active === "/dashboard/Courses" ? 'bg-slate-600 font-semibold' : 'hover:bg-slate-700'} flex items-center gap-2 cursor-pointer p-1 rounded-md`}><LuBookOpenText />Courses</li>
          <li onClick={() => { navigate('Tutorials'); setOpenSideNav(false); }} className={`${active === "/dashboard/Tutorials" ? 'bg-slate-600 font-semibold' : 'hover:bg-slate-700'} flex items-center gap-2 cursor-pointer p-1 rounded-md`}><FaChalkboardTeacher />Tutorials</li>
          <li onClick={() => { navigate('Testimonials'); setOpenSideNav(false); }} className={`${active === "/dashboard/Testimonials" ? 'bg-slate-600 font-semibold' : 'hover:bg-slate-700 '} cursor-pointer flex items-center gap-2 p-1 rounded-md`}><FaUsers />Testimonials</li>
          <li onClick={() => { navigate('TrainingInfo'); setOpenSideNav(false); }} className={`${active === "/dashboard/TrainingInfo" ? 'bg-slate-600 font-semibold' : 'hover:bg-slate-700'} items-center gap-2 flex cursor-pointer p-1 rounded-md`}><LuBadgeInfo />Institute</li>
        </ul>
      </aside>
      <nav className="border-b-[1px] border-white/20 bg-slate-800 text-white p-4 sticky top-0 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <LuMenu onClick={() => setOpenSideNav(true)} className="block lg:hidden" />
          <h1 className="text-xl">{active === "/dashboard" ? 'Dashboard' : active === "/dashboard/Courses" ? 'Courses' : active === "/dashboard/Tutorials" ? 'Tutorials' : active === "/dashboard/Testimonials" ? 'Testimonials' : active === "/dashboard/TrainingInfo" ? 'Institute Details' : ''}</h1>
        </div>
        <p className="text-red-400 rounded-full font-semibold py-2 px-5 cursor-pointer bg-red-900/40 backdrop-blur-sm hover:bg-red-900/70 border border-red-500 duration-300">Logout</p>
      </nav>
    </>
  )
}

export default Navbar
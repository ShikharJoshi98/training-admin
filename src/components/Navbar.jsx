import { useEffect, useState } from "react";
import { FaAngleDoubleLeft, FaChalkboardTeacher, FaRegEdit, FaUsers } from "react-icons/fa";
import { LuBadgeInfo, LuBookOpenText, LuMenu } from "react-icons/lu"
import { useLocation, useNavigate } from "react-router-dom";

const Navbar = ({ page,setPage }) => {
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
      <aside className={`fixed top-0 left-0 h-screen w-44 bg-white shadow-lg z-10 p-4 transition-transform duration-300 ease-in-out ${openSideNav ? 'translate-x-0' : '-translate-x-full'}`}>
        <h1 className="mb-10 text-xl font-semibold">Admin Panel</h1>
        <FaAngleDoubleLeft onClick={()=>setOpenSideNav(false)} className="my-5" />
        <ul className="list-none space-y-1">
          <li onClick={() => { setPage('Pages'); navigate(''); setOpenSideNav(false); }} className={`${active === "/" ? 'bg-gray-200 font-semibold' : 'bg-white hover:bg-gray-100'} cursor-pointer flex items-center gap-2 p-1 rounded-md`}><FaRegEdit /> Pages</li>
          <li onClick={() => { setPage('Courses'); navigate('Courses'); setOpenSideNav(false); }} className={`${active === "/Courses" ? 'bg-gray-200 font-semibold' : 'bg-white hover:bg-gray-100'} flex items-center gap-2 cursor-pointer p-1 rounded-md`}><LuBookOpenText />Courses</li>
          <li onClick={() => { setPage('Tutorials'); navigate('Tutorials'); setOpenSideNav(false); }} className={`${active === "/Tutorials" ? 'bg-gray-200 font-semibold' : 'bg-white hover:bg-gray-100'} flex items-center gap-2 cursor-pointer p-1 rounded-md`}><FaChalkboardTeacher />Tutorials</li>
          <li onClick={() => { setPage('Testimonials');; navigate('Testimonials'); setOpenSideNav(false); }} className={`${active === "/Testimonials" ? 'bg-gray-200 font-semibold' : 'bg-white hover:bg-gray-100 '} cursor-pointer flex items-center gap-2 p-1 rounded-md`}><FaUsers />Testimonials</li>
          <li onClick={() => { setPage('Training Info'); navigate('TrainingInfo'); setOpenSideNav(false); }} className={`${active === "/TrainingInfo" ? 'bg-gray-200 font-semibold' : 'bg-white hover:bg-gray-100'} items-center gap-2 flex cursor-pointer p-1 rounded-md`}><LuBadgeInfo />Training Info</li>
        </ul>
      </aside>
      <nav className="shadow-md p-4 sticky top-0 bg-white flex items-center justify-between">
        <div className="flex items-center gap-4">
          <LuMenu onClick={()=>setOpenSideNav(true)} className="block lg:hidden" />
          <h1 className="text-xl">{page}</h1>
        </div>
        <p className="text-white bg-red-500 rounded-md py-1 px-3 cursor-pointer hover:bg-red-600">Logout</p>
      </nav>
    </>
  )
}

export default Navbar
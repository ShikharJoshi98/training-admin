import { Outlet, useLocation, useNavigate } from "react-router-dom";

const AuthLayout = () => {
    const { pathname } = useLocation();
    const navigate = useNavigate();
    return (
        <div className="bg-slate-800 pb-10 min-h-[100vh]">
            <nav className="flex items-center border-b-[1px] border-white/30 text-2xl pt-10 pb-5 font-semibold justify-center gap-14 sm:gap-20">
                <p onClick={() => navigate('/login')} className={`${pathname === '/login' ? 'text-white underline underline-offset-[25px]' : 'text-gray-300 hover:text-white'}  cursor-pointer`}>Login</p>
                <p onClick={() => navigate('/register')} className={`${pathname === '/register' ? 'text-white underline underline-offset-[25px]' : 'text-gray-300 hover:text-white'} cursor-pointer`}>Register</p>
            </nav>
            <Outlet />
        </div>
    )
}

export default AuthLayout
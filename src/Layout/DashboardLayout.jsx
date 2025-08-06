import { useState } from 'react'
import Sidebar from '../components/Sidebar'
import Navbar from '../components/Navbar'
import { Outlet } from 'react-router-dom';

const DashboardLayout = () => {
  const [isPage, setPage] = useState('');
  return (
    <div className='flex'>
      <Sidebar setPage={setPage} />
      <div className='lg:flex-1 w-full'>
        <Navbar page={isPage} setPage={setPage} />
        <div className=''>
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default DashboardLayout
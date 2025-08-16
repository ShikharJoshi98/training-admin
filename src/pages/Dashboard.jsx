import { FaCircleCheck, FaRegPenToSquare } from 'react-icons/fa6';
import { IoIosArrowDropright } from 'react-icons/io'
import { LuCalendar, LuCircleCheck, LuSchool, LuTrash, LuUsers } from 'react-icons/lu';
import { users } from '../../utils/Users';
import { useNavigate } from 'react-router-dom';
import adminStore from '../store/adminStore';
import authStore from "../store/authStore";
import { useEffect, useState } from 'react';
import UpcomingBatchModal from '../components/UpcomingBatchModal';

const Dashboard = () => {
    const getUpcomingBatch = adminStore((state) => state.getUpcomingBatch);
    const courses = adminStore((state) => state.courses);
    const getAllCourses = adminStore((state) => state.getAllCourses);
    const batchLength = adminStore((state) => state.batchLength);
    const deleteCourse = adminStore((state) => state.deleteCourse);
    const getTutorials = adminStore((state) => state.getTutorials);
    const tutorials = adminStore((state) => state.tutorials);
    const deleteTutorials = adminStore((state) => state.deleteTutorials);
    const institute = authStore((state) => state.institute);
    const [upcomingBatchModal, setUpcomingBatchModal] = useState(false);
    const [deleteSubmit, setDeleteSubmit] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        getUpcomingBatch(institute?.id);
        getAllCourses(institute?.id);
        getTutorials(institute?.id);
    }, [getUpcomingBatch, getAllCourses, getTutorials, deleteSubmit]);

    const deleteItem = async (id) => {
        try {
            await deleteCourse(id);
            setDeleteSubmit(prev => !prev);
        } catch (error) {
            console.error(error.message);
        }
    }

    return (
        <div className='p-0 pb-10 sm:p-8'>
            <h1 className='text-xl font-semibold text-center sm:text-start mt-10 sm:mt-0 sm:text-3xl text-white'>Welcome Super net technology !</h1>
            <div className='w-[90vw] mx-auto flex flex-wrap justify-between items-center lg:w-full p-5 bg-white/10 rounded-lg mt-10'>
                <div className='text-white font-semibold flex items-center gap-2 text-xl'><span>Domain</span><span className='text-green-500'><FaCircleCheck /></span></div>
                <div className='text-white font-semibold flex items-center gap-4'><span>www.snteduction.com</span><button className='bg-slate-500 rounded-md border border-white/40 cursor-pointer p-2'><FaRegPenToSquare /></button></div>
            </div>
            <div className='flex flex-col md:flex-row md:justify-center items-center gap-6 md:gap-3 px-2 lg:px-0 mt-6'>
                <div className='w-[90vw] flex flex-col justify-between lg:w-full h-32 p-5 bg-white/10 rounded-lg'>
                    <div className='flex items-center justify-between text-gray-300'>
                        <h2 className='text-lg font-semibold text-white'>User Enquiries</h2>
                        <LuUsers size={25} />
                    </div>
                    <div className='flex items-end justify-between mt-6 text-gray-300'>
                        <p className='text-3xl font-semibold'>{users.length}</p>
                        <IoIosArrowDropright onClick={() => navigate('Users')} className='cursor-pointer' size={20} />
                    </div>
                </div>
                <div className='w-[90vw] flex flex-col justify-between lg:w-full h-32 p-5 bg-white/10 rounded-lg'>
                    <div className='flex items-center justify-between text-gray-300'>
                        <h2 className='text-lg font-semibold text-white'>Institute Details</h2>
                        <LuSchool size={25} />
                    </div>
                    <IoIosArrowDropright onClick={() => navigate('TrainingInfo')} className='place-self-end cursor-pointer mt-6 text-gray-300' size={20} />
                </div>
                <div className='w-[90vw] flex flex-col justify-between lg:w-full h-32 p-5 bg-white/10 rounded-lg'>
                    <div className='flex items-center justify-between text-gray-300'>
                        <h2 className='text-lg font-semibold text-white'>Upcoming Batches</h2>
                        <LuCalendar size={25} />
                    </div>                    <div className='flex items-end justify-between mt-6 text-gray-300'>
                        <div className='font-semibold text-3xl rounded-full space-x-2 text-gray-300 gap-4'><span>{batchLength}</span><span className='text-sm'>Batches</span></div>
                        <IoIosArrowDropright className='cursor-pointer' onClick={() => setUpcomingBatchModal(true)} size={20} />
                    </div>
                </div>
            </div>
            <div className='flex flex-col items-center gap-6 lg:items-start mt-6'>
                <div className='w-[90vw] lg:w-full p-5 bg-white/10 rounded-lg'>
                    <h2 className='text-2xl font-semibold mb-10 text-white'>Courses</h2>
                    <div className='flex flex-col gap-6'>
                        {courses.map((course, index) => (
                            <div key={index} className='border-1 bg-white/10 text-white pb-2 shadow-md border-white/10 rounded-2xl'>
                                <div className="flex p-4 items-center justify-between">
                                    <div className="flex flex-col sm:flex-row sm:items-start items-center gap-4">
                                        <p className="font-semibold text-gray-300 text-lg">{course?.course}</p>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <button onClick={() => navigate('/dashboard/Courses')} className='bg-slate-500 rounded-md border border-white/40 cursor-pointer p-2'><FaRegPenToSquare /></button>
                                        <button onClick={() => deleteItem(course?.id)} className='bg-red-700/70 rounded-md border border-white/40 cursor-pointer p-2'><LuTrash /></button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <button onClick={() => navigate('Courses')} className='flex items-center gap-2 text-gray-200 bg-white/10 hover:bg-white/5 duration-300 w-fit place-self-end mt-6 p-3 rounded-full cursor-pointer border border-white/20'>Add Course<IoIosArrowDropright size={20} /></button>
                </div>
                <div className='w-[90vw] lg:w-full p-5 bg-white/10 rounded-lg'>
                    <h2 className='text-2xl font-semibold mb-10 text-white'>Tutorials</h2>
                    <div className='flex flex-col gap-6'>
                        {
                            tutorials.map((tutorial, index) => (
                                <div key={index} className='border-1 bg-white/10 text-white pb-2 shadow-md border-white/10 rounded-2xl'>
                                    <div className="flex p-4 items-center justify-between">
                                        <div className="flex flex-col sm:flex-row sm:items-start items-center gap-4">
                                            <div className="font-semibold text-gray-300 text-lg">{tutorial?.tutorialName}<p className='text-sm'>({tutorial?.section})</p></div>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <button onClick={() => navigate(`/dashboard/Tutorials#tutorials-${tutorial?.tutorialName?.replace(/\s+/g, '-').toLowerCase()}`)} className='bg-slate-500 rounded-md border border-white/40 cursor-pointer p-2'><FaRegPenToSquare /></button>
                                            <button onClick={async () => { await deleteTutorials(tutorial?.id); setDeleteSubmit(prev => !prev); }} className='bg-red-700/70 rounded-md border border-white/40 cursor-pointer p-2'><LuTrash /></button>
                                        </div>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                    <button onClick={() => navigate('/dashboard/Tutorials')} className='flex items-center gap-2 text-gray-200 bg-white/10 hover:bg-white/5 duration-300 w-fit place-self-end mt-6 p-3 rounded-full cursor-pointer border border-white/20'>Add Tutorial<IoIosArrowDropright size={20} /></button>
                </div>
                <div className='w-[90vw] lg:w-full p-5 bg-white/10 rounded-lg'>
                    <h2 className='text-2xl font-semibold mb-10 text-white'>Testimonials</h2>
                    <div className='border-1 bg-white/10 text-white pb-2 shadow-md border-white/10 rounded-2xl'>
                        <div className="flex p-4 items-center justify-between">
                            <div className="flex items-center gap-4">
                                <img src="/user.png" alt="Student Image" className='w-10 h-10' />
                                <p className="font-semibold text-gray-300">Student Name</p>
                            </div>
                            <div className="flex items-center gap-3">
                                <button className='bg-slate-500 rounded-md border border-white/40 cursor-pointer p-2'><FaRegPenToSquare /></button>
                                <button className='bg-red-700/70 rounded-md border border-white/40 cursor-pointer p-2'><LuTrash /></button>
                            </div>
                        </div>
                    </div>
                    <button className='flex items-center gap-2 text-gray-200 bg-white/10 hover:bg-white/5 duration-300 w-fit place-self-end mt-6 p-3 rounded-full cursor-pointer border border-white/20'>Add Testimonial<IoIosArrowDropright size={20} /></button>
                </div>
            </div>
            {upcomingBatchModal && <UpcomingBatchModal onClose={() => setUpcomingBatchModal(false)} />}
        </div>
    )
}

export default Dashboard
import { useEffect, useState } from "react";
import { LuTrash } from "react-icons/lu";
import { RxCross2 } from "react-icons/rx"
import adminStore from "../store/adminStore";
import authStore from "../store/authStore";
import { dateConverter } from "../../utils/dateConverter";
import { useNavigate } from "react-router-dom";

const UpcomingBatchModal = ({ onClose }) => {
    const getUpcomingBatch = adminStore((state) => state.getUpcomingBatch);
    const upcomingBatches = adminStore((state) => state.upcomingBatches);
    const deleteUpcomingBatch = adminStore((state) => state.deleteUpcomingBatch);
    const institute = authStore((state) => state.institute);
    const navigate = useNavigate();
    const [submit, setSubmit] = useState(false);

    useEffect(() => {
        getUpcomingBatch(institute?.id);
    }, [getUpcomingBatch, submit]);

    const deleteBatch = async (id) => {
        try {
            await deleteUpcomingBatch(id);
            setSubmit(prev => !prev);
        } catch (error) {
            console.log(error.message);
        }
    }

    return (
        <div className="bg-black/50 z-60 fixed inset-0 flex items-center justify-center p-2">
            <div className="bg-slate-700 text-white max-h-[90vh] max-w-[90vw] overflow-y-auto flex flex-col w-full rounded-xl p-4 shadow-lg">
                <button onClick={onClose} className="place-self-end cursor-pointer transition-all duration-300 hover:bg-red-500 rounded-md p-1"><RxCross2 size={24} /></button>
                <h1 className='text-3xl font-semibold text-center'>Upcoming Batches</h1>
                <div className="mt-10 flex flex-col gap-6">
                    {upcomingBatches.map((batch, index) => (
                        <div key={index} className='border-1 bg-white/10 shadow-md border-gray-400 rounded-2xl'>
                            <div className="flex flex-col sm:flex-row px-4 p-2 items-center sm:justify-between gap-10">
                                <p className="font-semibold text-lg">{batch?.batch}</p>
                                <p>Starting Date : {dateConverter(batch?.startingDate)}</p>
                                <button onClick={() => deleteBatch(batch?.id)} className='bg-red-700/70 rounded-md border border-white/40 cursor-pointer p-2'><LuTrash /></button>
                            </div>
                        </div>
                    ))
                    }
                </div>
                <button onClick={() => navigate('/dashboard/Courses#UpcomingBatches')} className="bg-blue-900 w-fit py-1 px-6 rounded-full my-5 mx-auto border-2 cursor-pointer border-blue-500">Add Upcoming Batch</button>
            </div>
        </div>
    )
}

export default UpcomingBatchModal
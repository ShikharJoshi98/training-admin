import { useState } from 'react'
import { RxCross2 } from 'react-icons/rx'
import Input from './Input';
import SubmitButton from './SubmitButton';
import adminStore from '../store/adminStore';

const AddSubChapterModal = ({ chapterId, onClose }) => {
    const addSubChapter = adminStore((state) => state.addSubChapter);
    const setAddSubChapterSubmit = adminStore((state) => state.setAddSubChapterSubmit);
    const [subChapterName, setSubChapterName] = useState('');

    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
            await addSubChapter(chapterId, { data: subChapterName });
            setSubChapterName('');
            setAddSubChapterSubmit(prev => !prev);
            onClose();
        } catch (error) {
            console.error(error.message);
        }
    }
    return (
        <div className="bg-black/50 z-60 fixed inset-0 flex items-center justify-center p-2">
            <div className="bg-slate-700 text-white max-h-[90vh] max-w-[90vw] sm:max-w-[60vw] overflow-y-auto flex flex-col w-full rounded-xl p-4 shadow-lg">
                <button onClick={onClose} className="place-self-end cursor-pointer transition-all duration-300 hover:bg-red-500 rounded-md p-1"><RxCross2 size={24} /></button>
                <h1 className='text-3xl font-semibold text-center'>Add Subchapter</h1>
                <form onSubmit={handleSubmit} className="px-0 sm:px-10 mt-10">
                    <Input label="Add Subchapter" value={subChapterName} required onChange={(e) => setSubChapterName(e.target.value)} placeholder="Enter Subchapter Name" type="text" />
                    <SubmitButton text="Add" />
                </form>
            </div>
        </div>
    )
}

export default AddSubChapterModal
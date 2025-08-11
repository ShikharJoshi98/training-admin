import { RxCross2 } from "react-icons/rx"
import SubmitButton from "./SubmitButton"
import Input from "./Input"
import { useState } from "react"
import adminStore from "../store/adminStore"
import authStore from "../store/authStore"

const AddChapterModal = ({ onClose, tutorialid }) => {
    const addChapterLoader = adminStore((state) => state.addChapterLoader);
    const addTutorialChapter = adminStore((state) => state.addTutorialChapter);
    const setAddChapterSubmit = adminStore((state) => state.setAddChapterSubmit);
    const institute = authStore((state) => state.institute);
    const [chapterName, setChapterName] = useState('');

    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
            await addTutorialChapter({ chapter: chapterName, instituteId: institute?.id, tutorialId: tutorialid });
            setAddChapterSubmit(prev => !prev);
            setChapterName('');
            onClose();
        } catch (error) {
            console.error(error.message);
        }
    }

    return (
        <div className="bg-black/50 z-60 fixed inset-0 flex items-center justify-center p-2">
            <div className="bg-slate-700 text-white max-h-[90vh] max-w-[90vw] sm:max-w-[60vw] overflow-y-auto flex flex-col w-full rounded-xl p-4 shadow-lg">
                <button onClick={onClose} className="place-self-end cursor-pointer transition-all duration-300 hover:bg-red-500 rounded-md p-1"><RxCross2 size={24} /></button>
                <h1 className='text-3xl font-semibold text-center'>Add Chapter</h1>
                <form onSubmit={handleSubmit} className="px-0 sm:px-10 mt-10">
                    <Input label="Add Chapter" value={chapterName} required onChange={(e) => setChapterName(e.target.value)} placeholder="Enter Chapter Name" type="text" />
                    <SubmitButton isLoading={addChapterLoader} text="Add" />
                </form>
            </div>
        </div>
    )
}

export default AddChapterModal
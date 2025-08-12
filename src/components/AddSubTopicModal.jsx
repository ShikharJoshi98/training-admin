import { RxCross2 } from "react-icons/rx"
import Input from "./Input"
import SubmitButton from "./SubmitButton"
import { useState } from "react"
import adminStore from "../store/adminStore"

const AddSubTopicModal = ({ onClose, topicId }) => {
    const [subTopic, setSubTopic] = useState('');
    const addSubTopic = adminStore((state) => state.addSubTopic);
    const addSubTopicLoader = adminStore((state) => state.addSubTopicLoader);
    const setAddSubTopicSubmit = adminStore((state) => state.setAddSubTopicSubmit);

    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
            await addSubTopic(topicId, { data: subTopic });
            setSubTopic('');
            setAddSubTopicSubmit(prev => !prev);
            onClose();
        } catch (error) {
            console.error(error.message);
        }
    }

    return (
        <div className="bg-black/50 z-60 fixed inset-0 flex items-center justify-center p-2">
            <div className="bg-slate-700 text-white max-h-[90vh] max-w-[90vw] sm:max-w-[60vw] overflow-y-auto flex flex-col w-full rounded-xl p-4 shadow-lg">
                <button onClick={onClose} className="place-self-end cursor-pointer transition-all duration-300 hover:bg-red-500 rounded-md p-1"><RxCross2 size={24} /></button>
                <h1 className='text-3xl font-semibold text-center'>Add Subtopic</h1>
                <form onSubmit={handleSubmit} className="px-0 sm:px-10 mt-10">
                    <Input label="Add Topic" value={subTopic} required name="subTopic" onChange={(e) => setSubTopic(e.target.value)} placeholder="Enter Subtopic Name" type="text" />
                    <SubmitButton isLoading={addSubTopicLoader} text="Add" />
                </form>
            </div>
        </div>
    )
}

export default AddSubTopicModal
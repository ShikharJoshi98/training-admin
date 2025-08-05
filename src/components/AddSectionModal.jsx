import { RxCross2 } from "react-icons/rx"
import Input from "./Input"
import { useState } from "react"
import SubmitButton from "./SubmitButton";

const AddSectionModal = ({ onClose }) => {
    const [sectionName, setSectionName] = useState("");

    const handleSubmit = (e) => {
        try {
            e.preventDefault();
            console.log(sectionName);
            setSectionName("");
        } catch (error) {
            console.warn(error.message);
        }
    }

    return (
        <div className="bg-black/50 z-60 fixed inset-0 flex items-center justify-center p-2">
            <div className="bg-white max-h-[90vh] max-w-[60vw] overflow-y-auto flex flex-col w-full rounded-xl p-4 shadow-lg">
                <button onClick={onClose} className="place-self-end cursor-pointer transition-all duration-300 hover:text-white hover:bg-red-500 rounded-md p-1"><RxCross2 size={24} /></button>
                <h1 className='text-3xl font-semibold text-center'>Add Section</h1>
                <form onSubmit={handleSubmit} className="px-10 mt-10">
                    <Input label="Add Section" value={sectionName} required name="sectionName" onChange={(e) => setSectionName(e.target.value)} placeholder="Enter Section Name" type="text" />
                    <SubmitButton text="Add" />
                </form>
            </div>
        </div>
    )
}

export default AddSectionModal
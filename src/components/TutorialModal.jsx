import { useState } from "react"
import { RxCross2 } from "react-icons/rx"
import Input from "./Input";
import { CiCircleMinus, CiCirclePlus } from "react-icons/ci";
import SubmitButton from "./SubmitButton";

const TutorialModal = ({ onClose }) => {
    const [formValues, setFormValues] = useState({
        chapter: "",
        subChapter: [""]
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormValues((prev) => ({
            ...prev,
            [name]: value
        }))
    }
    const handleSubChapterChange = (index, value) => {
        const updatedSubChapters = [...formValues.subChapter];
        updatedSubChapters[index] = value;
        setFormValues((prev) => ({
            ...prev,
            subChapter: updatedSubChapters,
        }));
    };
    const addSubChapter = () => {
        setFormValues((prev) => ({
            ...prev,
            subChapter: [...prev.subChapter, ""]
        }))
    }
    const deleteSubChapter = (index) => {
        const updated = formValues.subChapter.filter((_, i) => i !== index);
        setFormValues((prev) => ({
            ...prev,
            subChapter: updated.length > 0 ? updated : [""]
        }))
    }

    return (
        <div className="bg-black/50 z-60 fixed inset-0 flex items-center justify-center p-2">
            <div className="bg-white max-h-[90vh] max-w-[90vw] overflow-y-auto flex flex-col w-full rounded-xl p-4 shadow-lg">
                <button onClick={onClose} className="place-self-end cursor-pointer transition-all duration-300 hover:text-white hover:bg-red-500 rounded-md p-1"><RxCross2 size={24} /></button>
                <h1 className='text-3xl font-semibold text-center'>Edit Tutorials</h1>
                <form className="px-40 mt-10 flex flex-col gap-4">
                    <Input label="Add Chapter" value={formValues.chapter} required name="chapter" onChange={handleInputChange} placeholder="Enter Chapter" type="text" />
                    <div className="flex flex-col gap-2">
                        <p>Add Subchapter</p>
                        {
                            formValues.subChapter.map((sub, index) => (
                                <div key={index} className="flex items-center gap-2">
                                    <input value={sub} required onChange={(e) => handleSubChapterChange(index, e.target.value)} placeholder="Enter Subchapter" type="text" className="bg-white rounded-md border text-gray-600 w-[95%] py-1 px-2" />
                                    <button onClick={() => deleteSubChapter(index)} type="button" className="p-2 w-10 cursor-pointer hover:bg-red-600 font-semibold h-10 rounded-full bg-red-500 text-white flex items-center justify-center"><CiCircleMinus size={25} /></button>
                                </div>
                            ))
                        }
                        <button type="button" onClick={addSubChapter} className="p-2 w-10 mx-auto mt-3 cursor-pointer hover:bg-blue-600 font-semibold h-10 rounded-full bg-blue-500 text-white flex items-center justify-center"><CiCirclePlus size={30} /></button>
                    </div>
                    <SubmitButton text="Submit" />
                </form>
            </div>
        </div>
    )
}

export default TutorialModal
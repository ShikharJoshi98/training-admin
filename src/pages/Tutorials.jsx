import { useState } from "react"
import Input from "../components/Input";
import SubmitButton from "../components/SubmitButton";
import { CiCirclePlus } from "react-icons/ci";
import TutorialModal from "../components/TutorialModal";
import AddSectionModal from "../components/AddSectionModal";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

const Tutorials = () => {
  const [formValues, setFormValues] = useState({
    section: "",
    tutorialName: "",
    tutorialImage: ""
  });
  const [editTutorialModal, setEditTutorialModal] = useState(false);
  const [isAccordianOpen, setAccordianOpen] = useState(false);
  const [addSectionModal, setAddSectionModal] = useState(false);

  const handleSubmit = (e) => {
    try {
      e.preventDefault();
      console.log(formValues);
      setFormValues({
        section: "",
        tutorialName: "",
        tutorialImage: ""
      })
    } catch (error) {
      console.warn(error.message);
    }
  }
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({
      ...prev,
      [name]: value
    }))
  }
  const tutorialData = {
    chapter: "Introduction to React",
    subChapter: ["JSX Basics", "Components", "State and Props"]
  };

  return (
    <div className='p-0 pb-10 sm:p-8'>
      <h1 className='text-3xl mt-10 text-white sm:mt-0 font-semibold text-center'>Add Tutorials</h1>
      <form onSubmit={handleSubmit} className="bg-white/10 py-8 px-10 sm:px-20 shadow-md rounded-md flex flex-col gap-4 w-[95vw] sm:w-[90%] max-w-[900px] mx-auto mt-10">
        <div className="flex flex-col gap-2">
          <p className="text-white">Tutorial Section</p>
          <div className="flex flex-col sm:flex-row items-center gap-2">
            <select onChange={handleInputChange} name="section" value={formValues.section} className="bg-black/40 border text-white/80 rounded-md w-full sm:w-[90%] py-1 px-2">
              <option disabled value="">Select Section</option>
              <option value="Option 1">Option 1</option>
            </select>
            <button onClick={() => setAddSectionModal(true)} type="button" className="text-gray-200 bg-white/10 hover:bg-white/5 duration-300 py-1 px-2 whitespace-nowrap text-sm border border-white/30 cursor-pointer rounded-md">Add Section</button>
          </div>
        </div>
        <Input label="Tutorial name" value={formValues.tutorialName} required name="tutorialName" onChange={handleInputChange} placeholder="Enter Tutorial" type="text" />
        <Input label="Tutorial Logo" value={formValues.tutorialImage} required name="tutorials" onChange={handleInputChange} type="file" />
        <SubmitButton text="Submit" />
      </form>
      <h1 className='text-3xl text-white mt-10 font-semibold text-center'>Tutorials Added</h1>
      <div className="bg-white/10 py-8 px-5 md:px-10 shadow-md rounded-md flex flex-col gap-4 w-[95vw] sm:w-[90%] max-w-[900px] mx-auto mt-10">
        <div className='border bg-white/10 pb-4 shadow-md border-white/10 rounded-2xl'>
          <div className="flex flex-col sm:flex-row p-4 items-center sm:justify-between gap-10">
            <div className="flex flex-col sm:flex-row sm:items-start items-center gap-4">
              <img src="/61612b11c9d5ba04c453b7070ffa6d3a.png" alt="Tutorial Logo" className="w-20 h-20" />
              <p className="font-semibold text-gray-200 text-lg">Tutorial Name</p>
            </div>
            <div className="flex items-center gap-3 mt-3">
              <button onClick={() => setEditTutorialModal(true)} className="text-gray-200 bg-white/10 hover:bg-white/5 duration-300 border border-white/40 font-semibold h-fit w-fit cursor-pointer flex items-center gap-3 py-2 pl-4 pr-2 rounded-full">
                Update <CiCirclePlus size={30} />
              </button>
              <button onClick={() => setAccordianOpen((prev) => !prev)} className="ml-2 text-white cursor-pointer">
                {isAccordianOpen ? <IoIosArrowUp size={24} /> : <IoIosArrowDown size={24} />}
              </button>
            </div>
          </div>
          {isAccordianOpen && (
            <div className="mt-4 text-gray-300 ml-4 pl-4">
              <p className="font-semibold text-lg">Chapter: {tutorialData.chapter}</p>
              <ul className="list-disc ml-4 mt-2">
                {tutorialData.subChapter.map((sub, index) => (
                  <li key={index} className="flex items-center gap-3 mt-2">{index + 1}. {sub} <button className="text-gray-200 bg-white/10 hover:bg-white/5 duration-300 border border-white/40 p-1 text-sm cursor-pointer rounded-md">Add Documentation</button></li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
      {editTutorialModal && <TutorialModal onClose={() => setEditTutorialModal(false)} />}
      {addSectionModal && <AddSectionModal onClose={() => setAddSectionModal(false)} />}
    </div>
  )
}

export default Tutorials
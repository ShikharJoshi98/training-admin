import { useEffect, useState } from "react"
import Input from "../components/Input";
import SubmitButton from "../components/SubmitButton";
import AddSectionModal from "../components/AddSectionModal";
import adminStore from "../store/adminStore";
import authStore from "../store/authStore";
import { CiCirclePlus } from "react-icons/ci";
import AddChapterModal from "../components/AddChapterModal";
import AddSubChapterModal from "../components/AddSubChapterModal";
import { useLocation } from "react-router-dom";
import { FaRegPenToSquare, FaTrash } from "react-icons/fa6";

const Tutorials = () => {
  const getTutorialSections = adminStore((state) => state.getTutorialSections);
  const tutorialSections = adminStore((state) => state.tutorialSections);
  const isUploadSection = adminStore((state) => state.isUploadSection);
  const addTutorials = adminStore((state) => state.addTutorials);
  const getTutorials = adminStore((state) => state.getTutorials);
  const tutorials = adminStore((state) => state.tutorials);
  const getTutorialChapter = adminStore((state) => state.getTutorialChapter);
  const tutorialChapters = adminStore((state) => state.tutorialChapters);
  const addChapterSubmit = adminStore((state) => state.addChapterSubmit);
  const addSubChapterSubmit = adminStore((state) => state.addSubChapterSubmit);
  const deleteChapter = adminStore((state) => state.deleteChapter);
  const editChapter = adminStore((state) => state.editChapter);
  const deleteSubChapter = adminStore((state) => state.deleteSubChapter);
  const updateSubChapterName = adminStore((state) => state.updateSubChapterName);

  const institute = authStore((state) => state.institute);
  const location = useLocation();

  const [formValues, setFormValues] = useState({
    section: "",
    tutorialName: "",
    tutorialImage: ""
  });
  const [isTutorialId, setTutorialId] = useState(null);
  const [addChapterModal, setAddChapterModal] = useState(false);
  const [addSectionModal, setAddSectionModal] = useState(false);
  const [addSubChapterModal, setAddSubChapterModal] = useState(false);
  const [isChapterId, setChapterId] = useState(null);
  const [tutorialSubmit, setTutorialSubmit] = useState(false);

  const [editingChapterId, setEditingChapterId] = useState(null);
  const [editingChapterValue, setEditingChapterValue] = useState("");
  const [editingSubChapterId, setEditingSubChapterId] = useState(null);
  const [editingSubChapterValue, setEditingSubChapterValue] = useState("");


  useEffect(() => {
    getTutorialSections(institute?.id);
    getTutorials(institute?.id);
    getTutorialChapter(institute?.id);
  },
    [
      getTutorialSections,
      isUploadSection,
      getTutorials,
      getTutorialChapter,
      tutorialSubmit,
      addChapterSubmit,
      addSubChapterSubmit,
    ]
  );

  useEffect(() => {
    if (location.hash) {
      const el = document.getElementById(location.hash.replace("#", ""));
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [location]);

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      await addTutorials({ ...formValues, instituteId: institute?.id });
      setFormValues({
        section: "",
        tutorialName: "",
        tutorialImage: ""
      })
      setTutorialSubmit(prev => !prev);
    } catch (error) {
      console.warn(error.message);
    }
  }

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "tutorialImage" && files && files.length > 0) {
      const file = files[0];
      const reader = new FileReader();

      reader.onloadend = () => {
        const base64String = reader.result;
        setFormValues((prev) => ({
          ...prev,
          tutorialImage: base64String
        }));
      };

      reader.readAsDataURL(file);
    } else {
      setFormValues((prev) => ({
        ...prev,
        [name]: value
      }));
    }
  }
  console.log(tutorialChapters)

  return (
    <div className='p-0 pb-10 sm:p-8'>
      <h1 className='text-3xl mt-10 text-white sm:mt-0 font-semibold text-center'>Add Tutorials</h1>
      <form onSubmit={handleSubmit} className="bg-white/10 py-8 px-10 sm:px-20 shadow-md rounded-md flex flex-col gap-4 w-[95vw] sm:w-[90%] max-w-[900px] mx-auto mt-10">
        <div className="flex flex-col gap-2">
          <p className="text-white">Tutorial Section</p>
          <div className="flex flex-col sm:flex-row items-center gap-2">
            <select onChange={handleInputChange} name="section" value={formValues.section} className="bg-black/40 border text-white/80 rounded-md w-full sm:w-[90%] py-1 px-2">
              <option disabled value="">Select Section</option>
              {
                tutorialSections.map((section, index) => (
                  <option key={index} value={section?.sectionName}>{section?.sectionName}</option>
                ))
              }
            </select>
            <button onClick={() => setAddSectionModal(true)} type="button" className="text-gray-200 bg-white/10 hover:bg-white/5 duration-300 py-1 px-2 whitespace-nowrap text-sm border border-white/30 cursor-pointer rounded-md">Add Section</button>
          </div>
        </div>
        <Input label="Tutorial name" value={formValues.tutorialName} required name="tutorialName" onChange={handleInputChange} placeholder="Enter Tutorial" type="text" />
        <Input label="Tutorial Logo" required name="tutorialImage" onChange={handleInputChange} type="file" />
        <SubmitButton text="Submit" />
      </form>

      <h1 className='text-3xl text-white mt-10 font-semibold text-center'>Tutorials Added</h1>
      {tutorials.map((tutorial, index) => (
        <div id={`tutorials-${tutorial?.tutorialName?.replace(/\s+/g, '-').toLowerCase()}`} key={index} className="bg-white/10 py-8 px-5 md:px-10 shadow-md rounded-md flex flex-col gap-4 w-[95vw] sm:w-[90%] max-w-[900px] mx-auto mt-10">
          <div className='border bg-white/10 pb-4 shadow-md border-white/10 rounded-2xl'>
            <div className="flex flex-col sm:flex-row p-4 items-center sm:justify-between gap-10">
              <div className="flex flex-col sm:flex-row sm:items-start items-center gap-4">
                <img src={tutorial?.tutorialImage} alt="Tutorial Logo" className="w-20 h-20" />
                <p className="font-semibold text-gray-200 text-lg">{tutorial?.tutorialName}</p>
                <p className="text-gray-400 text-sm mt-1">({tutorial?.section})</p>
              </div>
            </div>
            {
              tutorialChapters.filter((chapter) => chapter?.tutorialId === tutorial?.id).map((chapter, index) => (
                <div key={index} className="mt-4 text-gray-200">
                  {editingChapterId === chapter?.id ? (
                    <div className="pl-5 flex items-center gap-2">
                      <input type="text" value={chapterEditValue} onChange={(e) => setChapterEditValue(e.target.value)} className="bg-black/40 rounded-md border text-white px-2 py-1" />
                      <button onClick={async () => { await editChapter(chapter?.id, { newChapter: chapterEditValue }); setTutorialSubmit(prev => !prev); setEditingChapterId(null); }} className="bg-green-600 px-3 py-1 rounded-md">Save</button>
                      <button onClick={() => setEditingChapterId(null)} className="bg-gray-600 px-3 py-1 rounded-md">Cancel</button>
                    </div>
                  ) : (
                    <div className="flex items-center gap-1">
                      <p className="pl-5 font-semibold">
                        {chapter?.chapter}
                        <button onClick={() => { setAddSubChapterModal(true); setChapterId(chapter?.id) }} className="bg-sky-700 text-white p-2 ml-2 cursor-pointer rounded-full text-sm">Add Subchapter</button>
                      </p>
                      <button className="ml-2 cursor-pointer" onClick={() => { setEditingChapterId(chapter.id); setChapterEditValue(chapter.chapter); }}><FaRegPenToSquare /></button>
                      <button onClick={async () => { await deleteChapter(chapter?.id); setTutorialSubmit(prev => !prev) }} className="ml-2 text-red-500 cursor-pointer"><FaTrash /></button>
                    </div>
                  )}
                  {
                    chapter?.subChapter.map((item, subIndex) => (
                      <div key={subIndex} className="pl-10 text-sm mt-1 flex items-center gap-2">
                        {editingSubChapterId === `${item?.id}-${subIndex}` ? (
                          <>
                            <input type="text" value={editingSubChapterValue} onChange={(e) => setEditingChapterValue(e.target.value)} className="bg-black/40 rounded-md border text-white px-2 py-1" />
                            <button onClick={() => { setEditingSubChapterId(null); }} className="bg-green-600 px-3 py-1 rounded-md">Save</button>
                            <button onClick={() => setEditingSubChapterId(null)} className="bg-gray-600 px-3 py-1 rounded-md">Cancel</button>
                          </>
                        ) : (
                          <>
                            {subIndex + 1}. {item}
                            <button onClick={() => { setEditingSubChapterId(`${chapter?.id}-${subIndex}`); setEditingSubChapterValue(item); }} className="ml-2 cursor-pointer"><FaRegPenToSquare /></button>
                            <button onClick={() => { deleteSubChapter(chapter?.id, { index: subIndex }); setTutorialSubmit(prev => !prev) }} className="ml-2 text-red-500 cursor-pointer"><FaTrash /></button>
                          </>
                        )}
                      </div>

                    ))
                  }
                </div>
              ))
            }
            <button
              onClick={() => { setAddChapterModal(true); setTutorialId(tutorial?.id) }}
              className="bg-green-600 mx-auto mt-4 text-white cursor-pointer flex items-center gap-3 py-2 pl-3 pr-1 font-semibold rounded-full"
            >
              Add Chapter<CiCirclePlus size={20} />
            </button>
          </div>
        </div>
      ))}

      {addChapterModal && <AddChapterModal onClose={() => setAddChapterModal(false)} tutorialid={isTutorialId} />}
      {addSectionModal && <AddSectionModal onClose={() => setAddSectionModal(false)} />}
      {addSubChapterModal && <AddSubChapterModal onClose={() => setAddSubChapterModal(false)} chapterId={isChapterId} />}
    </div>
  )
}

export default Tutorials

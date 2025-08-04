import { useState } from "react";
import Input from "../components/Input";
import SubmitButton from "../components/SubmitButton";
import AddCurriculumModal from "../components/AddCurriculumModal";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { CiCirclePlus } from "react-icons/ci";

const Courses = () => {
  const [formValues, setFormValues] = useState({
    course: "",
    courseDuration: "",
    jobOpportunities: "",
    courseInfo: ""
  })
  const [upcomingBatchFormValues, setUpcomingBatchFormValues] = useState({
    batch: "",
    startingDate: "",
    timing: "",
    type: "",
    classDays: ""
  })
  const [curriculumValue, setCurriculumValue] = useState("");
  const [curriculumModal, setCurriculumModal] = useState(false);
  const tutorialData = {
    title: "Core Java",
    addOn: "Hands-on with Java basics and OOP",
    topics: ["Java Syntax and Data Types", "Control Statements and Loops", "Object-Oriented Programming"]
  };
  const courses = ['Web Development', 'Data Science', 'UI/UX Design', 'Cybersecurity', 'Digital Marketing'];
  const [isAccordianOpen, setAccordianOpen] = useState(false);
  const [selectedCourses, setSelectedCourses] = useState([]);

  const handleCheckboxChange = (course) => {
    if (selectedCourses.includes(course)) {
      setSelectedCourses(selectedCourses.filter((c) => c !== course));
    } else if (selectedCourses.length < 3) {
      setSelectedCourses([...selectedCourses, course]);
    }

  };
  const handleSelectCourseSubmit = (e) => {
    try {
      e.preventDefault();
      console.log(selectedCourses)
    } catch (error) {
      console.warn(error.message);
    }
  }
  const handleUpcomingBatchSubmit = (e) => {
    try {
      e.preventDefault();
      console.log(upcomingBatchFormValues)
    } catch (error) {
      console.warn(error.message);
    }
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formValues)
  }
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({
      ...prev,
      [name]: value
    }))
  }
  const handleUpcomingBatchChange = (e) => {
    const { name, value } = e.target;
    setUpcomingBatchFormValues((prev) => ({
      ...prev,
      [name]: value
    }));
  };
  return (
    <div className='p-0 sm:p-8'>
      <h1 className='text-3xl mt-10 sm:mt-0 font-semibold text-center'>Courses Added</h1>
      <div className="bg-white py-8 px-10 sm:px-20 shadow-md rounded-md flex flex-col gap-4 w-[95vw] sm:w-[90%] max-w-[900px] mx-auto mt-10">
        <div className='border-1 bg-gray-100 pb-4 shadow-md border-gray-400 rounded-2xl'>
          <div className="flex flex-col sm:flex-row p-4 items-center sm:justify-between gap-10">
            <div className="flex flex-col sm:flex-row sm:items-start items-center gap-4">
              <p className="font-semibold text-lg">Tutorial Name</p>
            </div>
            <div className="flex items-center gap-3 mt-3">
              <button onClick={() => setEditTutorialModal(true)} className="bg-blue-500 text-white font-semibold h-fit w-fit hover:bg-blue-600 cursor-pointer flex items-center gap-3 py-2 pl-4 pr-2 rounded-full">
                Update <CiCirclePlus size={30} />
              </button>
              <button onClick={() => setAccordianOpen((prev) => !prev)} className="ml-2 cursor-pointer">
                {isAccordianOpen ? <IoIosArrowUp size={24} /> : <IoIosArrowDown size={24} />}
              </button>
            </div>
          </div>
          {isAccordianOpen && (
            <div className="mt-4 ml-4 pl-4">
              <p className="font-semibold text-lg text-blue-500">Chapter: {tutorialData.title}</p>
              <p className="font-semibold text-sm text-blue-400">Add-On: {tutorialData.addOn}</p>
              <ul className="list-disc ml-4 mt-2 text-gray-700">
                {tutorialData.topics.map((sub, index) => (
                  <li key={index} className="flex items-center gap-3 mt-2">{index + 1}. {sub} </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
      <h1 className='text-3xl mt-10 font-semibold text-center'>Select Top 3 Courses</h1>
      <p className="text-sm mt-2 text-center">(To View on the landing page)</p>
      <div className="bg-white py-8 px-10 sm:px-20 shadow-md rounded-md flex flex-col gap-4 w-[95vw] sm:w-[90%] max-w-[900px] mx-auto mt-10">
        {courses.map((course) => (
          <label key={course} className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" value={course} checked={selectedCourses.includes(course)} onChange={() => handleCheckboxChange(course)} disabled={!selectedCourses.includes(course) && selectedCourses.length >= 3} />
            <span>{course}</span>
          </label>
        ))}
        {selectedCourses.length >= 3 && <SubmitButton onClick={handleSelectCourseSubmit} text="Courses Selected" />}
      </div>
      <h1 className='text-3xl mt-10 font-semibold text-center'>Add Upcoming Batches</h1>
      <form onSubmit={handleUpcomingBatchSubmit} className="bg-white py-8 px-10 sm:px-20 shadow-md rounded-md flex flex-col gap-4 w-[95vw] sm:w-[90%] max-w-[900px] mx-auto mt-10">
        <div className="flex flex-col gap-2">
          <p>Select Course</p>
          <select onChange={handleUpcomingBatchChange} name="batch" value={upcomingBatchFormValues.batch} className="bg-white rounded-md border w-full text-gray-600 py-1 px-2" >
            <option disabled value="">Select Course</option>
            <option value="Option 1">Option 1</option>
          </select>
        </div>
        <Input label="Course Starting Date" value={upcomingBatchFormValues.startingDate} required name="startingDate" onChange={handleUpcomingBatchChange} placeholder="Enter Starting Date" type="date" />
        <Input label="Course Timing" value={upcomingBatchFormValues.timing} required name="timing" onChange={handleUpcomingBatchChange} placeholder="Enter Course Timing (ex. 11:00 AM to 1:00 PM)" type="text" />
        <div className="flex flex-col gap-2">
          <p>Select Course Type</p>
          <select onChange={handleUpcomingBatchChange} name="type" value={upcomingBatchFormValues.type} className="bg-white rounded-md border w-full text-gray-600 py-1 px-2" >
            <option disabled value="">Select Type</option>
            <option value="Online">Online</option>
            <option value="Offline">Offline</option>
            <option value="Online/Offline">Online/Offline</option>
          </select>
        </div>
        <Input label="Class Days Preference" value={upcomingBatchFormValues.classDays} required name="classDays" onChange={handleUpcomingBatchChange} placeholder="Enter Class Days (ex. Weekend/Monday-Wednesday-Friday)" type="text" />
        <SubmitButton text="Submit" />
      </form>
      <h1 className='text-3xl mt-10 font-semibold text-center'>Add Courses</h1>
      <form onSubmit={handleSubmit} className="bg-white py-8 px-10 sm:px-20 shadow-md rounded-md flex flex-col gap-4 w-[95vw] sm:w-[90%] max-w-[900px] mx-auto mt-10">
        <Input label="Course name" value={formValues.course} required name="course" onChange={handleInputChange} placeholder="Enter Course Name" type="text" />
        <Input label="Course duration" value={formValues.courseDuration} required name="courseDuration" onChange={handleInputChange} placeholder="Enter Course Duration (ex. 4 Months)" type="text" />
        <Input label="Post-Course Job Opportunities" value={formValues.jobOpportunities} required name="jobOpportunities" onChange={handleInputChange} placeholder="Enter Job Opportunities (ex. 50k+ job/internship opportunities)" type="text" />
        <div className="flex flex-col gap-2">
          <p>Add Course Information</p>
          <textarea value={formValues.courseInfo} required name="courseInfo" onChange={handleInputChange} placeholder="Enter Course Information" className="bg-white rounded-md border h-[200px]  text-gray-600 py-1 px-2" type="text" ></textarea>
        </div>
        <SubmitButton text="Submit" />
      </form>
      <h1 className='text-3xl mt-10 font-semibold text-center'>Add Course Curriculum</h1>
      <div className="bg-white py-8 px-10 sm:px-20 shadow-md rounded-md flex flex-col gap-4 w-[95vw] sm:w-[90%] max-w-[900px] mx-auto mt-10">
        <div className="flex flex-col gap-2">
          <p>Select Course</p>
          <select onChange={(e) => setCurriculumValue(e.target.value)} name="course" value={curriculumValue} className="bg-white rounded-md border w-full text-gray-600 py-1 px-2" >
            <option disabled value="">Select Course</option>
            <option value="Option 1">Option 1</option>
          </select>
          <SubmitButton onClick={() => setCurriculumModal(true)} text="Add Course Curriculum" />
        </div>
      </div>
      {curriculumModal && <AddCurriculumModal curriculum={curriculumValue} onClose={() => setCurriculumModal(false)} />}
    </div>
  )
}

export default Courses
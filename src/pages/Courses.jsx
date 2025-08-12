import { useEffect, useState } from "react";
import Input from "../components/Input";
import SubmitButton from "../components/SubmitButton";
import { CiCirclePlus } from "react-icons/ci";
import adminStore from "../store/adminStore";
import authStore from "../store/authStore";
import { LuTrash } from "react-icons/lu";
import AddTopicModal from "../components/AddTopicModal";
import AddSubTopicModal from "../components/AddSubTopicModal";

const Courses = () => {
  const addCourse = adminStore((state) => state.addCourse);
  const addCourseLoader = adminStore((state) => state.addCourseLoader);
  const courses = adminStore((state) => state.courses);
  const getAllCourses = adminStore((state) => state.getAllCourses);
  const getTutorialTopic = adminStore((state) => state.getTutorialTopic);
  const courseTopics = adminStore((state) => state.courseTopics);
  const addUpcomingBatch = adminStore((state) => state.addUpcomingBatch);
  const addUpcomingBatchLoader = adminStore((state) => state.addUpcomingBatchLoader);
  const addTopicSubmit = adminStore((state) => state.addTopicSubmit);
  const addSubTopicSubmit = adminStore((state) => state.addSubTopicSubmit);
  const selectTopCourse = adminStore((state) => state.selectTopCourse);
  const selectTopCourseLoader = adminStore((state) => state.selectTopCourseLoader);
  const institute = authStore((state) => state.institute);
  const [formValues, setFormValues] = useState({
    course: "",
    courseDuration: "",
    jobOpportunities: "",
    courseInfo: "",
    courseImage: "",
    courseLogo: ""
  })
  const [upcomingBatchFormValues, setUpcomingBatchFormValues] = useState({
    batch: "",
    startingDate: "",
    timing: "",
    type: "",
    classDays: ""
  })
  const [addTopicModal, setAddTopicModal] = useState(false);
  const [addSubTopicModal, setAddSubTopicModal] = useState(false);
  const [topicId, setTopicId] = useState('');
  const [courseId, setCourseId] = useState('');
  const [selectedCourses, setSelectedCourses] = useState([]);
  const [submit, setSubmit] = useState(false);

  useEffect(() => {
    getAllCourses(institute?.id);
    getTutorialTopic(institute?.id);
  }, [getAllCourses, getTutorialTopic, addTopicSubmit, addSubTopicSubmit, submit])

  const handleCheckboxChange = (course) => {
    if (selectedCourses.includes(course)) {
      setSelectedCourses(selectedCourses.filter((c) => c !== course));
    } else if (selectedCourses.length < 3) {
      setSelectedCourses([...selectedCourses, course]);
    }
  };
  const handleSelectCourseSubmit = async (e) => {
    try {
      e.preventDefault();
      await selectTopCourse(institute?.id, { courseIds: selectedCourses });
    } catch (error) {
      console.warn(error.message);
    }
  }
  const handleUpcomingBatchSubmit = async (e) => {
    try {
      e.preventDefault();
      await addUpcomingBatch({ ...upcomingBatchFormValues, instituteId: institute?.id });
      setUpcomingBatchFormValues({
        batch: "",
        startingDate: "",
        timing: "",
        type: "",
        classDays: ""
      })
    } catch (error) {
      console.warn(error.message);
    }
  }
  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      await addCourse({ ...formValues, instituteId: institute?.id });
      setSubmit(prev => !prev);
      setFormValues({
        course: "",
        courseDuration: "",
        jobOpportunities: "",
        courseInfo: "",
        courseImage: "",
        courseLogo: ""
      });
    } catch (error) {
      console.error(error.message);
    }
  }
  const handleInputChange = (e) => {
    const { name, value, files } = e.target;

    if (files && files.length > 0) {
      const file = files[0];
      const reader = new FileReader();

      reader.onloadend = () => {
        const base64String = reader.result;
        setFormValues((prev) => ({
          ...prev,
          [name]: base64String
        }));
      };

      reader.readAsDataURL(file);
    } else {
      setFormValues((prev) => ({
        ...prev,
        [name]: value
      }));
    }
  };
  const handleUpcomingBatchChange = (e) => {
    const { name, value } = e.target;
    setUpcomingBatchFormValues((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className='p-0 sm:p-8 text-white'>
      <h1 className='text-3xl mt-10 sm:mt-0 font-semibold text-center'>Courses Added</h1>
      <div className="bg-white/10 py-8 px-10 sm:px-20 shadow-md rounded-md flex flex-col gap-4 w-[95vw] sm:w-[90%] max-w-[900px] mx-auto mt-10">
        {courses.map((course, index) => (
          <div key={index} className='border-1 bg-white/10 pb-4 shadow-md border-gray-400 rounded-2xl'>
            <div className="flex flex-col sm:flex-row p-4 items-center sm:justify-between gap-10">
              <div className="flex flex-col sm:flex-row sm:items-start items-center gap-4">
                <p className="font-semibold text-lg">{course?.course}</p>
              </div>
              <div className="flex items-center gap-3 mt-3">
                <button className='bg-red-700/70 rounded-md border border-white/40 cursor-pointer p-2'><LuTrash /></button>
              </div>
            </div>
            <h3 className="text-center font-semibold">Course Curriculum</h3>
            {
              courseTopics.filter((topic, _) => topic?.courseId === course?.id).map((topic, index) => (
                <div key={index} className="mt-4 text-gray-200">
                  <p className="pl-5 font-semibold">{topic?.topic}<button onClick={() => { setAddSubTopicModal(true); setTopicId(topic?.id) }} className="bg-sky-700 text-white p-2 ml-2 cursor-pointer rounded-full text-sm">Add Subtopic</button></p>
                  {
                    topic?.subTopic.map((item, subIndex) => (
                      <p key={subIndex} className="pl-10 text-sm mt-1">{subIndex + 1}. {item}</p>
                    ))
                  }
                </div>
              ))
            }
            <button onClick={() => { setAddTopicModal(true); setCourseId(course?.id) }} className="bg-green-600 mx-auto mt-8 text-white cursor-pointer flex items-center gap-3 py-2 pl-3 pr-1 font-semibold rounded-full">Add Topic<CiCirclePlus size={20} /></button>
          </div>
        ))}
      </div>
      <h1 className='text-3xl mt-10 font-semibold text-center'>Select Top 3 Courses</h1>
      <p className="text-sm mt-2 text-center">(To View on the landing page)</p>
      <div className="bg-white/10 py-8 px-10 sm:px-20 shadow-md rounded-md flex flex-col gap-4 w-[95vw] sm:w-[90%] max-w-[900px] mx-auto mt-10">
        {courses.map((course, index) => (
          <label key={index} className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" value={course?.id} checked={selectedCourses.includes(course?.id)} onChange={() => handleCheckboxChange(course?.id)} disabled={!selectedCourses.includes(course?.id) && selectedCourses.length >= 3} className="accent-gray-300" />
            <span>{course?.course}</span>
          </label>
        ))}
        {selectedCourses.length >= 3 && <SubmitButton isLoading={selectTopCourseLoader} onClick={handleSelectCourseSubmit} text="Courses Selected" />}
      </div>
      <h1 className='text-3xl mt-10 font-semibold text-center'>Add Upcoming Batches</h1>
      <form onSubmit={handleUpcomingBatchSubmit} className="bg-white/10 py-8 px-10 sm:px-20 shadow-md rounded-md flex flex-col gap-4 w-[95vw] sm:w-[90%] max-w-[900px] mx-auto mt-10">
        <div className="flex flex-col gap-2">
          <p>Select Course</p>
          <select onChange={handleUpcomingBatchChange} name="batch" value={upcomingBatchFormValues.batch} className="bg-black/40 rounded-md border w-full text-white/80 py-1 px-2" >
            <option disabled value="">Select Course</option>
            {courses.map((course, index) => (
              <option key={index} value={course?.course}>{course?.course}</option>
            ))
            }
          </select>
        </div>
        <Input label="Course Starting Date" value={upcomingBatchFormValues.startingDate} required name="startingDate" onChange={handleUpcomingBatchChange} placeholder="Enter Starting Date" type="date" />
        <Input label="Course Timing" value={upcomingBatchFormValues.timing} required name="timing" onChange={handleUpcomingBatchChange} placeholder="Enter Course Timing (ex. 11:00 AM to 1:00 PM)" type="text" />
        <div className="flex flex-col gap-2">
          <p>Select Course Type</p>
          <select onChange={handleUpcomingBatchChange} name="type" value={upcomingBatchFormValues.type} className="bg-black/40 rounded-md border w-full text-white/80 py-1 px-2" >
            <option disabled value="">Select Type</option>
            <option value="Online">Online</option>
            <option value="Offline">Offline</option>
            <option value="Online/Offline">Online/Offline</option>
          </select>
        </div>
        <Input label="Class Days Preference" value={upcomingBatchFormValues.classDays} required name="classDays" onChange={handleUpcomingBatchChange} placeholder="Enter Class Days (ex. Weekend/Monday-Wednesday-Friday)" type="text" />
        <SubmitButton isLoading={addUpcomingBatchLoader} text="Submit" />
      </form>
      <h1 className='text-3xl mt-10 font-semibold text-center'>Add Courses</h1>
      <form onSubmit={handleSubmit} className="bg-white/10 py-8 px-10 sm:px-20 shadow-md rounded-md flex flex-col gap-4 w-[95vw] sm:w-[90%] max-w-[900px] mx-auto mt-10">
        <Input label="Course name" value={formValues.course} required name="course" onChange={handleInputChange} placeholder="Enter Course Name" type="text" />
        <Input label="Course duration" value={formValues.courseDuration} required name="courseDuration" onChange={handleInputChange} placeholder="Enter Course Duration (ex. 4 Months)" type="text" />
        <Input label="Post-Course Job Opportunities" value={formValues.jobOpportunities} required name="jobOpportunities" onChange={handleInputChange} placeholder="Enter Job Opportunities (ex. 50k+ job/internship opportunities)" type="text" />
        <Input label="Course Image" required name="courseImage" onChange={handleInputChange} type="file" />
        <Input label="Course Logo Image" required name="courseLogo" onChange={handleInputChange} type="file" />
        <div className="flex flex-col gap-2">
          <p>Add Course Information</p>
          <textarea value={formValues.courseInfo} required name="courseInfo" onChange={handleInputChange} placeholder="Enter Course Information" className="bg-black/40 rounded-md border h-[200px]  text-white/80 py-1 px-2" type="text" ></textarea>
        </div>
        <SubmitButton isLoading={addCourseLoader} text="Submit" />
      </form>
      {addTopicModal && <AddTopicModal courseId={courseId} onClose={() => setAddTopicModal(false)} />}
      {addSubTopicModal && <AddSubTopicModal topicId={topicId} onClose={() => setAddSubTopicModal(false)} />}
    </div>
  )
}

export default Courses
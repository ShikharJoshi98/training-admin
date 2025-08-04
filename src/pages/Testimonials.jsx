import { useState } from "react"
import Input from "../components/Input"
import SubmitButton from "../components/SubmitButton"

const Testimonials = () => {
  const [formValues, setFormValues] = useState({
    studentName: "",
    testimonial: "",
    studentImage: null,
    newCompany: "",
    oldJobRole: "",
    newJobRole: "",
  })

  const handleSubmit = () => {
    try {
      e.preventDefault();
      console.log(formValues);
      setFormValues({
        studentName: "",
        testimonial: "",
        studentImage: null,
        newCompany: "",
        oldJobRole: "",
        newJobRole: "",
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

  return (
    <div className='p-0 sm:p-8'>
      <h1 className='text-3xl mt-10 sm:mt-0 font-semibold text-center'>Add Testimonials</h1>
      <form onSubmit={handleSubmit} className="bg-white py-8 px-10 sm:px-20 shadow-md rounded-md flex flex-col gap-4 w-[95vw] sm:w-[90%] max-w-[900px] mx-auto mt-10">
        <Input label="Student name" value={formValues.studentName} required name="studentName" onChange={handleInputChange} placeholder="Enter name" type="text" />
        <div className="flex flex-col gap-2">
          <p>Add Testimonial</p>
          <textarea value={formValues.testimonial} required name="testimonial" onChange={handleInputChange} placeholder="Enter Testimonial" className="bg-white rounded-md border h-[200px]  text-gray-600 py-1 px-2" type="text" ></textarea>
        </div>
        <Input label="Student Image" value={formValues.studentImage} name="studentImage" onChange={handleInputChange} type="file" />
        <Input label="Company Joined (after placement)" value={formValues.newCompany} name="newCompany" onChange={handleInputChange} placeholder="Enter Company name" type="text" />
        <Input label="Old Job Role" value={formValues.oldJobRole} name="oldJobRole" onChange={handleInputChange} placeholder="Enter Job Role" type="text" />
        <Input label="New Job Role" value={formValues.newJobRole} name="newJobRole" onChange={handleInputChange} placeholder="Enter Job Role" type="text" />
        <SubmitButton text="Submit" />
      </form>
    </div>
  )
}

export default Testimonials
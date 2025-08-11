import { useEffect, useState } from "react"
import Input from "../components/Input"
import SubmitButton from "../components/SubmitButton"
import adminStore from "../store/adminStore"
import authStore from "../store/authStore"

const Testimonials = () => {
  const addTestimonial = adminStore((state) => state.addTestimonial);
  const isTestimonialAddedLoading = adminStore((state) => state.isTestimonialAddedLoading);
  const institute = authStore((state) => state.institute);
  const [formValues, setFormValues] = useState({
    name: "",
    testimonial: "",
    studentImage: "",
    newCompany: "",
    oldJobRole: "",
    newJobRole: "",
  })

  useEffect(() => {
    setFormValues((prev) => ({
      ...prev,
      instituteId: institute?.id
    }));
  }, [institute]);

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      setFormValues((prev) => ({
        ...prev,
        instituteId: institute?.id
      }));
      await addTestimonial({ ...formValues, instituteId: institute?.id });
      setFormValues({
        name: "",
        testimonial: "",
        studentImage: "",
        newCompany: "",
        oldJobRole: "",
        newJobRole: "",
      })
    } catch (error) {
      console.warn(error.message);
    }
  }
  const handleInputChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "studentImage" && files && files.length > 0) {
      const file = files[0];
      const reader = new FileReader();

      reader.onloadend = () => {
        const base64String = reader.result;
        setFormValues((prev) => ({
          ...prev,
          studentImage: base64String
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


  return (
    <div className='p-0 pb-10 sm:p-8'>
      <h1 className='text-3xl mt-10 sm:mt-0 text-white font-semibold text-center'>Add Testimonials</h1>
      <form onSubmit={handleSubmit} className="bg-white/10 py-8 px-10 sm:px-20 shadow-md rounded-md flex flex-col gap-4 w-[95vw] sm:w-[90%] max-w-[900px] mx-auto mt-10">
        <Input label="Student name" value={formValues.name} required name="name" onChange={handleInputChange} placeholder="Enter name" type="text" />
        <div className="flex flex-col gap-2">
          <p className="text-white">Add Testimonial</p>
          <textarea value={formValues.testimonial} required name="testimonial" onChange={handleInputChange} placeholder="Enter Testimonial" className="bg-black/40 rounded-md border h-[200px]  text-white/80 py-1 px-2" type="text" ></textarea>
        </div>
        <Input label="Student Image" name="studentImage" onChange={handleInputChange} type="file" />
        <Input label="Company Joined (after placement)" value={formValues.newCompany} name="newCompany" onChange={handleInputChange} placeholder="Enter Company name" type="text" />
        <Input label="Old Job Role" value={formValues.oldJobRole} name="oldJobRole" onChange={handleInputChange} placeholder="Enter Job Role" type="text" />
        <Input label="New Job Role" value={formValues.newJobRole} name="newJobRole" onChange={handleInputChange} placeholder="Enter Job Role" type="text" />
        <SubmitButton isLoading={isTestimonialAddedLoading} text="Submit" />
      </form>
    </div>
  )
}

export default Testimonials
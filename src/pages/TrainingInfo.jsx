import { useState } from 'react'
import Input from '../components/Input';
import { detailForm, socialForm } from '../constants/companyDetails';
import SubmitButton from '../components/SubmitButton';

const TrainingInfo = () => {
  const [formValues, setFormValues] = useState({
    name: "",
    logo: null,
    email: "",
    phone: "",
    altPhone: "",
    address: ""
  });
  const [socialFormValues, setSocialFormValues] = useState({
    facebook: "",
    linkedIn: "",
    Instagram: "",
    twitter: "",
    youtube: ""
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      console.log(formValues);
      setFormValues({
        name: "",
        logo: null,
        email: "",
        phone: "",
        altPhone: "",
        address: ""
      })
    } catch (error) {
      console.warn(error.message);
    }
  }
  const handleInputChange = (e, form) => {
    const { name, value, type, files } = e.target;
    const fieldValue = type === 'file' ? files[0] : value;
    if (form === "company") {
      setFormValues((prev) => ({
        ...prev,
        [name]: fieldValue
      }));
    }
    if (form === "social") {
      setSocialFormValues((prev) => ({
        ...prev,
        [name]: fieldValue
      }));
    }
  }
  const socialFormSubmit = (e) => {
    e.preventDefault();
    try {
      console.log(socialFormValues);
      setSocialFormValues({
        facebook: "",
        linkedIn: "",
        Instagram: "",
        twitter: "",
        youtube: ""
      })
    } catch (error) {
      console.warn(error.message);
    }
  }

  return (
    <div className='p-0 sm:p-8'>
      <h1 className='text-3xl text-white mt-10 sm:mt-0 text-center font-semibold'>Institute Details</h1>
      <form onSubmit={handleSubmit} className="bg-white/10 py-8 px-10 sm:px-20 shadow-md rounded-md flex flex-col gap-4 w-[95vw] sm:w-[90%] max-w-[900px] mx-auto mt-10">
        {detailForm.map((detail, index) =>
          <Input label={detail.label} key={index} value={detail.type !== "file" ? formValues[detail.value] ?? "" : undefined} required={detail.required} name={detail.value} onChange={(e) => handleInputChange(e, "company")} placeholder={detail.placeholder} type={detail.type} />
        )}
        <SubmitButton text="Submit" />
      </form>
      <h1 className='text-3xl text-center text-white mt-12 font-semibold'>Social Links</h1>
      <form onSubmit={socialFormSubmit} className="bg-white/10 py-8 px-10 sm:px-20 shadow-md rounded-md flex flex-col gap-4 w-[95vw] sm:w-[90%] max-w-[900px] mx-auto mt-10">
        {socialForm.map((social, index) => (
          <Input label={social.label} key={index} value={socialFormValues[social.value] ?? ""} name={social.value} onChange={(e) => handleInputChange(e, "social")} placeholder={social.placeholder} type={social.type} />
        ))}
        <SubmitButton text="Submit" />
      </form>
    </div>
  )
}

export default TrainingInfo
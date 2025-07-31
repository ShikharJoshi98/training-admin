import { useState } from 'react'
import Input from '../components/Input';
import SubmitButton from './SubmitButton';
import { detailForm, socialForm } from '../constants/companyDetails';

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
    <div className='p-4 sm:p-8'>
      <h1 className='text-3xl xl:text-center font-semibold'>Company Details</h1>
      <form onSubmit={handleSubmit} className='max-w-[900px] xl:mx-auto'>
        <div className='mt-10 text-sm grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] max-w-[900px] gap-5 sm:gap-x-10'>
          {detailForm.map((detail, index) =>
            <div key={index} className='flex gap-3'>
              <p>{index + 1}.</p>
              <Input label={detail.label} smallWidth={200} largeWidth={250} value={detail.type !== "file" ? formValues[detail.value] ?? "" : undefined} required={detail.required} name={detail.value} onChange={(e) => handleInputChange(e, "company")} placeholder={detail.placeholder} type={detail.type} />
            </div>
          )}
        </div>
        <SubmitButton text="Submit" />
      </form>
      <h1 className='text-3xl xl:text-center mt-12 font-semibold'>Social Links</h1>
      <form onSubmit={socialFormSubmit} className='max-w-[900px] xl:mx-auto' >
        <div className='mt-10 grid text-sm grid-cols-[repeat(auto-fit,minmax(250px,1fr))] max-w-[900px] gap-5 sm:gap-x-10'>
          {socialForm.map((social, index) => (
            <div key={index} className='flex gap-3'>
              <p>{index+1}.</p>
              <Input label={social.label} smallWidth={200} largeWidth={250} value={socialFormValues[social.value] ?? ""} name={social.value} onChange={(e) => handleInputChange(e, "social")} placeholder={social.placeholder} type={social.type} />
            </div>
          ))}
        </div>
        <SubmitButton text="Submit" />
      </form>
    </div>
  )
}

export default TrainingInfo
import { useEffect, useState } from 'react'
import Input from '../components/Input';
import { detailForm, socialForm } from '../constants/companyDetails';
import SubmitButton from '../components/SubmitButton';
import adminStore from '../store/adminStore';
import authStore from '../store/authStore';

const TrainingInfo = () => {
  const getInstituteData = adminStore((state) => state.getInstituteData);
  const instituteData = adminStore((state) => state.instituteData);
  const updateInstituteData = adminStore((state) => state.updateInstituteData);
  const isUpdateLoading = adminStore((state) => state.isUpdateLoading);
  const addSocialLinks = adminStore((state) => state.addSocialLinks);
  const isAddSocialLinkLoading = adminStore((state) => state.isAddSocialLinkLoading);
  const getSocialLinks = adminStore((state) => state.getSocialLinks);
  const socialLinks = adminStore((state) => state.socialLinks);
  const institute = authStore((state) => state.institute);
  const [formValues, setFormValues] = useState({
    name: "",
    logo: "",
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

  useEffect(() => {
    getInstituteData(institute?.id);
    getSocialLinks(institute?.id);
  }, [getInstituteData, isUpdateLoading, getSocialLinks]);
  useEffect(() => {
    if (instituteData) {
      setFormValues({
        name: instituteData?.instituteName || "",
        logo: "",
        email: instituteData?.email || "",
        phone: instituteData?.phone || "",
        altPhone: instituteData?.altPhone || "",
        address: instituteData?.address || ""
      });
      if (socialLinks) {
        setSocialFormValues({
          instituteId: instituteData?.id || "",
          facebook: socialLinks?.facebook || "",
          linkedIn: socialLinks?.linkedIn || "",
          Instagram: socialLinks?.Instagram || "",
          twitter: socialLinks?.twitter || "",
          youtube: socialLinks?.youtube || ""
        });
      }
    }
  }, [instituteData, socialLinks]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateInstituteData(instituteData?.id, formValues);
    } catch (error) {
      console.warn(error.message);
    }
  }
  const handleInputChange = (e, form) => {
    const { name, value, type, files } = e.target;

    if (type === "file" && files[0]) {
      const file = files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result;
        if (form === "company") {
          setFormValues((prev) => ({
            ...prev,
            [name]: base64String,
          }));
        }
      };
      reader.readAsDataURL(file);
      return;
    }

    const fieldValue = value;
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
  };

  const socialFormSubmit = async (e) => {
    e.preventDefault();
    try {
      await addSocialLinks(socialFormValues, instituteData?.id);
    } catch (error) {
      console.warn(error.message);
    }
  }

  return (
    <div className='p-0 pb-10 sm:p-8'>
      <h1 className='text-3xl text-white mt-10 sm:mt-0 text-center font-semibold'>Institute Details</h1>
      <form onSubmit={handleSubmit} className="bg-white/10 py-8 px-10 sm:px-20 shadow-md rounded-md flex flex-col gap-4 w-[95vw] sm:w-[90%] max-w-[900px] mx-auto mt-10">
        {detailForm.map((detail, index) =>
          <div key={index}>
            <Input label={detail.label} value={detail.type !== "file" ? formValues[detail.value] ?? "" : undefined} required={detail.required} name={detail.value} onChange={(e) => handleInputChange(e, "company")} placeholder={detail.placeholder} type={detail.type} />
            {detail?.label === 'Logo' && (!instituteData?.logo ? <p className='mt-2 text-gray-500'>No Logo chosen</p> : <img src={instituteData?.logo} width={80} className='mt-2 rounded-md' />)}
          </div>
        )}
        <SubmitButton isLoading={isUpdateLoading} text="Update" />
      </form>
      <h1 className='text-3xl text-center text-white mt-12 font-semibold'>Social Links</h1>
      <form onSubmit={socialFormSubmit} className="bg-white/10 py-8 px-10 sm:px-20 shadow-md rounded-md flex flex-col gap-4 w-[95vw] sm:w-[90%] max-w-[900px] mx-auto mt-10">
        {socialForm.map((social, index) => (
          <Input label={social.label} key={index} value={socialFormValues[social.value] ?? ""} name={social.value} onChange={(e) => handleInputChange(e, "social")} placeholder={social.placeholder} type={social.type} />
        ))}
        <SubmitButton isLoading={isAddSocialLinkLoading} text="Submit" />
      </form>
    </div>
  )
}

export default TrainingInfo
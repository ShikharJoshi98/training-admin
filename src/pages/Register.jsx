import { useState } from "react";
import Input from "../components/Input";

const Register = () => {
    const [isShowPassword, setShowPassword] = useState(false);
    const [isConfirmShowPassword, setConfirmShowPassword] = useState(false);
    const [formValues, setFormValues] = useState({
        instituteName: "",
        password: "",
        email: "",
        phone: "",
        altPhone: "",
        address: ""
    });
    const [isConfirmPassword, setConfirmPassword] = useState("");

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormValues((prev) => ({
            ...prev,
            [name]: value
        }))
    }
    const handleSubmit = (e) => {
        try {
            e.preventDefault();
            if (formValues.password !== isConfirmPassword) {
                console.log("Passwords do not match. Please try again.")
                return;
            }
            console.log(formValues);
            setFormValues({
                instituteName: "",
                password: "",
                email: "",
                phone: "",
                altPhone: "",
                address: ""
            });
            setConfirmPassword("");
        } catch (error) {
            console.warn(error.message);
        }
    }
    return (
        <div className="bg-black/30 w-[90vw] max-w-xl mx-auto mt-16 backdrop-blur-sm rounded-xl p-6 border border-white/20 shadow-lg">
            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                <Input label="Institute Name*" value={formValues.instituteName} required placeholder="Enter Institute name" onChange={handleInputChange} name="instituteName" />
                <Input label="Institute Email*" value={formValues.email} required placeholder="Enter Institute email" onChange={handleInputChange} name="email" type="email" />
                <Input label="Institute Phone Number*" value={formValues.phone} required placeholder="Enter Phone Number" onChange={handleInputChange} name="phone" type="phone" />
                <Input label="Alternate Phone Number" value={formValues.altPhone} placeholder="Enter Phone Number" onChange={handleInputChange} name="altPhone" type="phone" />
                <Input label="Institute Address*" value={formValues.address} required placeholder="Enter Address" onChange={handleInputChange} name="address" />
                <div className="space-y-3">
                    {isShowPassword ? <Input label="Enter Password*" value={formValues.password} required placeholder="Enter Password" onChange={handleInputChange} name="password" type='text' /> : <Input label="Enter Password*" required placeholder="Enter Password" value={formValues.password} onChange={handleInputChange} name="password" type='password' />}
                    <div className="flex items-center gap-2">
                        <input type="checkbox" onChange={() => setShowPassword(prev => !prev)} id="show_password" className="accent-gray-300" />
                        <label htmlFor="show_password" className="text-white cursor-pointer">Show Password</label>
                    </div>
                </div>
                <div className="space-y-3">
                    {isConfirmShowPassword ? <Input label="Confirm Password*" placeholder="Enter Password" required value={isConfirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} name="password" type='text' /> : <Input label="Confirm Password*" required placeholder="Enter Password" value={isConfirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} type='password' />}
                    <div className="flex items-center gap-2">
                        <input type="checkbox" onChange={() => setConfirmShowPassword(prev => !prev)} id="confirm_password" className="accent-gray-300" />
                        <label htmlFor="confirm_password" className="text-white cursor-pointer">Show Password</label>
                    </div>
                </div>
                <button className="text-lg py-2 px-16 mx-auto rounded-4xl w-fit hover:bg-slate-400/30 font-semibold duration-300 bg-slate-500/30 border border-white/40 text-white cursor-pointer">Register</button>
            </form>
        </div>
    )
}

export default Register
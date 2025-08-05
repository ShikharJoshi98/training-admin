import Input from "../components/Input";
import { useState } from "react";

const Login = () => {
    const [isShowPassword, setShowPassword] = useState(false);
    const [formValues, setFormValues] = useState({
        instituteName: "",
        password: ""
    });

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
            console.log(formValues);
            setFormValues({
                instituteName: "",
                password: ""
            })
        } catch (error) {
            console.warn(error.message);
        }
    }

    return (
        <div className="bg-black/30 w-[90vw] max-w-96 mx-auto mt-16 backdrop-blur-sm rounded-xl p-6 border border-white/20 shadow-lg">
            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                <Input label="Institute Name" value={formValues.instituteName} required onChange={handleInputChange} name="instituteName" />
                {isShowPassword ? <Input label="Password" value={formValues.password} required onChange={handleInputChange} name="password" type='text' /> : <Input label="Password" required value={formValues.password} onChange={handleInputChange} name="password" type='password' />}
                <div className="flex items-center gap-2">
                    <input type="checkbox" onChange={() => setShowPassword(prev => !prev)} id="show_password" className="accent-gray-300" />
                    <label htmlFor="show_password" className="text-white cursor-pointer">Show Password</label>
                </div>
                <button className="text-lg py-2 px-16 w-fit mx-auto rounded-4xl hover:bg-slate-400/30 font-semibold duration-300 bg-slate-500/30 text-white cursor-pointer">Login</button>
            </form>
        </div>
    )
}

export default Login
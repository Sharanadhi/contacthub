import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import { FaCircleExclamation } from "react-icons/fa6";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

import './Signup.scss'
import CoverImage from '../CoverImage/CoverImage'

function Signup(){
  const [formData, setFormData] = useState({email: "",phone:"",password: "",confirm_password:""});
  const [errors, setErrors] = useState({});
  const [emailApiError, setEmailApiError] = useState("");
  const [phoneApiError, setPhoneApiError] = useState("");
  const [apiError, setApiError] = useState("");
  const baseUrl = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();

  const validatePhoneNumber = (phone) => {
    const phoneRegex1 = /^\+\d{1,3} \(\d{3}\) \d{3}-\d{4}$/;
    const phoneRegex2 = /^(\+[1-9]{1}[0-9]{3,14})?([0-9]{9,14})$/; 
    const phonetest = phoneRegex2.test(phone) || phoneRegex1.test(phone) ;
    return phonetest;
  };

  const validate = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.full_name) newErrors.full_name = "Please enter your name";
    if (!emailRegex.test(formData.email))
      newErrors.email = "Invalid email";
    if (!formData.email) newErrors.email = "Please enter your email";
    if (!validatePhoneNumber(formData.phone)) newErrors.phone = "Phone number is invalid";    
    if (!formData.phone) newErrors.phone = "please enter your phone number";
    if (formData.password!=formData.confirm_password) newErrors.confirm_password = "The passwords you entered does not match";
    if (!formData.password) newErrors.password = "Please enter your password";
    if (!formData.confirm_password) newErrors.confirm_password = "Please confirm your password";
    return newErrors;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setEmailApiError('');
    setPhoneApiError('');
    setApiError('');
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    try {
      const response = await axios.post(`${baseUrl}userauth/signup`, formData);
      if(response.data && response.status===201){
      localStorage.setItem("token", response.data.token);
        setFormData({full_name:"", email: "", phone:"", password: "", confirm_password:""});
        setErrors({});
        toast.success("Sign up successful!", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "dark",
          progress: undefined,
        });
        setTimeout(() => navigate("/"), 2000);
      }
    } catch (error) {
      console.error("Error signing in", error);
      if (error.response && error.response.data && error.response.data.error) {
        if(error.response.data.type==='email') setEmailApiError(error.response.data.error);
        if(error.response.data.type==='phone') setPhoneApiError(error.response.data.error)
      } else {
        setApiError("An error occurred during sign in. Please try again later");
      }
    }
  };

  return (
    <section className='signUp'>
      <CoverImage />
      <section className='signUp__rightSection'>
        <h1>ContactHub</h1>
        <form onSubmit={handleSubmit} className='signUp__form'>
          <h2 className='signUp__text'>Sign up</h2>
          <div className='input__group'>
            <input type="text" name='full_name' placeholder='Full name' className='signUp__input' value={formData.full_name}
              onChange={handleChange}/>
            {errors.full_name && <span className="error-message"><FaCircleExclamation /> 
            {errors.full_name}</span>}          
          </div>
          <div className='input__group'>
            <input type="email" name='email' placeholder='Email' className='signUp__input' value={formData.email}
              onChange={handleChange}/>
            {errors.email && <span className="error-message"><FaCircleExclamation /> {errors.email}</span>}
            {emailApiError && <span className="error-message"><FaCircleExclamation /> {emailApiError}</span>}     
          </div>
          <div className='input__group'>
            <input type="text" name='phone' placeholder='Phone' className='signUp__input' value={formData.phone}
              onChange={handleChange}/>
            {errors.phone && <span className="error-message"><FaCircleExclamation /> {errors.phone}</span>}
            {phoneApiError && <span className="error-message"><FaCircleExclamation /> {phoneApiError}</span>}     
          </div>
          <div className='input__group'>
            <input type="password" name='password' placeholder='Password' value={formData.password}
              onChange={handleChange}/>
            {errors.password && <span className="error-message"><FaCircleExclamation /> {errors.password}</span>}
          </div>
          <div className='input__group'>
            <input type="password" name='confirm_password' placeholder='Confirm Password' value={formData.confirm_password}
              onChange={handleChange}/>
            {errors.confirm_password && <span className="error-message"><FaCircleExclamation /> {errors.confirm_password}</span>}
            {apiError && <span className="error-message">{apiError}</span>} 
          </div>
          <div className='input__group'>
            <button type='submit' className='signUp__btn'>Sign up</button>
            <div className='link__group'>
              <a href='/' className='signUp__link'>Sign in</a>
            </div>
          </div>
        </form>
      </section>
      <ToastContainer />        
    </section>
  )
}

export default Signup
import { useState,useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import { FaCircleExclamation } from "react-icons/fa6";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'


import './Signin.scss'
import CoverImage from '../CoverImage/CoverImage';

function Signin(){
  const [formData, setFormData] = useState({email: "",password: ""});
  const [errors, setErrors] = useState({});
  const [emailApiError, setEmailApiError] = useState("");
  const [passwordApiError, setPasswordApiError] = useState("");
  const [apiError, setApiError] = useState("");
  const baseUrl = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();

  const validate = () => {
      const newErrors = {};
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email))
        newErrors.email = "Invalid email";
      if (!formData.email) newErrors.email = "Please enter your email";
      if (!formData.password) newErrors.password = "Please enter your password";
      return newErrors;
  };

  const handleChange = (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setEmailApiError('');
    setPasswordApiError('');
    setApiError('');
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    try {
      const response = await axios.post(`${baseUrl}userauth/signin`, formData);
      localStorage.setItem("token", response.data.token);
      setFormData({ email: "", password: "" });
      setErrors({});
      toast.success("Sign-in successful! Redirecting to your contacts...", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
        progress: undefined,
      });
      setTimeout(() => navigate("/contacts"), 2000);
    } catch (error) {
      console.error("Error signing in", error);
      if (error.response && error.response.data && error.response.data.error) {
        if(error.response.data.type==='email'){
          setEmailApiError(error.response.data.error);
        }
        else{
          setPasswordApiError(error.response.data.error);
        }
      } else {
        setApiError("An error occurred during sign in. Please try again later");
      }
    }
  };

  useEffect(() => {
    const isAuthenticated = !!localStorage.getItem('token'); // or use your auth logic
    if (isAuthenticated) {
      navigate('/contacts');
    }
  }, [navigate]);

  return (
    <section className='signIn'>
      <CoverImage />
      <section className='signIn__rightSection'>
        <h1>ContactHub</h1>
        <form onSubmit={handleSubmit} className='signIn__form'>
          <h2 className='signIn__text'>Sign in</h2>
          <div className='input__group'>
            <input
              type="email"
              name='email'
              placeholder='Email'
              className='signIn__input'
              value={formData.email}
              onChange={handleChange}
            />
            {errors.email && <span className="error-message"><FaCircleExclamation /> {errors.email}</span>}
            {emailApiError && <span className="error-message"><FaCircleExclamation /> {emailApiError}</span>}         
          </div>
          <div className='input__group'>
            <input
              type="password"
              name='password'
              placeholder='Password'
              className='signIn__input'
              value={formData.password}
              onChange={handleChange}
            />
            {errors.password && <span className="error-message"><FaCircleExclamation /> {errors.password}</span>}
            {passwordApiError && <span className="error-message"><FaCircleExclamation /> {passwordApiError}</span>}         
            {apiError && <span className="error-message"><FaCircleExclamation /> {apiError}</span>} 
            <ToastContainer />        
          </div>
          <div className='input__group'>
            <button type='submit' className='signIn__btn'>Sign in</button>
            <div className='link__group'>
              <a href='/register' className='signIn__link'>Sign up</a>
            </div>
          </div>
        </form>
      </section>
    </section>
  )
}

export default Signin



  

  

  

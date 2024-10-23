import { useState } from 'react'
import axios from 'axios'
// import { useNavigate } from 'react-router-dom';
import { FaCircleExclamation } from "react-icons/fa6";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

import './Signin.scss'
import cover_img1 from '../../assets/img/people/p1.jpg'
import cover_img2 from '../../assets/img/people/p2.jpg'
import cover_img3 from '../../assets/img/people/p3.jpg'
import cover_img4 from '../../assets/img/people/p4.jpg'
import cover_img5 from '../../assets/img/people/p5.jpg'
import cover_img6 from '../../assets/img/people/p6.jpg'
import cover_img7 from '../../assets/img/people/p7.jpg'
import cover_img8 from '../../assets/img/people/p8.jpg'
import cover_img9 from '../../assets/img/people/p9.jpg'
import cover_img10 from '../../assets/img/people/p10.jpg'
import cover_img11 from '../../assets/img/people/p11.jpg'
import cover_img12 from '../../assets/img/people/p12.jpg'


function Signin(){
  const [formData, setFormData] = useState({email: "",password: ""});
  const [errors, setErrors] = useState({});
  const [emailApiError, setEmailApiError] = useState("");
  const [passwordApiError, setPasswordApiError] = useState("");
  const [apiError, setApiError] = useState("");
  const baseUrl = import.meta.env.VITE_API_URL;

  // const navigate = useNavigate();

    const validate = () => {
        const newErrors = {};
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email))
          newErrors.email = "Invalid email";
        if (!formData.email) newErrors.email = "Please enter your email";
        if (!formData.password) newErrors.password = "please enter your password";
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
        console.log(response);
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
        // setTimeout(() => navigate("/contacts"), 2000);
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

  return (
    <section className='signIn'>
      <section className='signIn__leftSection'>
        <img src={cover_img9} alt="peoples image" className='signIn__poster'/>
        <img src={cover_img2} alt="peoples image" className='signIn__poster'/>
        <img src={cover_img1} alt="peoples image" className='signIn__poster'/>
        <img src={cover_img10} alt="peoples image" className='signIn__poster'/>
        <img src={cover_img3} alt="peoples image" className='signIn__poster'/>
        <img src={cover_img11} alt="peoples image" className='signIn__poster'/>
        <img src={cover_img5} alt="peoples image" className='signIn__poster'/>
        <img src={cover_img6} alt="peoples image" className='signIn__poster'/>
        <img src={cover_img4} alt="peoples image" className='signIn__poster'/>
        <img src={cover_img7} alt="peoples image" className='signIn__poster'/>
        <img src={cover_img8} alt="peoples image" className='signIn__poster'/>
        <img src={cover_img12} alt="peoples image" className='signIn__poster'/>
      </section>
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
            {errors.email && <span className="error-message"><FaCircleExclamation />{errors.email}</span>}
            {emailApiError && <span className="error-message">{emailApiError}</span>}         
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
            {errors.password && <span className="error-message"><FaCircleExclamation />{errors.password}</span>}
            {passwordApiError && <span className="error-message">{passwordApiError}</span>}         
            {apiError && <span className="error-message">{apiError}</span>} 
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



  

  

  

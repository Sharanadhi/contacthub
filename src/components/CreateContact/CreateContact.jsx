import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import { FaCircleExclamation } from "react-icons/fa6";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";

import './createContact.scss'
// import Sidebar from '../Sidebar/Sidebar.jsx'

function CreateContact() {
  const [formData, setFormData] = useState(
    {
      first_name:"",
      last_name:"",
      job_title:"",
      company:"",
      business_email:"",
      personal_email:"",
      business_phone:"",
      personal_phone:"",
      address:"",
      status:"",
      comments:"",
      profile_picture:"",
      linked_in:"", 
    }
  );
  const [errors, setErrors] = useState({});
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
    if (!formData.first_name) newErrors.first_name = "Please enter your first name";
    if (!formData.last_name) newErrors.last_name = "Please enter your last name";
    if (formData.business_email && !emailRegex.test(formData.business_email))
      newErrors.business_email = "Invalid email";
    if (formData.personal_email && !emailRegex.test(formData.personal_email))
      newErrors.personal_email = "Invalid email";
    if (!formData.personal_email) newErrors.personal_email = "Please enter your email";
    if (!validatePhoneNumber(formData.personal_phone)) newErrors.personal_phone = "Phone number is invalid";    
    if (formData.business_phone && !validatePhoneNumber(formData.business_phone)) newErrors.business_phone = "Phone number is invalid";    
    if (!formData.personal_phone) newErrors.personal_phone = "please enter your phone number";    
    return newErrors;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setApiError('');
    const token = localStorage.getItem('token');
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    try {
      const response = await axios.post(`${baseUrl}contacts`, formData, {
        headers: {
          authorization: `Bearer ${token}`
        }
      });
      if(response.data && response.status===201){
        setFormData({
          first_name:"",
          last_name:"",
          job_title:"",
          company:"",
          business_email:"",
          personal_email:"",
          business_phone:"",
          personal_phone:"",
          address:"",
          status:"",
          comments:"",
          profile_picture:"",
          linked_in:"", 
        });
        setErrors({});
        toast.success("Contact added successful!", {
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
      }
    } catch (error) {
      
      if (error.response && error.response.data && error.response.data.error) {
        setApiError(error.response.data.error);
        // if(error.response.data.type==='email') setEmailApiError(error.response.data.error);
        // if(error.response.data.type==='phone') setPhoneApiError(error.response.data.error)
      } else {
        setApiError("An error occurred during creating the contact. Please try again later");
      }
    }
  };

  const goBack = () =>{
    setFormData({
      first_name:"",
      last_name:"",
      job_title:"",
      company:"",
      business_email:"",
      personal_email:"",
      business_phone:"",
      personal_phone:"",
      address:"",
      status:"",
      comments:"",
      profile_picture:"",
      linked_in:"", 
    });
    navigate("/contacts");
  }

  return (
    <>
      <section className="createContact">
      {/* <Sidebar /> */}

        <div className='createContact__card'>
        <Breadcrumbs aria-label="breadcrumb">
              <Link underline="hover" color="inherit" href="/contacts">
                Contacts
              </Link>
              <Typography sx={{ color: "text.primary" }}>
                Create contact
              </Typography>
            </Breadcrumbs>
          <div className="createContact__card-header">
            <h1 className='createContact__heading'>Add New Contact</h1>
          </div>
          <div className="createContact__card-body">
            <form onSubmit={handleSubmit} className="createContact__form">
              <div className="form__section">
              <div className="input__group">
                <label htmlFor="first_name">First Name</label>
                <input type="text" name="first_name" placeholder='First Name' className='createContact__input' value={formData.first_name}
              onChange={handleChange}/>
            {errors.first_name && <span className="error-message"><FaCircleExclamation /> 
            {errors.first_name}</span>}  
              </div>

              <div className="input__group">
                <label htmlFor="last_name">Last Name</label>
                <input type="text" name="last_name" placeholder='Last Name' className='createContact__input'value={formData.last_name}
              onChange={handleChange}/>
            {errors.last_name && <span className="error-message"><FaCircleExclamation /> 
            {errors.last_name}</span>}  
              </div>

              <div className="input__group">
                <label htmlFor="company">Company</label>
                <input type="text" name="company" placeholder='Company' className='createContact__input'value={formData.company}
              onChange={handleChange}/>
            {errors.company && <span className="error-message"><FaCircleExclamation /> 
            {errors.company}</span>}  
              </div>

              <div className="input__group">
                <label htmlFor="job_title">Job Title</label>
                <input type="text" name="job_title" placeholder='Job Title' className='createContact__input' value={formData.job_title}
              onChange={handleChange}/>
            {errors.job_title && <span className="error-message"><FaCircleExclamation /> 
            {errors.job_title}</span>}  
              </div>

              <div className="input__group">
                <label htmlFor="address">Address</label>
                <input type='text' name="address"  placeholder='Address' className='createContact__input' value={formData.address}
              onChange={handleChange}/>
            {errors.address && <span className="error-message"><FaCircleExclamation /> 
            {errors.address}</span>}  
            {apiError && <span className="error-message">{apiError}</span>} 

              </div>

              {/* <div className="input__group">
                <label htmlFor="">Image</label>
                <input type="text" placeholder='contact image' className='createContact__input'/>
              </div> */}
              </div>

              <div className="form__section">
              <div className="input__group">
                <label htmlFor="personal_phone">Mobile Phone</label>
                <input type="text" name="personal_phone" placeholder='Phone' className='createContact__input'value={formData.personal_phone}
              onChange={handleChange}/>
            {errors.personal_phone && <span className="error-message"><FaCircleExclamation /> 
            {errors.personal_phone}</span>}  
              </div>

              <div className="input__group">
                <label htmlFor="business_phone">Business Phone</label>
                <input type="text" name="business_phone" placeholder='Phone' className='createContact__input'value={formData.business_phone}
              onChange={handleChange}/>
            {errors.business_phone && <span className="error-message"><FaCircleExclamation /> 
            {errors.business_phone}</span>}  
              </div>

              <div className="input__group">
                <label htmlFor="personal_email">Personal Email</label>
                <input type="text" name="personal_email" placeholder='Email' className='createContact__input'value={formData.personal_email}
              onChange={handleChange}/>
            {errors.personal_email && <span className="error-message"><FaCircleExclamation /> 
            {errors.personal_email}</span>}  
              </div>

              <div className="input__group">
                <label htmlFor="business_email">Business Email</label>
                <input type="text" name="business_email" placeholder='Email' className='createContact__input'value={formData.business_email}
              onChange={handleChange}/>
            {errors.business_email && <span className="error-message"><FaCircleExclamation /> 
            {errors.business_email}</span>}  
              </div>
              
             
              <div className="input__group">
                <label htmlFor="">Linked in</label>
                <input type="text" placeholder='Linked in profile url' className='createContact__input' name='linked_in'  value={formData.linked_in}
              onChange={handleChange}/>
              </div>
              </div>
             
              <ToastContainer />
            </form>
          </div>
          <div className="createContact__card-footer">
            <button className='createContact__button--cancel' onClick={goBack}>Cancel</button>
            <button className='createContact__button--save' type='submit' onClick={handleSubmit}>Save</button>
          </div>
        </div>
      </section>
    </>
)
}

export default CreateContact
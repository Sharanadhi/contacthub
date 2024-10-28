import { useState, useEffect } from "react";
import axios from "axios";
import Divider from "@mui/material/Divider";

import { FaCircleExclamation } from "react-icons/fa6";
import {  toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function UpdateStatus({
  contactStatus,
  setContactStatus,
  contactComment,
  setContactComment,
  contact,
  setLogs
}) {
  const baseUrl = import.meta.env.VITE_API_URL;
  const [updateErrorMessage, setUpdateErrorMessage] = useState("");
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState("");
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    job_title: '',
    company: '',
    business_email: '',
    personal_email: '',
    business_phone: '',
    personal_phone: '',
    address: '',
    linked_in: ''
  });

  useEffect(() => {
    if (contact) {
      setFormData({
        first_name: contact.first_name || '',
        last_name: contact.last_name || '',
        job_title: contact.job_title || '',
        company: contact.company || '',
        business_email: contact.business_email || '',
        personal_email: contact.personal_email || '',
        business_phone: contact.business_phone || '',
        personal_phone: contact.personal_phone || '',
        address: contact.address || '',
        linked_in: contact.linked_in || ''
      });
    }
  }, [contact]);

  const fetchLogs = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      return;
    }
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}contacts/logs/${contact.id}`,
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
      setLogs(response.data);
    } catch (error) {
      console.log(error.response.data.error);
      if (error.response.data.error === "Failed to authenticate token") {
        toast.warning("Your session expired. Please sign in again", {
          position: "top-right",
          autoClose: 500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "dark",
          progress: undefined,
        });
        
      }
    }
  };

  const updateContactStatus = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    if (!contactStatus) {
      setUpdateErrorMessage("Please select a status.");
      return;
    }

    try {
      const response = await axios.put(
        `${import.meta.env.VITE_API_URL}contacts/status/${contact.id}`,
        {
          status: contactStatus,
          comments: contactComment,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setContactComment("");
      toast.success(response.data.message, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
        progress: undefined,
      });
      fetchLogs();
      setUpdateErrorMessage('');
    } catch (error) {
      console.error("Error updating contact status", error);
      if (error.response) {
        setUpdateErrorMessage(error.response.data.message);
      } else {
        setUpdateErrorMessage("An error occurred");
      }
    }
  };
 
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

  const updateDetails = async (e) => {
    e.preventDefault();
    setApiError('');
    const token = localStorage.getItem('token');
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    try {
      const response = await axios.put(`${baseUrl}contacts/${contact.id}`, formData, {
        headers: {
          authorization: `Bearer ${token}`
        }
      });
      if(response.data && response.status===200){
        
        setErrors({});
        toast.success("Contact updated successfully!", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "dark",
          progress: undefined,
        });
      }
    } catch (error) {
      
      if (error.response && error.response.data && error.response.data.error) {
        setApiError(error.response.data.error);
      } else {
        setApiError("An error occurred during creating the contact. Please try again later");
      }
    }
  };

  return (
    <section className="info">
      <h2>Update</h2>
      <form onSubmit={updateContactStatus} className="info__form">
        <div className="input__group">
          <select
            name="contact_status"
            className="select"
            value={contactStatus}
            onChange={(e) => setContactStatus(e.target.value)}
          >
            <option value="">Select Status</option>
            <option value="New">New</option>
            <option value="Open">Open</option>
            <option value="In Progress">In Progress</option>
            <option value="Open Deals">Open deals</option>
            <option value="Closed">Closed</option>
          </select>
        </div>
        <div className="input__group">
          <textarea
            name="contact__comment"
            placeholder="Comments"
            value={contactComment}
            onChange={(e) => setContactComment(e.target.value)}
          ></textarea>
          {updateErrorMessage && <p>{updateErrorMessage}</p>}
        </div>
        <div className="btn__group">
          <button type="submit" className="primary__btn">
            Update
          </button>
        </div>
      </form>
      
      <Divider className="divider" variant="middle" />
      <br />
      <form onSubmit={updateDetails} className="createContact__form">
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
                <input type="text" name="job_title" placeholder='Job Title' className='createContact__input'value={formData.job_title}
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
                <input type="text" name="linked_in" placeholder='Linked in profile url' className='createContact__input' value={formData.linked_in}
              onChange={handleChange} />
              </div>
              </div>
            </form>
            <br />
            <div className="btn__group">
          <button type="submit" className="primary__btn" onClick={updateDetails}>
            Update
          </button>

        </div>
    </section>
  );
}

export default UpdateStatus;

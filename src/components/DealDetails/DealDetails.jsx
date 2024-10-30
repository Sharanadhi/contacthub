import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axiosInstance from '../../utils/axios'

import { toast, ToastContainer } from "react-toastify";
import CustomTimeline from "../CustomTimeline/CustomTimeline";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";

import "react-toastify/dist/ReactToastify.css";
import './DealDetails.scss'
import Navbar from '../Navbar/Navbar.jsx';


import {
  FaPhone,
  FaEnvelope,
  FaCalendar,
  FaLocationArrow
} from "react-icons/fa6";

function DealDetails() {
  const params = useParams();
  const deal_id = params.dealId;
  const [updateErrorMessage, setUpdateErrorMessage] = useState("");
  const [deal,setDeal]=useState([]);
  const [contact, setContact] = useState([]);
  const [dealStatus, setDealStatus] = useState("");
  const [dealComment, setDealComment] = useState("");
  const [profilePic, setProfilePic] = useState("");
  const [logs, setLogs] = useState([]);

  const navigate = useNavigate();

  const getInitials = (firstName, lastName) => {
    return `${firstName?.charAt(0) || ""}${lastName?.charAt(0) || ""}`;
  };

  const openContact = () => {
    const id = deal.contact_id;
    navigate(`/contacts/${id}`);
  };

  useEffect(() => {
      const fetchDealData = async () => {
        const token = localStorage.getItem("token");
        if (!token) {
          return;
        }
        try {
          const response = await axiosInstance.get(
            `${import.meta.env.VITE_API_URL}deals/${deal_id}`,
            {
              headers: {
                authorization: `Bearer ${token}`,
              },
            }
          );
          setDeal(response.data.deals[0]);
          setDealStatus(response.data.deals[0].status)
          fetchContactData(response.data.deals[0].contact_id);
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
            setTimeout(() => navigate("/"), 500);
          }
        }
      }
    
      const fetchLogs = async () => {
        const token = localStorage.getItem("token");
        if (!token) {
          return;
        }
        try {
          const response = await axiosInstance.get(
            `${import.meta.env.VITE_API_URL}deals/logs/${deal_id}`,
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
            setTimeout(() => navigate("/"), 500);
          }
        }
      };

      const fetchContactData = async (contact_id) => {
        const token = localStorage.getItem("token");
        if (!token) {
          return;
        }
        try {
          const response = await axiosInstance.get(
            `${import.meta.env.VITE_API_URL}contacts/${contact_id}`,
            {
              headers: {
                authorization: `Bearer ${token}`,
              },
            }
          );
          setProfilePic(response.data.contacts[0].profile_picture);
          setContact(response.data.contacts[0]);
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
            setTimeout(() => navigate("/"), 500);
          }
        }
      };

    fetchDealData();
    fetchLogs();
  },[deal_id,navigate]);

  const updateDealStatus = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    if (!dealStatus) {
      setUpdateErrorMessage("Please select a status.");
      return;
    }

    try {
      const response = await axiosInstance.put(
        `${import.meta.env.VITE_API_URL}deals/status/${deal_id}`,
        {
          status: dealStatus,
          comments: dealComment,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setDealComment("");
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
      setLogs(response.data.logs);
      setUpdateErrorMessage('');
    } catch (error) {
      console.error("Error updating deal status", error);
      if (error.response) {
        setUpdateErrorMessage(error.response.data.message);
      } else {
        setUpdateErrorMessage("An error occurred");
      }
    }
  };

  return (
<>
<Navbar />
<section className="dealDetails">
      <div className="dealDetails__container">
        <div className='detailscard'>
        <div role="presentation" className="detailscard__header">
            <Breadcrumbs aria-label="breadcrumb">
              <Link underline="hover" color="inherit" href="/deals">
                Deals
              </Link>
              <Typography sx={{ color: "text.primary" }}>
                Deal details
              </Typography>
            </Breadcrumbs>
          </div>
         <div className="detailscard__header">
          <div className='detailscard__titlebox'>
            <h1>{deal.title}</h1>
            <p className='detailscard__amount'>$ {deal.amount}</p>
          </div>
          <div className='detailscard__productbox'>
            <h3>{deal.product}</h3>
          </div>
         </div>
         <div className='detailscard__body'>
          <div>
            <p>{deal.description}</p>
          </div>

          <form onSubmit={updateDealStatus} className="info__form">
            <div className="input__group">
              <select
                name="contact_status"
                className="select"
                value={dealStatus}
                onChange={(e) => setDealStatus(e.target.value)}
                >
                <option value="">Select Status</option>
                <option value="New">New</option>
                <option value="Open">Open</option>
                <option value="In Progress">In Progress</option>
                <option value="Open Deals">Open deals</option>
                <option value="Closed - deal won">Closed - deal won</option>
                <option value="Closed - deal lost">Closed - deal lost</option>
              </select>
            </div>
        <div className="input__group">
          <textarea
            name="contact__comment"
            placeholder="Comments"
            value={dealComment}
            onChange={(e) => setDealComment(e.target.value)}
          ></textarea>
          {updateErrorMessage && <p>{updateErrorMessage}</p>}
        </div>
        <div className="btn__group">
          <button type="submit" className="primary__btn">
            Update
          </button>
        </div>
      </form>
      <h2>Logs</h2>
      <CustomTimeline logs={logs}/>
         </div>
        </div>
        <div className="profilecard">
        <div className="profilecard__card-header">
            {profilePic && (
             <div className="profilecard__img-container">
              <img
                src={profilePic}
                alt="profile image"
                className="profilecard__img"
                
              />
              
             </div>
            )}
            {!profilePic && (
              <div className="profilecard__templatecard blue-bg">
                  <div>
                  <h1 className="profile_initials">
                    {getInitials(contact.first_name, contact.last_name)}
                  </h1>
                  </div>
              </div>
            )}
            <div className="profilecard__titlebox">
              <h3 className="profilecard__name">
                {contact.first_name} {contact.last_name}
              </h3>
              <p className="profilecard__title">{contact.job_title}</p>
              
            </div>
            <div className="profilecard__card-links">
              <a className="profilecard__link" href="#">
                <FaPhone />
              </a>
              <a className="profilecard__link" href="#">
                <FaEnvelope />
              </a>
              <a className="profilecard__link" href="#">
                <FaCalendar />
              </a>
              <a className="profilecard__link" href="#">
                <FaLocationArrow />
              </a>
            </div>
          </div>
          <div className="profilecard__card-body">
              <button className='primary__btn' onClick={openContact}>View</button>
            </div>
        </div>
      </div>
      <ToastContainer />
    </section>
    </>
  )
}

export default DealDetails
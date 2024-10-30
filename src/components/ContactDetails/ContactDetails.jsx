import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axiosInstance from '../../utils/axios'


import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Divider from "@mui/material/Divider";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
// import Chip from "@mui/material/Chip";
// import Stack from '@mui/material/Stack';
import {
  FaPhone,
  FaEnvelope,
  FaCalendar,
  FaLocationArrow,
  FaAddressCard,
  FaCamera,
  FaHandshake,
} from "react-icons/fa6";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Navbar from "../Navbar/Navbar";
import TabPanel from "../TabPanel/TabPanel";
import CustomTimeline from "../CustomTimeline/CustomTimeline";
import ContactStages from "../ContactStages/ContactStages";
import UpdateStatus from "../UpdateStatus/UpdateStatus";
import ContactDeals from '../ContactDeals/ContactDeals'
import AddDealForm from '../AddDealForm/AddDealForm'


import "./ContactDetails.scss";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 2,
  p: 4,
};

function ContactDetails() {
  const [tabvalue, setTabValue] = useState(0);
  const [contact, setContact] = useState([]);
  const [logs, setLogs] = useState([]);
  const [deals, setDeals] = useState([]);
  
  const params = useParams();
  const contact_id = params.contactId;
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");
  const [profilePic, setProfilePic] = useState("");

  const [contactStatus, setContactStatus] = useState("");
  const [contactComment, setContactComment] = useState("");

  const onFileChange = (e) => {
    setFile(e.target.files[0]);
  };



  const fileUpload = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("profileImage", file);
    formData.append("contact_id", contact_id);
    try {
      const res = await axiosInstance.post(
        `${import.meta.env.VITE_API_URL}upload`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      toast.success("Contact photo uploaded successfuly!", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
        progress: undefined,
      });
      handleClose();

      setProfilePic(res.data.file);
    } catch (err) {
      if (err.response) {
        setMessage(err.response.data.message);
      } else {
        setMessage("An error occurred");
      }
    }
  };

  useEffect(() => {
    const fetchData = async () => {
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
        setContactStatus(response.data.contacts[0].status);
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

    const fetchLogs = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        return;
      }
      try {
        const response = await axiosInstance.get(
          `${import.meta.env.VITE_API_URL}contacts/logs/${contact_id}`,
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

    const fetchDeals = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        return;
      }
      try {
        const response = await axiosInstance.get(
          `${import.meta.env.VITE_API_URL}contacts/deals/${contact_id}`,
          {
            headers: {
              authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(response.data);
        setDeals(response.data);
      } catch (error) {
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

    fetchData();
    fetchLogs();
    fetchDeals();
  }, [contact_id, navigate]);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const getInitials = (firstName, lastName) => {
    return `${firstName?.charAt(0) || ""}${lastName?.charAt(0) || ""}`;
  };

  function removeLinkedInUrl(inputString) {
    const url = "https://www.linkedin.com/";

    if (inputString) return inputString.replace(url, "");
    else return "";
  }

  return (
    <>
    <Navbar />
    <section className="contactDetails">
      <div className="contactDetails__container">
        <div className="profilecard">
          <div className="profilecard__card-header">
            {profilePic && (
             <div className="profilecard__img-container" onClick={handleOpen}>
              <img
                src={profilePic}
                alt="profile image"
                className="profilecard__img"
                
              />
              <div className="profilecard__img-container__overlay">
                <FaCamera className="camera-icon"/>
              </div>
             </div>
            )}
            {!profilePic && (
              <div className="profilecard__templatecard blue-bg" onClick={handleOpen}>
                  <div>
                  <h1 className="profile_initials">
                    {getInitials(contact.first_name, contact.last_name)}
                  </h1>
                  </div>
                  <div className="profilecard__templatecard__overlay">
                    <FaCamera className="camera-icon"/>
                  </div>
              </div>
            )}
            <div className="profilecard__titlebox">
              <h3 className="profilecard__name">
                {contact.first_name} {contact.last_name}
              </h3>
              <p className="profilecard__title">{contact.job_title}</p>
              <a href={contact.linked_in} target="_blank">
                {removeLinkedInUrl(contact.linked_in)}
              </a>
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
            <Divider className="divider" variant="middle" />
          </div>
          <div className="card-body">
            <dl>
              <dt className="profilecard__header">Company</dt>
              <dd className="profilecard__value">{contact.company}</dd>
              <dt className="profilecard__header">Personal Email</dt>
              <dd className="profilecard__value">{contact.personal_email}</dd>
              <dt className="profilecard__header">Mobile phone</dt>
              <dd className="profilecard__value">{contact.personal_phone}</dd>
              <dt className="profilecard__header">Business phone</dt>
              <dd className="profilecard__value">{contact.business_phone}</dd>
              <dt className="profilecard__header">Address</dt>
              <dd className="profilecard__value">{contact.address}</dd>
            </dl>
          </div>
        </div>
        <div className="detailscard">
          <div role="presentation" className="detailscard__header">
            <Breadcrumbs aria-label="breadcrumb">
              <Link underline="hover" color="inherit" href="/contacts">
                Contacts
              </Link>
              <Typography sx={{ color: "text.primary" }}>
                Contact details
              </Typography>
            </Breadcrumbs>
            <ContactStages currentStage={contactStatus} />
          </div>
          <div className="detailscard__card-header">
            <Tabs
              className="detailscard__tabs"
              value={tabvalue}
              onChange={handleTabChange}
              aria-label="icon position tabs example"
            >
              <Tab
                icon={<FaAddressCard />}
                iconPosition="start"
                label="Details"
              />
              <Tab icon={<FaPhone />} iconPosition="start" label="Activity" />
              <Tab icon={<FaHandshake />} iconPosition="start" label="Deals" />
              <Tab icon={<FaEnvelope />} iconPosition="start" label="Notes" />
            </Tabs>
          </div>
          <div className="detailscard__card-body">
            <TabPanel value={tabvalue} index={0}>
              <UpdateStatus
                contactStatus={contactStatus}
                setContactStatus={setContactStatus}
                contactComment={contactComment}
                setContactComment={setContactComment}
                contact={contact}
                setLogs={setLogs}
              />
            </TabPanel>
            <TabPanel value={tabvalue} index={1}>
              <CustomTimeline logs={logs} />
            </TabPanel>
            <TabPanel value={tabvalue} index={2}>
              <section className="deals-section">
                <h2>Deals</h2>
                <AddDealForm setDeals={setDeals} contact_id={contact_id}/>
                <Divider className="divider" variant="middle"/>
                <br />
                <ContactDeals deals={deals} />
              </section>
            </TabPanel>
            <TabPanel value={tabvalue} index={3}>
              <section className="notes">
                <h2 className="notes__text">Notes</h2>
                <form className="notes__form">
                  <div className="input__group">
                    <textarea
                      name="notes_input"
                      className="notes__input"
                      placeholder="Add a note..."
                    ></textarea>
                  </div>
                  <div className="btn__group">
                    <button className="primary__btn">Add</button>
                  </div>
                </form>
                <Divider className="divider" variant="middle" />
                <div className="notes__list">
                  <div className="notes__container">
                    <p className="notes__note">
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Incidunt architecto quod veritatis modi iure, itaque
                      officiis deserunt consequuntur necessitatibus consectetur
                      molestias magnam sapiente ducimus. Eos reiciendis
                      architecto iure facere non.
                    </p>
                    <p className="notes__date">01/01/2024 03:09 pm</p>
                  </div>
                  <Divider className="divider" />
                  <div className="notes__container">
                    <p className="notes__note">
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Incidunt architecto quod veritatis modi iure, itaque
                      officiis deserunt consequuntur necessitatibus consectetur
                      molestias magnam sapiente ducimus. Eos reiciendis
                      architecto iure facere non.
                    </p>
                    <p className="notes__date">01/01/2024 03:09 pm</p>
                  </div>
                  <Divider className="divider" />
                  <div className="notes__container">
                    <p className="notes__note">
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Incidunt architecto quod veritatis modi iure, itaque
                      officiis deserunt consequuntur necessitatibus consectetur
                      molestias magnam sapiente ducimus. Eos reiciendis
                      architecto iure facere non.
                    </p>
                    <p className="notes__date">01/01/2024 03:09 pm</p>
                  </div>
                </div>
              </section>
            </TabPanel>
          </div>
        </div>
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Upload Contact photo</h5>
                <button
                  type="button"
                  className="close_button"
                  onClick={handleClose}
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <form onSubmit={fileUpload} className="upload__form">
                  <input type="file" name="avatar" onChange={onFileChange} />
                  <button className="primary__btn" type="submit">
                    Upload
                  </button>
                  {message && <p>{message}</p>}
                </form>
              </div>
            </div>
          </div>
        </Box>
      </Modal>
      <ToastContainer />
    </section>
    </>
  );
}

export default ContactDetails;

import './Card.scss';
import { useNavigate } from 'react-router-dom';
import { Avatar } from '@mui/material';

const Card = ({ data }) => {
  const navigate = useNavigate();
  const openContact = (contact_id) => {
    navigate(`/contacts/${contact_id}`);
  };

  const getInitials = (firstName, lastName) => {
    return `${firstName?.charAt(0) || ""}${lastName?.charAt(0) || ""}`;
  };

  return (
    <div className="card" onClick={() => openContact(data.id)}>
      <div className='card__header'>
      {data.profile_picture && (
        // <img className='card__img' src={data.profile_picture} alt={data.first_name} />
        <Avatar alt={data.first_name} src={data.profile_picture} />
      )}
       {!data.profile_picture && (
        <div className="card__templatecard">
            <h1 className="card_initials">
              {getInitials(data.first_name, data.last_name)}
            </h1>
       
        </div>
       )}

        <div className='card__titlebox'>
        <h3>{data.first_name} {data.last_name}</h3>
        <p>{data.job_title}</p>
        </div>
      </div>
      
      <p><b>Company:</b> {data.company}</p>
      <p><b>Phone:</b> {data.personal_phone}</p>
      <p><b>Email:</b> {data.personal_email}</p>
      <p><b>Status:</b> {data.status}</p>
    </div>
  );
};

export default Card;
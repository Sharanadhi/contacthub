import { useNavigate } from 'react-router-dom';

function ContactDeals({ deals }) {
  const navigate = useNavigate();

  const handleViewClick = (id) => {
    navigate(`/deals/${id}`);
  };

  return (
    <div className="deals-section__container">
      {deals.length === 0 ? (
        <h2>No deals available</h2>
      ) : (
        deals.map((deal, index) => (
          <div className="deals-section__card" key={index}>
            <div className="deals-section__body">
              <h3 className="deals-section__title">{deal.title}</h3>
              <p><b>Product:</b> {deal.product}</p>
              <p><b>Amount:</b> {deal.amount}</p>
              <p><b>Status:</b> {deal.status}</p>
              <p className="deals-section__desc">{deal.description}</p>
            </div>
            <div className="deals-section__footer">
              <button className="primary__btn" onClick={() => handleViewClick(deal.id)}>View</button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default ContactDeals;

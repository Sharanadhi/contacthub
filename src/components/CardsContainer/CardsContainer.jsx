import { useState, useEffect } from 'react';
import './CardsContainer.scss';
import Card from '../Card/Card';

const CardsContainer = ({ data }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [cardsPerPage, setCardsPerPage] = useState(12);
  const [filteredData, setFilteredData] = useState(data);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    setFilteredData(data.filter(item =>
      item.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.last_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.job_title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.company.toLowerCase().includes(searchTerm.toLowerCase())
    ));
  }, [searchTerm, data]);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleCardsPerPageChange = (event) => {
    setCardsPerPage(Number(event.target.value));
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const indexOfLastCard = currentPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;
  const currentCards = filteredData.slice(indexOfFirstCard, indexOfLastCard);

  const renderCards = currentCards.map((item) => (
    <Card key={item.id} data={item} />
  ));

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(filteredData.length / cardsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="cards-container">
      <div className="cards-container__controls">
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="cards-container__search"
        />
        <select
          value={cardsPerPage}
          onChange={handleCardsPerPageChange}
          className="cards-container__select"
        >
          <option value="12">12</option>
          <option value="24">24</option>
          <option value="48">48</option>
          <option value="60">60</option>
        </select>
      </div>
      <div className="cards-container__grid">
        {renderCards}
      </div>
      <div className="cards-container__pagination">
        {pageNumbers.map(number => (
          <button
            key={number}
            onClick={() => handlePageChange(number)}
            className={`cards-container__page ${number === currentPage ? 'active' : ''}`}
          >
            {number}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CardsContainer;

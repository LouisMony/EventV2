import React, { useState } from 'react';

const Filters = ({onClickFunction}) => {
  const [activeFilter, setActiveFilter] = useState('Date');

  const handleClick = (e) => {
    const clickedFilter = e.target.innerText;
    setActiveFilter(clickedFilter);
    onClickFunction(clickedFilter)
  };

  return (
    <div className='home__filters'>
      <span
        className={activeFilter === 'Date' ? 'filterActive' : ''}
        onClick={handleClick}
      >
        Date
      </span>
      <span
        className={activeFilter === 'Thème' ? 'filterActive' : ''}
        onClick={handleClick}
      >
        Thème
      </span>
      <span
        className={activeFilter === 'Reservations' ? 'filterActive' : ''}
        onClick={handleClick}
      >
        Reservations
      </span>
    </div>
  );
};

export default Filters;

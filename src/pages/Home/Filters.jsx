import React from 'react'

const Filters = () => {
  const handleClick = (e) =>{
    console.log(e.target);
  }
  return (
    <div className='home__filters'>
      <span onClick={handleClick}>Date</span>
      <span onClick={handleClick}>Thème</span>
      <span onClick={handleClick}>Lieu</span>
    </div>
  )
}

export default Filters

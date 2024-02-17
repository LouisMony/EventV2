import React, { useEffect, useState } from 'react'
import { formatterDate } from '../../js/helpers'

const EventBloc = ({name, imageLink, category, date, places, reservations }) => {

  const [formattedDate, setFormattedDate] = useState(null)
  
  useEffect(() =>{
    const newDate = formatterDate(date)
    setFormattedDate(newDate)
  },[date])
  return (
    <div className='eventBloc'>
      <div className='eventBloc__img'>
        <img src={imageLink} alt="Evenement" />
      </div>
      <div className='eventBloc__main'>
        <span className='eventBloc__main__title'>{name}</span>
        <span>{category}</span>
        {formattedDate ? <span>{formattedDate}</span> : null}
      </div>
      <div className='eventBloc__end'>
        <img src="./media/img/arrow_right.svg" alt="Voir le détail" />
        <p>
            <span className='count'>{reservations} / {places}</span>
            <span>Participants</span>
        </p>
      </div>
    </div>
  )
}

export default EventBloc

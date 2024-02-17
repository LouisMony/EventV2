import React, { useEffect, useState } from 'react'
import iconCalendar from '../../assets/calendar.svg'
import iconLocation from '../../assets/location.svg'
import iconClock from '../../assets/clock.svg'
import iconPeople from '../../assets/people.svg'
import { formatterDate } from '../../js/helpers'

const Info = ({data}) => {
    const [formattedDate, setFormattedDate] = useState(null)

    useEffect(() =>{
        const newDate = formatterDate(data.date)
        setFormattedDate(newDate)
      },[data])

    return (
        <div className='eventDetail__info'>
            <div className='eventDetail__info__item item1'>
                <div>
                    <img src={iconCalendar} alt='Icone Calendrier'/>
                    <span>{formattedDate}</span>
                </div>
            </div>
            <div className='eventDetail__info__item item2'>
                <div>
                    <img src={iconLocation} alt='Icone Localisation'/>
                    <span>{data.location}</span>
                </div>
            </div>
            <div className='eventDetail__info__item item3'>
                <div>
                    <img src={iconClock} alt='Icone Heure'/>
                    <span>{data.hour.slice(0, -3)}</span>
                </div>
            </div>
            <div className='eventDetail__info__item item4'>
                <div>
                    <img src={iconPeople} alt='Icone Inscrits'/>
                    <span>{data.reservations} / {data.places}</span>
                </div>
            </div>
        </div>
    )
}

export default Info

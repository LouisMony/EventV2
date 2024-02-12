import React from 'react'
import iconCalendar from '../../assets/calendar.svg'
import iconLocation from '../../assets/location.svg'
import iconClock from '../../assets/clock.svg'
import iconPeople from '../../assets/people.svg'

const Info = () => {
  return (
    <div className='eventDetail__info'>
        <div className='eventDetail__info__item item1'>
            <div>
                <img src={iconCalendar} alt='Icone Calendrier'/>
                <span>06 / 02 / 2023</span>
            </div>
        </div>
        <div className='eventDetail__info__item item2'>
            <div>
                <img src={iconLocation} alt='Icone Localisation'/>
                <span>En boutique</span>
            </div>
        </div>
        <div className='eventDetail__info__item item3'>
            <div>
                <img src={iconClock} alt='Icone Heure'/>
                <span>21:00 - 00h00</span>
            </div>
        </div>
        <div className='eventDetail__info__item item4'>
            <div>
                <img src={iconPeople} alt='Icone Inscrits'/>
                <span>Complet</span>
            </div>
        </div>
    </div>
  )
}

export default Info

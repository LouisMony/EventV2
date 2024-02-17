import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
//STYLE
import '../../style/StyleEventDetails.scss';

//COMP
import Info from './Info';
import { Link, useNavigate } from 'react-router-dom';

//IMG
import iconArrow from '../../assets/arrow_left.svg'

const EventDetail = () => {
  const params = useParams()
  const history = useNavigate();

  const [eventInfo, setEventInfo] = useState(null)

  const eventsSelector = useSelector(state => state.events.data)

  const goBack = () => {
    history.goBack();
  };

  useEffect(() =>{
    if(eventsSelector){
      console.log(params.id);
      console.log(eventsSelector);
      const selectedEvent = eventsSelector.find((event) => event.id === params.id);
      console.log(selectedEvent);
      if (selectedEvent) {setEventInfo(selectedEvent)}
    }
  },[eventsSelector])


  return (
    <>
    {
      eventInfo ?
        <div className='eventDetail'>
          <div className='eventDetail__banner' style={{ backgroundImage: `url(${eventInfo.image_link})` }}>
            <Link to="#" onClick={goBack}>
              <img src={iconArrow} alt='Revenir à la page précendente'/>
              <span>Retour</span>
            </Link>
          </div>
          <div className='eventDetail__content'>
            <div className='eventDetail__content__title'>
              <h2>{eventInfo.name}</h2>
              <h3>{eventInfo.category}</h3>
            </div>
            <Info data={eventInfo}/>
            <p>
              <span>Détails :</span><br/>
              {eventInfo.description}
            </p>
            <p className='alert'>
              Cet événement est actuellement complet, vous pouvez cependant vous inscrire dans la file d’attente : en cas de désistement d’un participant vous pourriez être recontacter par notre équipe pour pouvoir participer.
            </p>
            <button className='mainButton'>M’inscrire dans la file d’attente</button>
          </div>
          
        </div>
      : <span className='loader'></span>
    }
    </>
    
  )
}

export default EventDetail

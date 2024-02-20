import React, { useEffect, useState } from 'react'
import EventBloc from '../Home/EventBloc'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux';
import { useAuth } from '../../context/AuthProvider';

//STYLE
import '../../style/StyleAccount.scss';

const Account = () => {
  const eventsSelector = useSelector(state => state.events.data);
  const inscriptionSelector = useSelector(state => state.inscriptions.data)
  const user = useAuth()

  const [submittedEvents, setSubmittedEventsEvents] = useState(null);

  useEffect(() =>{
    const userID = user.user.id
    const userInscriptions = inscriptionSelector.filter(inscription => inscription.idUser === userID);
    const userEvents = eventsSelector.filter(event => {
      return userInscriptions.some(inscription => inscription.idEvent === event.id);
    });
    console.log(userEvents);
    setSubmittedEventsEvents(userEvents)
    
  },[user, eventsSelector, inscriptionSelector])

  return (
    <div className='account'>
      <h2>Mes prochains évènements :</h2>
      <p>Super ! Vous êtes inscrit à 3 de nos prochains évenements. Si vous êtes sur liste d'attente pas de panique ! Notre équipe vous préviendra au plus vite en cas de désistement de l'un des participants </p>
      {submittedEvents ?
        <ul className="account__events">
          {submittedEvents.map(item => (
            <li key={item.id}>
              <Link to={`/event/${item.id}`}>
                <EventBloc name={item.name} imageLink={item.image_link} category={item.category} date={item.date} places={item.places} reservations={item.reservations} />
              </Link>
            </li>
          ))}
        </ul>
      : <span className='loader'></span>}
      
    </div>
  )
}

export default Account

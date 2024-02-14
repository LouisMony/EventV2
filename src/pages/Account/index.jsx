import React from 'react'
import EventBloc from '../Home/EventBloc'
import { Link } from 'react-router-dom'

//STYLE
import '../../style/StyleAccount.scss';

const Account = () => {
  return (
    <div className='account'>
      <h2>Mes prochains évènements :</h2>
      <p>Super ! Vous êtes inscrit à 3 de nos prochains évenements. Si vous êtes sur liste d'attente pas de panique ! Notre équipe vous préviendra au plus vite en cas de désistement de l'un des participants </p>
      <ul className="account__events">
          <li>
            <Link to={'/event/3'}>
                <EventBloc />
            </Link>
          </li>
          <li>
            <Link to={'/event/3'}>
                <EventBloc />
            </Link>
          </li><li>
            <Link to={'/event/3'}>
                <EventBloc />
            </Link>
          </li><li>
            <Link to={'/event/3'}>
                <EventBloc />
            </Link>
          </li>
        </ul>
    </div>
  )
}

export default Account

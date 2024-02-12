import React from 'react'
//STYLE
import '../../style/StyleEventDetails.scss';

//COMP
import Info from './Info';
import { Link, useNavigate } from 'react-router-dom';

//IMG
import iconArrow from '../../assets/arrow_left.svg'

const EventDetail = () => {
  const history = useNavigate();

  const goBack = () => {
    history.goBack();
  };

  return (
    <div className='eventDetail'>
      <div className='eventDetail__banner'>
        <Link to="#" onClick={goBack}>
          <img src={iconArrow} alt='Revenir à la page précendente'/>
          <span>Retour</span>
        </Link>
      </div>
      <div className='eventDetail__content'>
        <div className='eventDetail__content__title'>
          <h2>Draft - Edition #45</h2>
          <h3>Magic the Gathering</h3>
        </div>
        <Info/>
        <p>
          <span>Détails :</span><br/>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </p>
        <p className='alert'>
          Cet événement est actuellement complet, vous pouvez cependant vous inscrire dans la file d’attente : en cas de désistement d’un participant vous pourriez être recontacter par notre équipe pour pouvoir participer.
        </p>
        <button className='mainButton'>M’inscrire dans la file d’attente</button>
      </div>
      
    </div>
  )
}

export default EventDetail

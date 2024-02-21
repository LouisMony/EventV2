import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import iconArrow from '../../assets/arrow_left.svg'

const GoBack = ({link}) => {
    return (
        <Link className='goBackLink' to={link} >
            <img src={iconArrow} alt='Revenir à la page précendente'/>
            <span>Retour</span>
        </Link>
    )
}

export default GoBack

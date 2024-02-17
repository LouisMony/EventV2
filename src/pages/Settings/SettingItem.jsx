import React from 'react'
import { Link } from 'react-router-dom'

const SettingItem = (props) => {
  return (
    <li className='settings__list__item'>
        <Link to={props.link}>
            <span>{props.label}</span>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M8.90991 19.9201L15.4299 13.4001C16.1999 12.6301 16.1999 11.3701 15.4299 10.6001L8.90991 4.08008" stroke="#222222" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
        </Link>
    </li>
  )
}

export default SettingItem

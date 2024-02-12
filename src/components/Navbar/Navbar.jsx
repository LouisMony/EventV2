import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import '../../style/StyleNav.scss';

const Navbar = () => {
  const [currentPage, setCurrentPage] = useState(null)
  const location = useLocation()

  useEffect(() =>{
    setCurrentPage(location.pathname)
  }, [location])
  return (
    <div className='navbar'>
      <Link className={`navbar__link ${currentPage === "/" ? 'active-link' : ''}`} to="/">
        <div className='navbar__link__icon'>
            {
              currentPage == "/" ? 
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M29.24 9.01343L24.7466 27.0535C24.4266 28.4001 23.2267 29.3334 21.84 29.3334H4.31997C2.30664 29.3334 0.866657 27.36 1.46666 25.4267L7.07998 7.40015C7.46665 6.14681 8.62666 5.28003 9.93333 5.28003H26.3333C27.6 5.28003 28.6533 6.05337 29.0933 7.12004C29.3467 7.69337 29.4 8.34676 29.24 9.01343Z" stroke="#FF3A3A" strokeWidth="1.5" strokeMiterlimit="10"/>
                <path d="M21.3333 29.3333H27.7066C29.4266 29.3333 30.7733 27.88 30.6533 26.16L29.3333 8" stroke="#FF3A3A" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M12.9067 8.50676L14.2934 2.74683" stroke="#FF3A3A" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M21.84 8.52002L23.0934 2.7334" stroke="#FF3A3A" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M10.2667 16H20.9333" stroke="#FF3A3A" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M8.93335 21.3333H19.6" stroke="#FF3A3A" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              :
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M29.24 9.01343L24.7466 27.0535C24.4266 28.4001 23.2267 29.3334 21.84 29.3334H4.31997C2.30664 29.3334 0.866657 27.36 1.46666 25.4267L7.07998 7.40015C7.46665 6.14681 8.62666 5.28003 9.93333 5.28003H26.3333C27.6 5.28003 28.6533 6.05337 29.0933 7.12004C29.3467 7.69337 29.4 8.34676 29.24 9.01343Z" stroke="#222222" strokeWidth="1.5" strokeMiterlimit="10"/>
                <path d="M21.3333 29.3333H27.7066C29.4266 29.3333 30.7733 27.88 30.6533 26.16L29.3333 8" stroke="#222222" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M12.9067 8.50676L14.2934 2.74683" stroke="#222222" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M21.84 8.52002L23.0934 2.7334" stroke="#222222" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M10.2667 16H20.9333" stroke="#222222" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M8.93335 21.3333H19.6" stroke="#222222" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            }
            
          </div>
          <span>Home</span>
      </Link>
      <Link className={`navbar__link ${currentPage === "/mon-compte" ? 'active-link' : ''}`} to="/mon-compte">
        <div className='navbar__link__icon'>
            {
              currentPage == "/mon-compte" ? 
              <svg width="33" height="33" viewBox="0 0 33 33" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M15.125 26.8125H28.875" stroke="#FF3A3A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M15.125 17.1875H28.875" stroke="#FF3A3A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M15.125 7.5625H28.875" stroke="#FF3A3A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M4.125 7.5625L5.5 8.9375L9.625 4.8125" stroke="#FF3A3A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M4.125 17.1875L5.5 18.5625L9.625 14.4375" stroke="#FF3A3A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M4.125 26.8125L5.5 28.1875L9.625 24.0625" stroke="#FF3A3A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              
              : 
              <svg width="33" height="33" viewBox="0 0 33 33" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M15.125 26.8125H28.875" stroke="#222222" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M15.125 17.1875H28.875" stroke="#222222" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M15.125 7.5625H28.875" stroke="#222222" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M4.125 7.5625L5.5 8.9375L9.625 4.8125" stroke="#222222" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M4.125 17.1875L5.5 18.5625L9.625 14.4375" stroke="#222222" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M4.125 26.8125L5.5 28.1875L9.625 24.0625" stroke="#222222" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            }
        </div>
        <span>Inscriptions</span>
      </Link>
      <Link className={`navbar__link ${currentPage === "/settings" ? 'active-link' : ''}`} to="/settings">
        <div className='navbar__link__icon'>
          {
            currentPage == '/settings' ?
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M16 20C18.2091 20 20 18.2091 20 16C20 13.7909 18.2091 12 16 12C13.7909 12 12 13.7909 12 16C12 18.2091 13.7909 20 16 20Z" stroke="#FF3A3A" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M2.66666 17.1733V14.8267C2.66666 13.44 3.8 12.2933 5.2 12.2933C7.61333 12.2933 8.6 10.5867 7.38666 8.49333C6.69333 7.29333 7.10666 5.73333 8.32 5.04L10.6267 3.72C11.68 3.09333 13.04 3.46666 13.6667 4.52L13.8133 4.77333C15.0133 6.86666 16.9867 6.86666 18.2 4.77333L18.3467 4.52C18.9733 3.46666 20.3333 3.09333 21.3867 3.72L23.6933 5.04C24.9067 5.73333 25.32 7.29333 24.6267 8.49333C23.4133 10.5867 24.4 12.2933 26.8133 12.2933C28.2 12.2933 29.3467 13.4267 29.3467 14.8267V17.1733C29.3467 18.56 28.2133 19.7067 26.8133 19.7067C24.4 19.7067 23.4133 21.4133 24.6267 23.5067C25.32 24.72 24.9067 26.2667 23.6933 26.96L21.3867 28.28C20.3333 28.9067 18.9733 28.5333 18.3467 27.48L18.2 27.2267C17 25.1333 15.0267 25.1333 13.8133 27.2267L13.6667 27.48C13.04 28.5333 11.68 28.9067 10.6267 28.28L8.32 26.96C7.10666 26.2667 6.69333 24.7067 7.38666 23.5067C8.6 21.4133 7.61333 19.7067 5.2 19.7067C3.8 19.7067 2.66666 18.56 2.66666 17.1733Z" stroke="#FF3A3A" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            :
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M16 20C18.2091 20 20 18.2091 20 16C20 13.7909 18.2091 12 16 12C13.7909 12 12 13.7909 12 16C12 18.2091 13.7909 20 16 20Z" stroke="#222222" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M2.66666 17.1733V14.8267C2.66666 13.44 3.8 12.2933 5.2 12.2933C7.61333 12.2933 8.6 10.5867 7.38666 8.49333C6.69333 7.29333 7.10666 5.73333 8.32 5.04L10.6267 3.72C11.68 3.09333 13.04 3.46666 13.6667 4.52L13.8133 4.77333C15.0133 6.86666 16.9867 6.86666 18.2 4.77333L18.3467 4.52C18.9733 3.46666 20.3333 3.09333 21.3867 3.72L23.6933 5.04C24.9067 5.73333 25.32 7.29333 24.6267 8.49333C23.4133 10.5867 24.4 12.2933 26.8133 12.2933C28.2 12.2933 29.3467 13.4267 29.3467 14.8267V17.1733C29.3467 18.56 28.2133 19.7067 26.8133 19.7067C24.4 19.7067 23.4133 21.4133 24.6267 23.5067C25.32 24.72 24.9067 26.2667 23.6933 26.96L21.3867 28.28C20.3333 28.9067 18.9733 28.5333 18.3467 27.48L18.2 27.2267C17 25.1333 15.0267 25.1333 13.8133 27.2267L13.6667 27.48C13.04 28.5333 11.68 28.9067 10.6267 28.28L8.32 26.96C7.10666 26.2667 6.69333 24.7067 7.38666 23.5067C8.6 21.4133 7.61333 19.7067 5.2 19.7067C3.8 19.7067 2.66666 18.56 2.66666 17.1733Z" stroke="#222222" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          }
          
        </div>
        <span>Réglages</span>
      </Link>
    </div>
  )
}

export default Navbar

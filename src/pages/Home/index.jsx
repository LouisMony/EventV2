import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

//COMP
import EventBloc from "./EventBloc";
import SearchBar from "./SearchBar";
import Filters from "./Filters";

//STYLE
import '../../style/StyleHome.scss';

function Home(){
    const eventsSelector = useSelector(state => state.events.data)


    return (
      <div className='home'>
        <div className="home__head">
          <img src="./media/img/logo.svg" alt="Logo Events" />
          <SearchBar />
        </div>
       
        <Filters />

        <ul className="home__events">
            {eventsSelector ? eventsSelector.map((item, index) => (
                <li key={index}>
                  <Link to={'/event/3'}>
                      <EventBloc name={item.name} imageLink={item.image_link} category={item.category} date={item.date} places={item.places} reservations={item.reservations} />
                  </Link>
                </li>
            )) : 
            <span class="loader"></span>
          }
          
        </ul>
      </div>
    );
  }
  
  export default Home;
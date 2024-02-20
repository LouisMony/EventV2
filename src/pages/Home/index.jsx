import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

//COMP
import EventBloc from "./EventBloc";
import SearchBar from "./SearchBar";
import Filters from "./Filters";

//STYLE
import '../../style/StyleHome.scss';

function Home() {
  const eventsSelector = useSelector(state => state.events.data);
  const [sortedEvents, setSortedEvents] = useState([...eventsSelector]);

  const handleClickFilter = (filter) => {
    let sortedEventsCopy = [...eventsSelector];

    if (filter === 'Thème') {
      sortedEventsCopy.sort((a, b) => a.category.localeCompare(b.category));
    }
    if (filter === 'Date') {
      sortedEventsCopy.sort((a, b) => new Date(a.date) - new Date(b.date));
    }
    if (filter === 'Lieu') {
      sortedEventsCopy.sort((a, b) => a.location.localeCompare(b.location));
    }

    setSortedEvents(sortedEventsCopy);
  }

  return (
    <div className='home'>
      <div className="home__head">
        <img src="./media/img/logo.svg" alt="Logo Events" />
        <SearchBar />
      </div>

      <Filters onClickFunction={handleClickFilter} />

      <ul className="home__events">
        {sortedEvents ? sortedEvents.map((item, index) => (
          <li key={index}>
            <Link to={'/event/' + item.id}>
              <EventBloc name={item.name} imageLink={item.image_link} category={item.category} date={item.date} places={item.places} reservations={item.reservations} />
            </Link>
          </li>
        )) :
          <span className="loader"></span>
        }
      </ul>
    </div>
  );
}

export default Home;

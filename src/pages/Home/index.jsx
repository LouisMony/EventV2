import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

//COMP
import EventBloc from "./EventBloc";
import SearchBar from "./SearchBar";
import Filters from "./Filters";

//STYLE
import '../../style/StyleHome.scss';
import { motion } from "framer-motion";
import { anim, fadeOpacity } from "../../js/animation";

function Home() {
  
  const eventsSelector = useSelector(state => state.events.data);
  const [sortedEvents, setSortedEvents] = useState(null);

  const handleClickFilter = (filter) => {
    let sortedEventsCopy = [...eventsSelector];

    if (filter === 'Thème') {
      sortedEventsCopy.sort((a, b) => a.category.localeCompare(b.category));
    }
    if (filter === 'Date') {
      sortedEventsCopy.sort((a, b) => new Date(a.date) - new Date(b.date));
    }
    if (filter === 'Reservations') {
      sortedEventsCopy.sort((a, b) => a.reservations - b.reservations);
    }
    console.log(sortedEventsCopy);

    setSortedEvents(sortedEventsCopy);
  }

  const HandleSearch = (value) =>{
    console.log(value);
    const filteredEvents = eventsSelector.filter(item =>
      item.name.toLowerCase().includes(value.toLowerCase())
    );
    setSortedEvents(filteredEvents);
  }

  useEffect(() =>{
    if(eventsSelector)setSortedEvents(eventsSelector)
  },[eventsSelector])

  return (
    <motion.div {...anim(fadeOpacity)} className='home'>
      <div className="home__head">
        <img src="./media/img/logo.svg" alt="Logo Events" />
        <SearchBar onSearch={HandleSearch} />
      </div>

      <Filters onClickFunction={handleClickFilter} />

      <ul className="home__events">
        {sortedEvents ? sortedEvents.map((item, index) => (
          <li key={index}>
            <Link to={'/event/' + item.id}>
              <EventBloc name={item.name} imageLink={item.image_link} category={item.category} date={item.date} places={item.places} reservations={item.reservations} isFull={item.isFull} />
            </Link>
          </li>
        )) :
          <span className="loader"></span>
        }
      </ul>
    </motion.div>
  );
}

export default Home;

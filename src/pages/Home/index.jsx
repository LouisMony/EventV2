import React from "react";
import { Link } from "react-router-dom";

//COMP
import EventBloc from "./EventBloc";
import SearchBar from "./SearchBar";
import Filters from "./Filters";

//STYLE
import '../../style/StyleHome.scss';

function Home(){
    return (
      <div className='home'>
        <div className="home__head">
          <img src="./media/img/logo.svg" alt="Logo Events" />
          <SearchBar />
        </div>
       
        <Filters />

        <ul className="home__events">
          <li>
            <Link>
                <EventBloc />
            </Link>
          </li>
          <li>
            <Link>
              <EventBloc />
            </Link>
          </li>
          <li>
            <Link>
              <EventBloc />
            </Link>
          </li>
          <li>
            <Link>
                <EventBloc />
            </Link>
          </li>
          <li>
            <Link>
              <EventBloc />
            </Link>
          </li>
          <li>
            <Link>
              <EventBloc />
            </Link>
          </li>
          <li>
            <Link>
                <EventBloc />
            </Link>
          </li>
          <li>
            <Link>
              <EventBloc />
            </Link>
          </li>
          <li>
            <Link>
              <EventBloc />
            </Link>
          </li>
        </ul>
      </div>
    );
  }
  
  export default Home;
import React from 'react';
import { Link } from 'react-router-dom';

export default class Component__Navbar extends React.Component {
    constructor(props) {
      super(props);
      this.state = {}
    }

    render() {
      return(
        <div>
          <Link className='Link' to="/">HOME</Link>
          <Link className='Link' to="/contact">CONTACT</Link>
        </div>
      ) ;
    }
  }
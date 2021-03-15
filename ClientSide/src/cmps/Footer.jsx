import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

export default function Footer() {
  const loggedInUser = useSelector((state) => state.user.loggedInUser)





  return (
    <nav>
      {loggedInUser && <div className="nav-container">
        <NavLink to="/profile">
          <img src="https://cdn0.iconfinder.com/data/icons/aami-web-internet/64/simple-01-128.png" alt=""/>
        </NavLink>
        <NavLink to="/schedule">
          
          <img src="https://cdn1.iconfinder.com/data/icons/aami-web-internet/64/aami3-25-512.png" alt=""/>
        </NavLink>
        {/* <NavLink to="/classes">My Classes</NavLink> */}
        {/* <NavLink to="/clubs">My Clubs</NavLink> */}
         <NavLink to="/create">

<img src="https://cdn4.iconfinder.com/data/icons/aami-web-internet/64/aami12-16-512.png" alt=""/>

         </NavLink>
      </div>}
    </nav>
  );
}

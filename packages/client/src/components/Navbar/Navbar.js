import React, { useState } from 'react';
import * as AiIcons from 'react-icons/ai';
import { Link } from 'react-router-dom';
import * as FaIcons from 'react-icons/fa';
import { SidebarData } from './SideMenuData';
import './Navbar.css';
import { useNavigate } from "react-router";
function Navbar (props) {

    const [sidebar, setSidebar] = useState(false);

    const showSidebar = () => setSidebar(!sidebar);
    
    const navigate = useNavigate();

    const Logout = () => {


      fetch("http://localhost:4000/auth/logout", {
        method: "GET",
        credentials: 'include',
        headers: {
          "Content-Type": "application/json",
        }
      }).then(
        navigate("/")
      )
    }

  return (
      <>
      <div className='navbar'>
          <Link to='#' className='menu-bars'>
            <FaIcons.FaBars onClick={showSidebar} />
          </Link>
        </div>
        <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
          <ul className='nav-menu-items' onClick={showSidebar}>
            <li className='navbar-toggle'>
              <Link to='#' className='menu-bars'>
                <AiIcons.AiOutlineClose />
              </Link>
            </li>
            {SidebarData.map((item, index) => {
              return (
                <li key={index} className={item.cName}>
                  <Link to={item.path}>
                    {item.icon}
                    <span>{item.title}</span>
                  </Link>
                </li>
              );
            })}
            <button
          id='Logout-btn'
          onClick={
            () => Logout()
          }
        >
          Logout
        </button>
          </ul>
          
        </nav>
        
      
      </>
    
    
  )
};
export default Navbar;
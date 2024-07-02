import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';


function Navbar2() {
  const [click, setClick] = useState(false);
  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);
  
  return(
         <div className='navbar-container'>
         <div>
         <Link to='/grooovz' className='navbar-logo' onClick={closeMobileMenu}>
           GROOOOVZ
         <i className='fab fa-typo3' />
         </Link>
         </div>
         <div className='menu-icon' onClick={handleClick}>
           <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
         </div>
         <ul className={click ? 'nav-menu active' : 'nav-menu'}>
         <li className="nav-item">
                  <Link to="/grooovz" className="nav-links" onClick={closeMobileMenu}>
                    Home
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/grooovz/playlist" className="nav-links" onClick={closeMobileMenu}>
                    Playlist
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/grooovz/favorites" className="nav-links" onClick={closeMobileMenu}>
                    Favorites
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/grooovz/settings" className="nav-links" onClick={closeMobileMenu}>
                    Settings
                  </Link>
                </li>
         </ul>
     </div>
  )
}

export default Navbar2;




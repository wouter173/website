/* eslint-disable jsx-a11y/anchor-has-content */
import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import Scroller from '../Scroller';
import './styles.scss'

export default function Nav() {
  let [topped, setTopped] = useState(true);
  
  document.addEventListener('scroll', (e) => {
    if (document.scrollingElement!.scrollTop > 50) {
      setTopped(false)
    } else {
      setTopped(true)
    }
  })

	return (
    <nav className={topped ? 'topped' : ''}>
      <div className="items">
        <Link to="/">
          <div className="logo"></div>
        </Link>
        <ul className="links">
          <li>
            <Scroller to="Projects" smooth>
              Projects
            </Scroller>
          </li>
          <li>
            <Scroller to="Contact" smooth>
              Contact
            </Scroller>
          </li>
        </ul>
      </div>
    </nav>
  );
}

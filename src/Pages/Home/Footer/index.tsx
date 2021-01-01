import React from 'react'
import { Link } from 'react-router-dom';

import { faInstagram, faDiscord, faGithubSquare } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';

import './styles.scss'
import Item from './Item';

export default function Footer() {
	return (
    <footer>
      <div className="wave"></div>
      <div className="footer-content">
        <h3>Like what you see?</h3>
        <Link to="/contact">Hit me up</Link>

        <div className="icons">
          <Item icon={faInstagram} href="https://www.instagram.com/wouter_db_/" />
          <Item icon={faDiscord} href="https://discord.gg/NmHAznB" />
          <Item icon={faGithubSquare} href="https://github.com/wouter173" />
          <Item icon={faEnvelope} href="mailto:wouter@debruijn.dev" />
        </div>
      </div>
    </footer>
  );
}

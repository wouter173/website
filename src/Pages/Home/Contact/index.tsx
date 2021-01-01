import React from 'react'
import { Link } from 'react-router-dom';

import { faCommentAlt } from '@fortawesome/free-solid-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';

import Item from './Item';
import './styles.scss'

export default function Contact() {
	return (
    <section id="Contact">
      <div className="content">
        <h3>Contact me</h3>
				<div className="items">
					<Item icon={faCommentAlt} title="Hit me up">
						<Link className="cta" to="/contact" style={{backgroundColor: "#cc452e"}}>Send me a message</Link>
					</Item>
					<Item icon={faEnvelope} title="wouter@debruijn.dev">
						<a className="cta" href="mailto:wouter@debruijn.dev">Send me mail</a>
					</Item>
        </div>
      </div>
    </section>
  );
}

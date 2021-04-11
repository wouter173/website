import { faDiscord, faGithub, faInstagram } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import React from 'react';
import Link from '../../../Shared/Link';
import './styles.scss';

export default function Socials() {
	return (
		<section id="socials">
			<div className="content">
				<h2>My socials.</h2>
				<div className="bubbles">
					<div className="photo bubble"/>
					<div className="photo2 bubble"/>

					<div className="filler bubble"></div>
					<div className="filler2 bubble"></div>

					<Link url="mailto:wouter@debruijn.dev" icon={faEnvelope} className="bubble mail"/>
					<Link url="https://discord.gg/NmHAznB" icon={faDiscord} className="bubble discord"/>
					<Link url="https://github.com/wouter173" icon={faGithub} className="bubble github"/>
					<Link url="https://instagram.com/wouter_db_" icon={faInstagram} className="bubble instagram"/>
				</div>
			</div>
		</section>
	);
}

import React from 'react';
import Link from '../../../Shared/Link';
import './styles.scss';

export default function Footer() {
	return (
		<footer>
			<div className="content">
				<div className="logo"></div>
				<ul>
					<li>Links</li>
					<li><Link url="https://instagram.com/wouter_db_">Instagram</Link></li>
					<li><Link url="https://github.com/wouter173">Github</Link></li>
					<li><Link url="https://discord.gg/NmHAznB">Discord</Link></li>
					<li><Link url="mailto:wouter@debruijn.dev">Mail</Link></li>
				</ul>
				<ul>
					<li>Projects</li>
					<li><Link url="https://stingalleman.dev">stingalleman.dev</Link></li>
				</ul>
			</div>
		</footer>
	);
}

import React from 'react';
import Scroller from '../../../Shared/Scroller';
import './styles.scss';

export default function Nav() {
	return (
		<nav>
			<ul>
				<li>
					<Scroller target="works" underline>
						works
					</Scroller>
				</li>
				<li>
					<Scroller target="socials" underline>
						socials
					</Scroller>
				</li>
				<li>
					<Scroller target="contact" underline>
						contact
					</Scroller>
				</li>
			</ul>
		</nav>
	);
}

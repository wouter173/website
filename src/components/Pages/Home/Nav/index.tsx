import React from 'react';
import Scroller from '../../../Shared/Scroller';
import './styles.scss';

type Props = {
	hidden: boolean;
}

export default function Nav(props: Props) {
	return (
		<nav style={{display: props.hidden? 'none': 'block'}}>
			<ul>
				<li>
					<Scroller target="works" underline>
						works
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

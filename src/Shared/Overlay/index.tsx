import React from 'react'
import { useHistory } from 'react-router-dom';
import Nav from '../Nav';

import './styles.scss';

type props = {
	children?: React.ReactNode;
	nav?: boolean;
}

export default function Overlay(props: props) {
	const history = useHistory();

	return (
		<div id="Overlay">
			{!props.nav &&
				<div className="background" onClick={() => { history.push("/") }}></div>
			}
			<Nav/>
			{props.children}
		</div>
	)
}

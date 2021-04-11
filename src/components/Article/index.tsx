/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react';
import './main.scss';

import {RouteComponentProps} from 'react-router-dom';

type RouteProps = {
	id: string
}

interface Props extends RouteComponentProps<RouteProps> {
	
}

export default function Article(props: Props) {
	return (
		<div id="Article">
			<div className="bg"></div>
			<main></main>
			{/* {props.routeProps.match!.params.id} */}
		</div>
	);
}

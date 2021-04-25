import React, { useEffect } from 'react';

import {RouteComponentProps} from 'react-router-dom';
import Background from './Background';
import Card from './Card';

type RouteProps = {
	id: string
}

type Props = {
	routeProps: RouteComponentProps<RouteProps>
}

export default function Article(props: Props) {

	useEffect(() => {
		const root: HTMLElement = document.getElementById('root')!;

		root.classList.add('noscroll');

		return () => {
			root.classList.remove('noscroll');
		};
	}, []);

	return (
		<div className="Article">
			<Background />
			<Card id={props.routeProps.match!.params.id} />
		</div>
	);
}

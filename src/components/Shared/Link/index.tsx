import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { ReactNode } from 'react';
import {Link as RouterLink, useHistory} from 'react-router-dom';
import './styles.scss';

type Props = {
	url: string;
	className?: string;
	icon?: IconProp;
	children?: ReactNode;
	router?: boolean;
	animate? : () => Promise<void>;
}

const Body = (props: Props) => (
	<>
		{props.icon && <FontAwesomeIcon size={props.children? '1x': '2x'} icon={props.icon} />}
		{props.children && (props.children)}
	</>
);


export default function Link(props: Props) {
	const history = useHistory();

	if (props.animate) return (
		<a className={`${props.className? props.className: ''} link`} onClick={() => {
			props.animate!().then(() => {
				history.push(props.url);
			});
		}}>
			<Body {...props} />
		</a>
	);

	else if (props.router) return (
		<RouterLink to={props.url} className={`${props.className? props.className: ''} link`}>
			<Body {...props} />
		</RouterLink>
	);

	else return (
		<a href={props.url} className={`${props.className? props.className: ''} link`} rel="noreferrer" target="_blank">
			<Body {...props} />
		</a>
	);
}

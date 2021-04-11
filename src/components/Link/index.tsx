import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { ReactNode } from 'react';
import {Link as RouterLink} from 'react-router-dom';
import './styles.scss';

type Props = {
	url: string;
	className?: string;
	icon?: IconProp;
	children?: ReactNode;
	router?: boolean;
}

export default function Link(props: Props) {
	if (props.router) return (
		<RouterLink to={props.url} className={`${props.className? props.className: ''} link`}>
			{props.icon && <FontAwesomeIcon size={props.children? '1x': '2x'}icon={props.icon} />}
			{props.children && (props.children)}
		</RouterLink>
	);

	return (
		<a href={props.url} className={`${props.className? props.className: ''} link`} rel="noreferrer" target="_blank">
			{props.icon && <FontAwesomeIcon size={props.children? '1x': '2x'}icon={props.icon} />}
			{props.children && (props.children)}
		</a>
	);
}

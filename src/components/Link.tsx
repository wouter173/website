import React, { ReactNode } from 'react';
import { useHistory } from 'react-router-dom';

type Props = {
	url: string;
	label?: string;
	local?: boolean;
	className?: string;
	children?: ReactNode;
	onClick?: () => void;
};

const Link = (props: Props) => {
	const history = useHistory();
	const className = `${props.className} flex items-center text-sm cursor-pointer sm:text-base`;
	const onClick = props.onClick ?? (() => history.push(props.url));

	if (props.url == '') return null;

	if (props.local) {
		return (
			<a onClick={onClick} className={className}>
				{props.children}
				{props.label ? <span>{props.label}</span> : <></>}
			</a>
		);
	} else {
		return (
			<a href={props.url} rel="noreferrer" target="_blank" className={className}>
				{props.children}
				{props.label ? <span>{props.label}</span> : <></>}
			</a>
		);
	}
};

export default Link;

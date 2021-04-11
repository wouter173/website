import React from 'react';
import './styles.scss';

export type TagProps = {
	name: string;
	color: string;
	url?: string;
}

export default function Tag(props: TagProps) {
	return (
		<li className="tag">
			<a href={props.url} rel="noreferrer" target="_blank">
				<span style={{'color': props.color}}>●</span>
				{props.name}
			</a>
		</li>
	);
}

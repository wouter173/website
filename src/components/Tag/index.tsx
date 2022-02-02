import React from 'react';
import { TagType } from 'types';
import './styles.scss';


export default function Tag(props: TagType) {
	return (
		<li className="tag">
			<a href={props.url} rel="noreferrer" target="_blank">
				<span style={{'color': props.color}}>●</span>
				{props.label}
			</a>
		</li>
	);
}

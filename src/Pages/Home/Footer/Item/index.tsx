import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

type props = {
	icon: IconProp;
	href: string;
}

export default function Item(props: props) {
	return (
		<a href={props.href} target="blank" rel="noopener noreferrer">
			<FontAwesomeIcon icon={props.icon} size="2x" />
		</a>
  );
}

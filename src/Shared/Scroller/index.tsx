/* eslint-disable no-restricted-globals */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { ReactNode } from 'react';
import './styles.scss';

interface props {
	children: ReactNode;
	to: string;
	smooth: boolean;
}

export default function Scroller(props: props) {
	const scrollTo = () => {
		let offsetTop = document.getElementById(props.to)!.offsetTop;

		scroll({
			top: offsetTop,
			behavior: props.smooth ? "smooth" : "auto",
		});
	}

	return (
		<a onClick={() => scrollTo()} className="Scroller">
			{ props.children }
		</a>
	)
}

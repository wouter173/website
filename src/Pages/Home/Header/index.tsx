import React from 'react'
import Canvas from '../Canvas';

import "./styles.scss";

export default function Header() {
	return (
		<header>
			<Canvas></Canvas>
			<div className="hero content">
				<h1>Hi I'm Wouter&#8230;</h1>
				<h2>&#8230;your creative web designer & developer.</h2>
			</div>
			<div className="wave"></div>
		</header>
  );
}

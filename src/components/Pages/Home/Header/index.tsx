import React from 'react';
import './styles.scss';

export default function Header() {
	const clickHandler = () => {
		window.scrollTo({
			top: document.getElementById('works')!.offsetTop + 1,
			behavior: 'smooth',
		});
	};

	return (
		<header>
			<div className="background">
				<div id="bg-elem1" />
				<div id="bg-elem2" />
				<div id="bg-elem3" />
			</div>
			<div className="content">
				<div className="heading">
					<h1>Hi, I&apos;m Wouter</h1>
					<h4>your creative web developer.</h4>
					<button onClick={clickHandler}>Check out my projects!</button>
				</div>
			</div>
		</header>
	);
}

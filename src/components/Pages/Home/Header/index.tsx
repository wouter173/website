import React, { useContext, useEffect, useState } from 'react';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Scroller from '../../../Shared/Scroller';
import './styles.scss';

import earthish from './planets/earthish.png';
import dark from './planets/dark.png';
import ice from './planets/ice.png';
import MediaContext from '../../../Shared/Context/MediaContext';

export default function Header() {

	const TOTAL = 50;
	const [pos, setPos] = useState<{x: number, y: number}>({x:0,y:0});
	const media = useContext(MediaContext);

	useEffect(() => {
		document.addEventListener('mousemove', mouse => {
			setPos({
				x: (TOTAL - (mouse.clientX - window.innerWidth/2) * 0.01), 
				y: (TOTAL - (mouse.clientY - window.innerHeight/2) * 0.01)
			});
		});
	}, []);

	return (
		<header>
			<div className="background">
				<img src={dark} alt="" style={media.isDesktop? {left: 40 - pos.x/3 +'px', top: 40 - pos.y/3 +'px'}: {left: '10px', top: '30px', width: '140px'}}/>
				<img src={ice} alt="" style={media.isDesktop?{right: 200 + pos.x/6 + 'px', top: 100 - pos.y/6 + 'px', width: '300px'}: {right: '0px', top: '70px', width: '200px'}}/> {/*: {right: '-210px', bottom: '-100px', width: '800px'}}/>*/}
				<img src={earthish} alt="" style={ media.isDesktop? {right: -80 + pos.x + 'px', bottom: -20 + pos.y + 'px', width: '1000px'}: {right: '-210px', bottom: '-100px', width: '800px'}}/>
			</div>

			<div className="heading">
				<h1>Hi, I&apos;m Wouter&#8230;</h1>
				<h4>&#8230;your creative web developer.</h4>
			</div>

			<Scroller target="works">
				<FontAwesomeIcon icon={faChevronDown} className="icon" />
			</Scroller>
		</header>
	);
}

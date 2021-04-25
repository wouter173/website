import React, { useContext } from 'react';
import { ResizeObserver } from '@juggle/resize-observer';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Canvas } from 'react-three-fiber';
import Scroller from '../../../Shared/Scroller';
import Planet from './Planet';
import Cam from './Cam';
import './styles.scss';
import { Color } from 'three';
import MediaContext from '../../../Shared/Context/MediaContext';
import PlanetsContext from '../../../Shared/Context/PlanetsContext';

export default function Header() {
	const media = useContext(MediaContext);
	const planets = useContext(PlanetsContext);

	return (
		<header>
			<Canvas className="background" concurrent resize={{polyfill: ResizeObserver}}>
				<Cam />
				<ambientLight color={0x00C4e7} intensity={0.2} castShadow/>
				<spotLight position={[0, 0, 100]} color={0xf5d88c} castShadow/>

				<Planet position={media.isDesktop? [3, -1, 1]: [0, -1.2, 4]} rotation={[90, 16, 120]} mesh={planets[0]} />

				{ media.isDesktop && <Planet
					mesh={planets[1]}
					position={[-6, -2, -4]}
					sealevel={0.973} 
					seaProps={{color: 0xb8751f, emissive: new Color(0xff8400)}} 
					ozonProps={{color: 0xb8751f }} 
				/>}
			</Canvas>

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

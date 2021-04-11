import React from 'react';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Canvas } from 'react-three-fiber';
import Scroller from '../Scroller';
import Planet from './Planet';
import Cam from './Cam';
import './styles.scss';
import { Color } from 'three';

export default function Header() {
	return (
		<header>
			<Canvas className="background" concurrent>
				<Cam />
				<ambientLight color={0x00C4e7} intensity={0.2} castShadow/>
				<spotLight position={[0, 0, 100]} color={0xf5d88c} castShadow/>

				<Planet position={[3, -1, 1]} url="/assets/bruh2.glb" />
				<Planet 
					position={[-6, -2, -4]} 
					sealevel={0.973} 
					seaProps={{color: 0xb8751f, emissive: new Color(0xff8400)}} 
					ozonProps={{color: 0xb8751f }} 
					url="/assets/lava.glb"
				/>
			</Canvas>

			<div className="heading">
				<h1>Hi, I&apos;m Wouter&#8230;</h1>
				<h4>&#8230;your creative developer.</h4>
			</div>

			<Scroller target="works">
				<FontAwesomeIcon icon={faChevronDown} className="icon" />
			</Scroller>
		</header>
	);
}

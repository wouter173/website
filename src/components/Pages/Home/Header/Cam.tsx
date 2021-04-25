import React, { useEffect, useRef } from 'react';
import { useThree, useFrame } from 'react-three-fiber';
import { PerspectiveCamera } from 'three';

export default function Cam() {
	const { setDefaultCamera } = useThree();
	const ref = useRef<PerspectiveCamera | null>(null);

	let offset: {x: number, y: number} = {x: 0, y: 0};
	const multiplier = 100;
	
	window.addEventListener('mousemove', ({clientX, clientY}) => {
		// a bit shit but works
		offset = {x: (clientX - window.innerWidth / 2) / ( window.innerWidth * multiplier) , y: (clientY - window.innerHeight / 2) / (window.innerHeight * multiplier)};
	});

	useEffect(() => {
		setDefaultCamera(ref.current!);
	}, [ref]);

	useFrame(() => {
		ref.current!.rotation.set(offset.y, offset.x, offset.x);
		ref.current!.updateMatrixWorld();
	});

	return (
		<perspectiveCamera rotation={[0, 0, 0]} position={[0,0,6]} ref={ref} far={10000} fov={50}/>
	);
}

import React, { useContext, useEffect, useRef } from 'react';
import { MeshStandardMaterialProps, Vector3 } from 'react-three-fiber';
import { Mesh } from 'three';
import { GLTF } from 'three/examples/jsm/loaders/GLTFLoader';
import MediaContext from '../../../Shared/Context/MediaContext';

type Props = {
	mesh: GLTF;
	scale?: Vector3;
	position?: Vector3;
	rotation?: number[];
	sealevel?: number;
	seaProps?: MeshStandardMaterialProps;
	ozonlevel?: number;
	ozonProps?: MeshStandardMaterialProps;
}

export default function Planet(props: Props) {
	const sea = useRef<Mesh>();
	const media = useContext(MediaContext);
	const root: HTMLDivElement = document.querySelector('#root')!;
	

	useEffect(() => {
		if (media.isMobile) root.addEventListener('scroll', scrollHandler);
		tick();

		return () => {
			if (media.isMobile) root.removeEventListener('scroll', scrollHandler);
		};
	}, [props.mesh]);

	const scrollHandler = () => {
		props.mesh && sea.current && (props.mesh.scene.rotation.x += Math.min(root.scrollTop / 5000, 0.1));
	};

	const tick = () => {
		props.mesh && sea.current && (props.mesh.scene.rotation.y += 0.002);
		props.mesh && sea.current && (props.mesh.scene.rotation.x += 0.001);
		props.mesh && sea.current && (sea.current.rotation.y += 0.002);
		props.mesh && sea.current && (sea.current.rotation.x += 0.001);

		requestAnimationFrame(tick);
	};


	return props.mesh? <>
		<primitive position={props.position || [0, 0, 0]} rotation={props.rotation || [0, 0, 0]} object={props.mesh.scene} scale={props.scale}/>
		{props.sealevel !== 0 && 
			<mesh position={props.position || [0, 0, 0]} ref={sea} scale={props.scale}>
				<sphereBufferGeometry args={[props.sealevel || 0.984, 20, 20]}/>
				<meshStandardMaterial color={props.seaProps?.color || 0x00C4E7} opacity={0.9} transparent {...props.seaProps}/>
			</mesh>
		}

		{props.ozonlevel !== 0 && 
			<mesh position={props.position || [0, 0, 0]} scale={props.scale}>
				<sphereBufferGeometry args={[props.ozonlevel || 1.4, 20, 20]}/>
				<meshStandardMaterial color={props.ozonProps?.color || 0x00C4E7} opacity={0.1} transparent {...props.ozonProps}/>
			</mesh>
		}
	</> : null;
}

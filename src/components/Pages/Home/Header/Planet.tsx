import React, { useEffect, useMemo, useRef, useState } from 'react';
import { MeshStandardMaterialProps, Vector3 } from 'react-three-fiber';
import { Mesh } from 'three';
import { GLTF, GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

type Props = {
	url: string;
	scale?: Vector3;
	position?: Vector3;
	sealevel?: number;
	seaProps?: MeshStandardMaterialProps;
	ozonlevel?: number;
	ozonProps?: MeshStandardMaterialProps;
}

export default function Planet(props: Props) {
	const sea = useRef<Mesh>();
	const [mesh, setMesh] = useState<GLTF>();

	console.log('bruh');

	useMemo(() => new GLTFLoader().load(props.url, (mesh) => {
		mesh.scene.traverse((node: any) => {
			if (node.isMesh) node.castShadow = true;
			if (node.isMesh) node.recieveShadow = true;
		});
		setMesh(mesh);
	}), [props.url]);
	

	useEffect(() => {
		if (mesh && sea.current && props.sealevel !== 0) {
			tickWithSea();
		}

		if (mesh && props.sealevel == 0) {
			tickWithoutSea();
		}
	}, [mesh, sea]);

	const tickWithSea = () => {
		mesh!.scene.rotation.y += 0.002;
		mesh!.scene.rotation.x += 0.001;
		sea.current!.rotation.y += 0.002;
		sea.current!.rotation.x += 0.001;

		requestAnimationFrame(tickWithSea);
	};

	const tickWithoutSea = () => {
		mesh!.scene.rotation.y += 0.002;
		mesh!.scene.rotation.x += 0.001;

		requestAnimationFrame(tickWithoutSea);
	};


	return mesh? <>
		<primitive position={props.position || [0, 0, 0]} object={mesh.scene} scale={props.scale}/>
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

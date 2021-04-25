import React, { createContext, useEffect, useState } from 'react';
import { GLTF, GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

const PlanetsContext = createContext<GLTF[]>([]);

export default PlanetsContext;

type Props = {
	children: React.ReactNode;
}

//THIS IS THE WORST
//NEVER EVER DO THIS EVER AGAIN
//PLS DONT
//NO ONE SHOULD EVER DO THIS
export function PlanetsContextProvider(props: Props) {
	const [planets, setPlanets] = useState<GLTF[]>([]);

	useEffect(() => {
		load('/assets/bruh2.glb', [])
			.then(a => load('/assets/lava.glb', a))
			.then(b => setPlanets(b));
	}, []);

	const load = (url: string, group: GLTF[]): Promise<GLTF[]> => {
		return new Promise((res) => {
			new GLTFLoader().load(url, (mesh) => {
				mesh.scene.traverse((node: any) => {
					if (node.isMesh) node.castShadow = true;
					if (node.isMesh) node.recieveShadow = true;
				});
				res([...group, mesh]);
			});
		});
	};

	return (
		<PlanetsContext.Provider value={planets}>
			{props.children}
		</PlanetsContext.Provider>
	);
}

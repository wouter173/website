import React, { createContext, useEffect, useState } from 'react';
import { project } from '../types';

const ProjectsContext = createContext<project[]>([]);

export default ProjectsContext;

type Props = {
	children: React.ReactNode;
}

export function ProjectsContextProvider(props: Props) {

	const [projects, setProjcects] = useState<project[]>([]);

	useEffect(() => {
		fetch('https://projects.wouter.cloud/')
			.then(data => data.json())
			.then(json => setProjcects(json));
		
	}, []);

	return (
		<ProjectsContext.Provider value={projects}>
			{props.children}
		</ProjectsContext.Provider>
	);
}

import React from 'react';
import { MediaContextProvider } from './MediaContext';
import { PlanetsContextProvider } from './PlanetsContext';
import { ProjectsContextProvider } from './ProjectsContext';

type Props = {
	children: React.ReactNode;
}

export default function index(props: Props) {
	return (
		<MediaContextProvider>
			<ProjectsContextProvider>	
				<PlanetsContextProvider>
					{props.children}
				</PlanetsContextProvider>
			</ProjectsContextProvider>
		</MediaContextProvider>
	);
}

import React from 'react';
import { MediaContextProvider } from './MediaContext';
import { ProjectsContextProvider } from './ProjectsContext';

type Props = {
	children: React.ReactNode;
}

export default function index(props: Props) {
	return (
		<MediaContextProvider>
			<ProjectsContextProvider>	
				{props.children}
			</ProjectsContextProvider>
		</MediaContextProvider>
	);
}

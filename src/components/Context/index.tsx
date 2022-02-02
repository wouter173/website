import React from 'react';
import { MediaContextProvider } from './MediaContext';

type Props = {
	children: React.ReactNode;
}

export default function index(props: Props) {
	return (
		<MediaContextProvider>
			{props.children}
		</MediaContextProvider>
	);
}

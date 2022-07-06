import React, { createContext } from 'react';
import { useMedia } from 'react-use';

type MediaType = {
	isDesktop: boolean;
	isLaptop: boolean;
	isMobile: boolean;
}

const MediaContext = createContext<MediaType>({isDesktop: false, isLaptop: false, isMobile: true});

export default MediaContext;

type Props = {
	children: React.ReactNode
}

export function MediaContextProvider(props: Props) {

	const isMobile = useMedia('(max-width: 1224px)');
	const isLaptop = useMedia('(min-width: 1224px) and (max-width: 3600px)');
	const isDesktop = useMedia('(min-width: 3600px)');

	return (
		<MediaContext.Provider value={{isDesktop, isLaptop, isMobile}}>
			{props.children}
		</MediaContext.Provider>
	);
}

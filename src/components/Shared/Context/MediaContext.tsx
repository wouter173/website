import React, { createContext } from 'react';
import { useMediaQuery } from 'react-responsive';

type MediaType = {
	isDesktop: boolean;
	isMobile: boolean;
}

const MediaContext = createContext<MediaType>({isDesktop: false, isMobile: true});

export default MediaContext;

type Props = {
	children: React.ReactNode
}

export function MediaContextProvider(props: Props) {

	const isMobile = useMediaQuery({query: '(max-width: 1224px)'});

	return (
		<MediaContext.Provider value={{isMobile, isDesktop: !isMobile}}>
			{props.children}
		</MediaContext.Provider>
	);
}

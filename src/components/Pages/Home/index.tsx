import React, { useContext } from 'react';

import Nav from './Nav';
import Header from './Header';
import Bubble from './Sunrise';
import Works from './Works';
import Socials from './Socials';
import Contact from './Contact';
import Footer from './Footer';

import MediaContext from '../../Shared/Context/MediaContext';

export default function Home() {
	const media = useContext(MediaContext);

	return (
		<>
			<Nav hidden={media.isMobile}/>
			<Header />
			<Bubble />
			<Works />
			<Socials />
			<Contact />
			<Footer />
		</>
	);
}

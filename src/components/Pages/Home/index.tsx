import React from 'react';

import Nav from './Nav';
import Header from './Header';
import Bubble from './Sunrise';
import Works from './Works';
import Socials from './Socials';
import Contact from './Contact';
import Footer from './Footer';

export default function Home() {
	return (
		<>
			<Nav />
			<Header />
			<Bubble />
			<Works />
			<Socials />
			<Contact />
			<Footer />
		</>
	);
}

import React, { useEffect, useRef } from 'react';

import Nav from './Nav';
import Header from './Header';
import Works from './Works';
import Contact from './Contact';
import Footer from './Footer';
import { useHash } from 'react-use';

export default function Home() {
	const pageRef = useRef<HTMLDivElement>(null);
	const [hash] = useHash();
	console.log(hash);

	useEffect(() => {
		if (hash) {
			const id = hash.split('#')[1];
			const el = document.getElementById(id);
			pageRef.current!.scrollTo({ top: el?.offsetTop, behavior: 'smooth' });
		}
	}, []);

	return (
		<main className="max-h-screen overflow-auto" ref={pageRef}>
			<Nav pageRef={pageRef} />
			<Header pageRef={pageRef} />
			<Works />
			<Contact />
			<Footer />
		</main>
	);
}

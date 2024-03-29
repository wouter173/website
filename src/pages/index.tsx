import Contact from 'components/Home/Contact';
import Footer from 'components/Home/Footer';
import Header from 'components/Home/Header';
import Nav from 'components/Home/Nav';
import Portfolio from 'components/Home/Portfolio';
import { fetchProjects } from 'lib/state/fetchProjects';
import { useStore } from 'lib/state/StateProvider';
import { StoreDataType } from 'misc/types';
import type { GetStaticProps, NextPage } from 'next';
import Head from 'next/head';
import { useRef } from 'react';
import { useMedia } from 'react-use';

const Home: NextPage = () => {
	const pageRef = useRef<HTMLDivElement>(null);
	const { projects } = useStore<StoreDataType>();
	const sortedProjects = projects.sort((a) => (a.slug.startsWith('hidden-') ? 1 : -1));

	const isLaptop = useMedia('(min-width: 1024px)');
	const headerProjects = isLaptop ? 2 : 1;

	return (
		<>
			<Head>
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<meta name="theme-color" content="#010101" />
				<meta name="description" content="Wouter de Bruijn. Creative web developer" />

				<meta property="og:title" content="Wouter de Bruijn" />
				<meta property="og:description" content="Wouter de Bruijn. Creative web developer" />
				<meta property="og:image" content="/favicon.png" />
				<meta property="og:type" content="website" />
				<meta property="og:url" content="https://wouterdb.nl" />

				<title>Wouter de Bruijn</title>
			</Head>
			<main className="max-h-screen overflow-auto bg-bermuda" ref={pageRef}>
				<Nav pageRef={pageRef} />
				<Header />
				<Portfolio projects={sortedProjects} />
				<Contact />
				<Footer />
			</main>
		</>
	);
};

export const getStaticProps: GetStaticProps = async () => {
	const projects = await fetchProjects();

	return {
		props: {
			state: {
				projects,
			},
		},
	};
};

export default Home;

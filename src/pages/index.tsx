import { useRef } from 'react';
import type { GetStaticProps, NextPage } from 'next';
import Head from 'next/head';
import { client } from 'lib/gql/client';
import { projectsQuery } from 'lib/gql/queries';
import { ProjectType, StoreDataType } from 'misc/types';

import Footer from 'components/Home/Footer';
import Header from 'components/Home/Header';
import Nav from 'components/Home/Nav';
import Works from 'components/Home/Works';
import Contact from 'components/Home/Contact';

const Home: NextPage = () => {
	const pageRef = useRef<HTMLDivElement>(null);

	return (
		<>
			<Head>
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<meta name="theme-color" content="#010101" />
				<meta name="description" content="Wouter de Bruijn, Your creative web developer. portfolio" />

				<meta property="og:title" content="Wouter de Bruijn" />
				<meta property="og:description" content="Your creative web developer. Portfolio. Based in the Netherlands" />
				<meta property="og:image" content="/favicon.png" />
				<meta property="og:type" content="website" />
				<meta property="og:url" content="https://wouterdb.nl" />

				<title>Wouter de Bruijn</title>
			</Head>
			<main className="max-h-screen overflow-auto" ref={pageRef}>
				<Nav pageRef={pageRef} />
				<Header pageRef={pageRef} />
				<Works />
				<Contact />
				<Footer />
			</main>
		</>
	);
};

export const getStaticProps: GetStaticProps = async () => {
	const { data, error } = await client.query(projectsQuery).toPromise();
	if (error) console.error(error);

	return {
		props: {
			state: data as StoreDataType,
		},
	};
};

export default Home;

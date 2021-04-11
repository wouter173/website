import React from 'react';
import {BrowserRouter, Redirect, Route, Switch} from 'react-router-dom';

import Socials from '../Socials';
import Bubble from '../Sunrise';
import Contact from '../Contact';
import Footer from '../Footer';
import Header from '../Header';
import Nav from '../Nav';
import Works from '../Works';
import Article from '../Article';


const Home = () => (
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

export default function App() {
	return (
		<BrowserRouter>
			<Switch>
				<Route path="/project/:id" render={Article} />

				<Route exact path="/">
					<Home />
				</ Route>

				<Route path="/">
					<Redirect to="/" />
				</Route>
			</ Switch>
		</ BrowserRouter>
	);
}

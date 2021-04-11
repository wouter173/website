import React from 'react';
import {BrowserRouter, Redirect, Route, Switch} from 'react-router-dom';

import Home from '../Pages/Home';
import Article from '../Pages/Article';

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

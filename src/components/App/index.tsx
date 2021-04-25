import React from 'react';
import {BrowserRouter, Redirect, Route, Switch} from 'react-router-dom';

import Home from '../Pages/Home';
import Article from '../Pages/Article';
import ContextProvider from '../Shared/Context/';

export default function App() {
	return (
		<ContextProvider>
			<BrowserRouter>
				<Switch>
					<Route path="/project/:id" render={routeProps => (
						<>
							<Article routeProps={routeProps} />
							<Home />
						</>
					)} /> 

					<Route exact path="/">
						<Home />
					</ Route>

					<Route path="/">
						<Redirect to="/" />
					</Route>
				</ Switch>
			</ BrowserRouter>
		</ContextProvider>
	);
}

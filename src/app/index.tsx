import React from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import { Provider as UrqlProvider } from 'urql';
import { Provider as ReduxProvider } from 'react-redux';

import Home from 'pages/Home';
import Article from 'pages/Article';

import ContextProvider from 'components/Context';
import { client } from './graphql';
import { store } from './store';
import { fetchProjects } from './slices/projects';

store.dispatch(fetchProjects());

export default function App() {
	return (
		<ContextProvider>
			<ReduxProvider store={store}>
				<UrqlProvider value={client}>
					<BrowserRouter>
						<Switch>
							<Route path="/project/:slug" render={rp => <Article routeProps={rp} />} /> 
							<Route exact path="/" component={Home} />
							<Route path="/"> <Redirect to="/" /> </Route>
						</ Switch>
					</ BrowserRouter>
				</UrqlProvider>
			</ReduxProvider>
		</ContextProvider>
	);
}

import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import smoothscroll from 'smoothscroll-polyfill';
import './root.scss';

smoothscroll.polyfill();

ReactDOM.render(
	<React.StrictMode>
		<App />
	</React.StrictMode>,
	document.getElementById('root')
);

import React from 'react';
import ReactDOM from 'react-dom';
import App from './app';
import smoothscroll from 'smoothscroll-polyfill';
import './root.css';

smoothscroll.polyfill();

ReactDOM.render(
	<React.StrictMode>
		<App />
	</React.StrictMode>,
	document.getElementById('root')
);

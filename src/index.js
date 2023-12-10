import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './styles/override.css';
import App from './App';
import { Auth0Provider } from './react-auth0-spa';
import config from './auth_config.json';
import history from './utils/history';

const onRedirectCallback = (appState) => {
	history.push(appState && appState.targetUrl ? appState.targetUrl : window.location.pathname);
};

// the use of ReactDOM.render is fine for React 17
// eslint-disable-next-line react/no-deprecated
ReactDOM.render(
	<Auth0Provider domain={config.domain} client_id={config.clientId} redirect_uri={window.location.origin} onRedirectCallback={onRedirectCallback}>
		<App />
	</Auth0Provider>,
	document.getElementById('root')
);

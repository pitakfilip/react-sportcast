import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useLocation } from 'react-router-dom';
import { useAuth0 } from '../react-auth0-spa';
import Header from './header/Header';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
	root: {
		display: 'flex',
		justifyContent: 'center',
		background: theme.palette.background.default,
		...theme.typography.body1,
	},
	content: {
		display: 'block',
		height: '95vh',
		width: '100vw',
		margin: '2.5vh 0',
		overflow: 'auto',
	},
}));

const PrivateRoute = ({ component: Component, ...rest }) => {
	const classes = useStyles();
	const { isAuthenticated, loginWithRedirect } = useAuth0();
	const location = useLocation();

	useEffect(() => {
		const fn = async () => {
			if (!isAuthenticated) {
				await loginWithRedirect({
					appState: { targetUrl: location.pathname },
				});
			}
		};
		fn();
	}, [isAuthenticated, loginWithRedirect, location]);

	if (!isAuthenticated) {
		return null;
	}
	return (
		<div className={classes.root}>
			<div className={classes.content}>
				<Header />
				<Component {...rest} />
			</div>
		</div>
	);
};

PrivateRoute.propTypes = {
	component: PropTypes.oneOfType([PropTypes.element, PropTypes.func]).isRequired,
};

export default PrivateRoute;

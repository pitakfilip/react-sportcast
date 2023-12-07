import React, {useEffect} from 'react';
import {makeStyles} from '@mui/styles';
import {useLocation, useNavigate} from 'react-router-dom';

const useStyles = makeStyles((theme) => {
	return {
		root: {
			display: 'block',
			background: 'pink',
		},
	};
});

const ResultPage = () => {
	const location = useLocation();
	const navigate = useNavigate();
	const {searchValues} = location.state || {};

	useEffect(() => {
		if (!location.state || !location.state.searchValues) {
			// Redirect to '/search' if props are missing
			navigate('/search');
		}
	}, [location.state]);

	const classes = useStyles();
	return (
		<div className={classes.root}>
			<p>RESULT PAGE</p>
			<code>{JSON.stringify(searchValues)}</code>
		</div>
	);
};

export default ResultPage;

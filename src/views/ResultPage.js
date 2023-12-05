import React from 'react';
import {makeStyles} from '@mui/styles';

const useStyles = makeStyles((theme) => {
	return {
		root: {
			display: 'block',
			background: 'pink'
		}
	};
});

const ResultPage = () => {
	const classes = useStyles();
	return (
		<div className={classes.root}>

			<p>RESULT PAGE</p>

		</div>
	);
};

export default ResultPage;

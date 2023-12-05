import React from 'react';
import {makeStyles} from '@mui/styles';

const useStyles = makeStyles((theme) => {
	return {
		root: {
			display: 'flex',
			flexDirection: 'column',
			alignItems: 'center',
			gap: '1em',
			textAlign: 'justify'
		},
		section: {
			display: 'inline-flex',
			gap: '1em',
			alignItems: 'center'
		}
	};
});

const SearchSlide = () => {
	const classes = useStyles();

	return (
		<div className={classes.root}>
			<section className={classes.section}>
				{/* TODO */}
			</section>
		</div>
	);
};
export default SearchSlide;

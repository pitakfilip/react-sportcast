import React from 'react';
import { makeStyles } from '@mui/styles';
import TranslucentBox from '../components/TranslucentBox';
import SearchForm from '../components/SearchForm';

const useStyles = makeStyles((theme) => {
	return {
		root: {
			background: 'pink',
			display: 'flex',
			justifyContent: 'center',
		},
		content: {
			width: '80%',
			padding: '3em',
		},
	};
});

const SearchPage = () => {
	const classes = useStyles();
	return (
		<div className={classes.root}>
			<section className={classes.content}>
				<TranslucentBox component={SearchForm} />
			</section>
		</div>
	);
};

export default SearchPage;

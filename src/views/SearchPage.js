import React from 'react';
import { makeStyles } from '@mui/styles';
import TranslucentBox from '../components/TranslucentBox';
import SearchForm from '../components/SearchForm';
import background from '../assets/portugal_cycling.png';

const useStyles = makeStyles((theme) => {
	return {
		root: {
			display: 'flex', 
			justifyContent: 'center',
			backgroundImage: `url(${background})`,
			backgroundSize: 'cover',
			backgroundRepeat: 'no-repeat',
			backgroundPosition: 'center center',
			padding: '3em 0'
		}, content: {
			width: '80%', padding: '3em',
		}
	};
});


const SearchPage = () => {
	const classes = useStyles();
	return (<div className={classes.root}>
		<section className={classes.content}>
			<TranslucentBox component={SearchForm} simplified={false}/>
		</section>
	</div>);
};

export default SearchPage;

import React, {useEffect} from 'react';
import {makeStyles} from '@mui/styles';
import {useLocation, useNavigate} from 'react-router-dom';
import Forecast from '../components/forecast/Forecast';
import TranslucentBox from '../components/TranslucentBox';
import SearchForm from '../components/SearchForm';


const useStyles = makeStyles((theme) => {
	return {
		root: {
			display: 'block',
			marginTop: '1em'
		},
		wrapper: {
			display: 'flex',
			justifyContent: 'center',
			alignItems: 'center',
			flexDirection: 'column'
		},
		search: {
			width: '75%'
		},
		forecast: {
			display: 'block',
			width: '75%'
		},
	};
});

const dailyData = [
	{
		date: new Date(2022, 11, 11),
		day: 'monday',
		temperature: 21,
		precipitation: 3,
		wind: 7,
		rating: 3
	},
	{
		date: new Date(2022, 11, 12),
		day: 'tuesday',
		temperature: 21,
		precipitation: 3,
		wind: 17,
		rating: 4
	},
	{
		date: new Date(2022, 11, 13),
		day: 'wednesday',
		temperature: 21,
		precipitation: 3,
		wind: 27,
		rating: 1
	},
	{
		date: new Date(2022, 11, 14),
		day: 'thursday',
		temperature: 21,
		precipitation: 3,
		wind: 7,
		rating: 2
	},
	{
		date: new Date(2022, 11, 15),
		day: 'friday',
		temperature: 21,
		precipitation: 3,
		wind: 87,
		rating: 3
	},
	{
		date: new Date(2022, 11, 16),
		day: 'saturday',
		temperature: 21,
		precipitation: 3,
		wind: 7,
		rating: 3
	},
	{
		date: new Date(2022, 11, 17),
		day: 'sunday',
		temperature: 21,
		precipitation: 3,
		wind: 7,
		rating: 3
	},
	{
		date: new Date(2022, 11, 18),
		day: 'monday',
		temperature: 21,
		precipitation: 3,
		wind: 7,
		rating: 3
	},
	{
		date: new Date(2022, 11, 19),
		day: 'tuesday',
		temperature: 21,
		precipitation: 3,
		wind: 7,
		rating: 3
	},
	{
		date: new Date(2022, 11, 20),
		day: 'wednesday',
		temperature: 21,
		precipitation: 3,
		wind: 7,
		rating: 3
	},
]


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
			{/*<code>{JSON.stringify(searchValues)}</code>*/}

			<div className={classes.wrapper}>
				<div className={classes.search}>
					<TranslucentBox component={SearchForm} simplified={true}/>
				</div>
				
				<div className={classes.forecast}>
					<Forecast data={dailyData}/>
				</div>
			</div>
		</div>
	);
};

export default ResultPage;

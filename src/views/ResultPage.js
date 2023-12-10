import React, { useEffect, useState } from 'react';
import { makeStyles } from '@mui/styles';
import { useLocation, useNavigate } from 'react-router-dom';
import Forecast from '../components/forecast/Forecast';
import TranslucentBox from '../components/TranslucentBox';
import SearchForm from '../components/SearchForm';
import { useDispatch, useSelector } from 'react-redux';
import { useSportData } from '../utils/apiUtils';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import LineGraph from '../components/graphs/LineGraph';
import BarGraph from '../components/graphs/BarGraph';
import { translate } from '../services/LanguageService';

const useStyles = makeStyles((theme) => {
	return {
		root: {
			display: 'block',
			marginTop: '1em',
		},
		wrapper: {
			display: 'flex',
			justifyContent: 'center',
			alignItems: 'center',
			flexDirection: 'column',
		},
		search: {
			width: '75%',
		},
		forecast: {
			display: 'block',
			width: '75%',
		},
		graphs: {
			display: 'block',
			width: '75%',
		},
	};
});

const dataFetched = (data) => ({
	type: 'DATA_FETCHED',
	payload: data,
});

const ResultPage = () => {

	const location = useLocation();
	const navigate = useNavigate();
	const { searchValues } = location.state || {};

	useEffect(() => {
		if (!location.state || !location.state.searchValues) {
			// Redirect to '/search' if props are missing
			navigate('/search');
		}
	}, [location.state]);

	const classes = useStyles();

	const dispatch = useDispatch();
	const data = useSelector(({ exampleReducer }) => exampleReducer.data);
	const { fetchDataAndProcess } = useSportData(searchValues);

	useEffect(() => {
		const fetchData = async () => {
			const result = await fetchDataAndProcess();
			dispatch(dataFetched(result));
		};

		fetchData();
	}, []);

	const [activeTab, setActiveTab] = useState(0);

	const handleTabChange = (e, newValue) => {
		setActiveTab(newValue);
	};

	return (
		<div className={classes.root}>

			<div className={classes.wrapper}>
				<div className={classes.search}>
					<TranslucentBox component={SearchForm} simplified={true} />
				</div>

				{data && (
					<div className={classes.forecast}>
						<Forecast data={data} />
					</div>
				)}

				{data && (
					<div className={classes.graphs}>
						<h2>10 day forecast</h2>
						<Tabs value={activeTab} onChange={handleTabChange}>
							<Tab label={translate('temperature')} />
							<Tab label={translate('precipitation')} />
							<Tab label={translate('windSpeed')} />
						</Tabs>

						{activeTab === 0 && <LineGraph data={data} weatherProperty="temperature" label={translate('temperature') + ' °C'} color="#FF8513" />}
						{activeTab === 1 && <BarGraph data={data} weatherProperty="precipitation" label={translate('precipitation') + ' mm'} />}
						{activeTab === 2 && <LineGraph data={data} weatherProperty="wind" label={translate('windSpeed') + ' m/s'} color="#31BD00" />}
					</div>
				)}
			</div>
		</div>
	);
};

export default ResultPage;

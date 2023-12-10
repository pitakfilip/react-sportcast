import React, { useEffect, useState, useMemo } from 'react';
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
import graphBackground from '../assets/mountains.jpg';
import PropTypes from 'prop-types';

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
			display: 'flex',
			justifyContent: 'center',
			width: '100%',
			backgroundImage: `url(${graphBackground})`,
			backgroundSize: 'cover',
			backgroundRepeat: 'no-repeat',
			backgroundPosition: 'center center',
			padding: '3em 0'
		},
		graphContent: {
			display: 'block',
			width: '90%',
		},
		title: {
			fontFamily: 'Tahoma, Verdana, Segoe, sans-serif',
			fontStyle: 'normal',
			fontWeight: '500',
			fontSize: '3.5em',
		},
		tabs: {
			paddingBottom: '2em',
			'& .MuiTabs-flexContainer': {
				justifyContent: 'center',
			},
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
	const dispatch = useDispatch();
	const classes = useStyles();

	const data = useSelector(({ exampleReducer }) => exampleReducer.data);

	const initialSearchValues = useMemo(() => {
		return location.state ? location.state.searchValues : undefined;
	}, [location.state]);
	const [searchValues, setSearchValues] = useState(initialSearchValues);

	const { fetchDataAndProcess } = useSportData(searchValues); // Pass searchValues to the hook

	useEffect(() => {
		if (!searchValues) {
			navigate('/search');
		} else {
			fetchData();
		}
	}, [searchValues]);

	const fetchData = async () => {
		if (searchValues) {
			const result = await fetchDataAndProcess();
			dispatch(dataFetched(result));
		}
	};

	const handleSearchUpdate = (newSearchValues) => {
		setSearchValues(newSearchValues); // Update the search criteria
	};


	return (
		<div className={classes.root}>
			<div className={classes.wrapper}>
				<div className={classes.search}>
					<TranslucentBox component={SearchForm} simplified={true} onFormSubmit={handleSearchUpdate} />
				</div>

				{data && (
					<div className={classes.forecast}>
						<Forecast data={data} />
					</div>
				)}

				{data && (
					<div className={classes.graphs}>
						<TranslucentBox centered={true} width={70} 
														component={Graphs} 
														data={data} 
														css={classes}
						/>
					</div>
				)}
			</div>
		</div>
	);
};

const Graphs = ({data, css}) => {
	const [activeTab, setActiveTab] = useState(0);

	const handleTabChange = (e, newValue) => {
		setActiveTab(newValue);
	};
	return (
		<div className={css.graphContent}>
			<section className={css.title}>{translate('detailedOverview')}</section>
			<Tabs value={activeTab} variant="fullWidth" onChange={handleTabChange} className={css.tabs}>
				<Tab label={translate('temperature')} style={{outline: 'none'}}/>
				<Tab label={translate('precipitation')} style={{outline: 'none'}}/>
				<Tab label={translate('windSpeed')} style={{outline: 'none'}}/>
			</Tabs>

			{activeTab === 0 && <LineGraph data={data} weatherProperty="temperature" label={translate('temperature') + ' °C'} color="#FF8513" />}
			{activeTab === 1 && <BarGraph data={data} weatherProperty="precipitation" label={translate('precipitation') + ' mm'} />}
			{activeTab === 2 && <LineGraph data={data} weatherProperty="wind" label={translate('windSpeed') + ' m/s'} color="#31BD00" />}
		</div>
	);
};

Graphs.propTypes = {
	data: PropTypes.any,
	css: PropTypes.any
};

export default ResultPage;

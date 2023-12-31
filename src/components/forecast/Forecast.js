import React from 'react';
import {makeStyles} from '@mui/styles';
import PropTypes from 'prop-types';
import {translate} from '../../services/LanguageService';
import Slider from "react-slick";
import WeatherCard from './WeatherCard';


const useStyles = makeStyles((theme) => {
	return {
		root: {
			fontFamily: 'Tahoma, Verdana, Segoe, sans-serif',
			fontStyle: 'normal',
			fontWeight: '500',
			marginTop: '2em'
		},
		title: {
			fontSize: '3.5em'
		},
		subtitle: {
			marginLeft: '1em',
			fontSize: '1.3em'
		},
		cards: {
			display: 'block',
			marginTop: '1em', 
			marginBottom: '2em'
		}
	};
});

const sliderSettings = {
	rows: 1,
	slidesPerRow: 5,
	speed: 1000,
};

const Forecast = ({ data }) => {
	const classes = useStyles();
	
	return (
		<div className={classes.root}>
			<div>
				<section className={classes.title}>{translate('forecastTitle')}</section>
				<section className={classes.subtitle}>{translate('forecastSubtitle')}</section>	
			</div>
			
			<div className={classes.cards}>
				<Slider {...sliderSettings}>

					{data.map((dayData, index) => {
						return (
							<div key={index}>
								<WeatherCard data={dayData}/>
							</div>
							)
					})}
					
				</Slider>
			</div>
		</div>
	);
};

Forecast.propTypes = {
	data: PropTypes.any
};

export default Forecast;

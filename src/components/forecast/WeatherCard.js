import React from 'react';
import { makeStyles } from '@mui/styles';
import PropTypes from 'prop-types';
import { getLocale, translate } from '../../services/LanguageService';
import { LinearProgress, Paper } from '@mui/material';
import cloudy from './../../assets/forecast/cloudy.png';
import rain from './../../assets/forecast/rain.png';
import rainSunny from './../../assets/forecast/rain-sunny.png';
import sunny from './../../assets/forecast/sunny.png';
import windy from './../../assets/forecast/windy.png';
import { Thermostat, WaterDrop, Air } from '@mui/icons-material';

const useStyles = makeStyles((theme) => {
	return {
		root: {
			display: 'inline-flex',
			alignItems: 'center',
			justifyContent: 'center',
			width: '100%',
			margin: '0.5em 0',
		},
		card: {
			width: '80%',
			display: 'flex',
			flexDirection: 'column',
			alignItems: 'center',
		},
		content: {
			display: 'flex',
			flexDirection: 'column',
			alignItems: 'center',
			width: '100%',
		},
		weekDay: {
			color: '#0770DA',
			fontWeight: '500',
			fontSize: '1.8em',
		},
		date: {
			color: '#0770DA',
			fontSize: '1.2em',
		},
		temperature: {
			color: '#0770DA',
			fontSize: '1.4em',
			fontWeight: '500',
		},
		icon: {
			display: 'inline-flex',
			justifyContent: 'center',
			margin: '1.5em 1em',
		},
		rating: {
			'& .progressBar': {
				height: '75%',
			},
			marginBottom: '0.7em',
			height: '1em',
			width: '75%',
		},
		cardBody: {
			display: 'flex',
			flexDirection: 'column',
			alignItems: 'center',
			justifyContent: 'space-evenly',
			height: '12em',
			width: '100%',
		},
		cardRow: {
			display: 'inline-flex',
			width: '80%',
			alignItems: 'center',
			justifyContent: 'space-evenly',
			'& > span': {
				fontWeight: '500',
			},
		},
	};
});

const locale = getLocale();

const WeatherCard = ({ data }) => {
	const classes = useStyles();
	const [flip, setFlip] = React.useState(false);

	const uppercaseFirstChar = (string) => {
		return string.charAt(0).toUpperCase() + string.slice(1);
	};
	const getDay = () => {
		return data.date.getDate();
	};
	const getMonth = () => {
		return uppercaseFirstChar(data.date.toLocaleString(locale, { month: 'long' }));
	};
	const getWeatherIcon = () => {
		if (data.precipitation > 5 && data.temperature > 20) return rainSunny;
		if (data.precipitation > 5) return rain;
		if (data.precipitation > 0.5) return cloudy;
		if (data.wind > 3) return windy;
		return sunny;
	};
	const levelColor = () => {
		if (data.rating === 1) return 'red';
		if (data.rating === 2) return 'orange';
		if (data.rating === 3) return 'yellow';
		if (data.rating === 4) return 'green';
	};
	const handleFlip = () => {
		setFlip(!flip);
	};

	return (
		<div className={classes.root}>
			<Paper className={classes.card} square={false} elevation={4} onClick={handleFlip}>
				<div className={classes.content}>
					<section className={classes.weekDay}>{translate(data.day)}</section>
					<section className={classes.date}>{`${getDay()}. ${getMonth()}`}</section>

					{(() => {
						if (!flip) {
							return (
								<div className={classes.cardBody}>
									<section className={classes.icon}>
										<img src={getWeatherIcon()} style={{ width: '55%', height: 'auto' }} alt={'weather icon'} />
									</section>
									<section className={classes.temperature}>{`${data.temperature}°`}</section>
								</div>
							);
						} else {
							return (
								<div className={classes.cardBody}>
									<section className={classes.cardRow}>
										<Thermostat sx={{ fontSize: 30 }} />
										<span>{`${data.temperature} °C`}</span>
									</section>

									<section className={classes.cardRow}>
										<WaterDrop sx={{ fontSize: 30 }} />
										<span>{`${data.precipitation} mm`}</span>
									</section>

									<section className={classes.cardRow}>
										<Air sx={{ fontSize: 30 }} />
										<span>{`${data.wind} m/s`}</span>
									</section>
								</div>
							);
						}
					})()}

					<section className={classes.rating}>
						<LinearProgress
							variant="determinate"
							sx={{
								border: '1px solid black',
								borderRadius: '10px',
								backgroundColor: 'rgba(216,235,255,0.65)',
								'& .MuiLinearProgress-bar': {
									backgroundColor: `${levelColor()}`,
								},
							}}
							value={25 * data.rating}
							className={'progressBar'}
						/>
					</section>
				</div>
			</Paper>
		</div>
	);
};

WeatherCard.propTypes = {
	data: PropTypes.any,
};

export default WeatherCard;

import React, {useState} from 'react';
import IntroSlide from './slides/IntroSlide';
import Carousel from 'react-material-ui-carousel';
import SearchSlide from './slides/SearchSlide';
import WeatherCardSlide from './slides/WeatherCardSlide';
import {Paper} from '@mui/material';
import {makeStyles} from '@mui/styles';

const useStyles = makeStyles((theme) => {
	return {
		root: {
			width: '100%'
		},
		paper: {
			padding: '10%'
		}
	};
});

const carrouselSettings = {
	autoPlay: false,
	animation: 'slide',
	indicators: true,
	navButtonsAlwaysVisible: false,
	navButtonsAlwaysInvisible: false,
	cycleNavigation: true,
	fullHeightHover: true,
	swipe: true
}

const InfoCarousel = () => {
	const classes = useStyles();
	const [settings] = useState(carrouselSettings);
	const carouselItems = [IntroSlide, SearchSlide, WeatherCardSlide, IntroSlide];

	return (
		<div className={classes.root}>
			<Carousel
				navButtonsProps={{          // Change the colors and radius of the actual buttons. THIS STYLES BOTH BUTTONS
					style: {
						backgroundColor: '#0770DA',
					}
				}}
				{...settings}
			>
				{
					carouselItems.map((Component, index) => {
						return (
							<Paper className={classes.paper} key={index} style={{height: '100%'}}>
								<Component/>
							</Paper>
						)
					})
				}
			</Carousel>
		</div>
	);
};

export default InfoCarousel;

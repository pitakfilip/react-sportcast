import React from 'react';
import {makeStyles} from '@mui/styles';
import cycling from './assets/cycling.png';
import running from './assets/running.png';

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
		},
		textSection: {
			flex: '4'
		},
		imageSection: {
			flex: '1'
		}
	};
});

const IntroSlide = () => {
	const classes = useStyles();

	return (
		<div className={classes.root}>
			<section className={classes.section}>
				<p>{'Elevate your active lifestyle with SportCast – the ultimate weather companion for enthusiasts like you!'}</p>
			</section>
			<section className={classes.section}>
                <span className={classes.textSection}>
                    <p>{'Whether you are gearing up for a thrilling game of football, an adventurous hike, or a scenic cycling' +
											'tour, SportCast has got you covered. Simply find a suitable activity for your plans in next 10 days, ' +
											'and we will analyze the weather for you to make the most of your outdoor pursuits.'}</p>
                </span>
				<span className={classes.imageSection}>
                    <img src={cycling} alt={'cycling'}/>
                </span>
			</section>
			<section className={classes.section}>
                <span className={classes.imageSection}>
                    <img src={running} alt={'running'}/>
                </span>
				<span className={classes.textSection}>
                    <p>{'Don\'t let unpredictable weather dampen your plans – embrace the outdoors with SportCast and' +
											' seize every opportunity to stay active and engaged!'}</p>
                </span>
			</section>
		</div>
	);
};
export default IntroSlide;

import React from 'react';
import {makeStyles} from '@mui/styles';
import TranslucentBox from '../components/TranslucentBox';
import SearchForm from '../components/SearchForm';
import {Box, Card, CardMedia, Grid, IconButton, Typography} from '@mui/material';
import formBackground from '../assets/portugal_cycling.png';
import swimming from '../assets/swimming.png';
import football from '../assets/football.jpg';
import hiking from '../assets/hiking.jpg';
import {translate} from '../services/LanguageService';
import {Search} from '@mui/icons-material';
import {useNavigate} from 'react-router-dom';
import {ActivityService} from '../services/ActivityService';

const useStyles = makeStyles((theme) => {
	return {
		searchForm: {
			display: 'flex',
			justifyContent: 'center',
			backgroundImage: `url(${formBackground})`,
			backgroundSize: 'cover',
			backgroundRepeat: 'no-repeat',
			backgroundPosition: 'center center',
			padding: '3em 0'
		},
		content: {
			width: '80%', padding: '3em',
		},
		exploreWrapper: {
			display: 'flex',
			justifyContent: 'center',
		},
		explore: {
			marginTop: '1.5em',
			marginBottom: '3em',
			display: 'block',
			width: '80%'
		},
		title: {
			fontSize: '2.5em'
		},
		subTitle: {
			fontSize: '1.2em'
		},
		topActivities: {
			marginTop: '2em'
		},
		activityTypography: {
			display: 'inline-flex',
			justifyContent: 'space-between',
			alignItems: 'center',
			width: '100%'
		}
	};
});


const SearchPage = () => {
	const classes = useStyles();
	const sxBox = {
		position: 'absolute',
		bottom: 0,
		left: 0,
		width: '100%',
		bgcolor: 'rgba(216,235,255,0.75)',
		padding: '10px',
	};
	
	const navigate = useNavigate();
	const goResult = (activity) => {
		const props = {...ActivityService.getActivityPreset(activity), location: 'Brno', activity: activity};
		navigate('/result', { state: { searchValues: props } });
	} 
	
	return (
		<div>
			<div className={classes.searchForm}>
				<section className={classes.content}>
					<TranslucentBox component={SearchForm} simplified={false}/>
				</section>
			</div>

			<div className={classes.exploreWrapper}>
				<div className={classes.explore}>
					<section className={classes.title}>{translate('exploreTitle')}</section>
					<section className={classes.subTitle}>{translate('exploreSubTitle')}</section>

					<section className={classes.topActivities}>

						<Grid container
									spacing={3}
									direction="row"
									justifyContent="space-between"
									alignItems="center"
						>
							<Grid item sx={4}>
								<Card style={{borderRadius: '10px'}}>
									<Box sx={{position: 'relative'}}>
										<CardMedia
											component="img"
											height="300"
											image={swimming}
										/>
										<Box sx={sxBox}>
											<span className={classes.activityTypography}>
												<Typography variant="h5">{ActivityService.getLabel('swimming')}</Typography>
												<IconButton onClick={() => goResult('swimming')}>
													<Search/>
												</IconButton>
											</span>
										</Box>
									</Box>
								</Card>
							</Grid>

							<Grid item sx={4}>
								<Card style={{borderRadius: '10px'}}>
									<Box sx={{position: 'relative'}}>
										<CardMedia
											component="img"
											height="300"
											image={football}
										/>
										<Box sx={sxBox}>
										<span className={classes.activityTypography}>
											<Typography variant="h5">{ActivityService.getLabel('football')}</Typography>
											<IconButton onClick={() => goResult('football')}>
												<Search/>
											</IconButton>
										</span>
										</Box>
									</Box>
								</Card>
							</Grid>

							<Grid item sx={4}>
								<Card style={{borderRadius: '10px'}}>
									<Box sx={{position: 'relative'}}>
										<CardMedia
											component="img"
											height="300"
											image={hiking}
										/>
										<Box sx={sxBox}>
										<span className={classes.activityTypography}>
											<Typography variant="h5">{ActivityService.getLabel('hiking')}</Typography>
											<IconButton onClick={() => goResult('hiking')}>
												<Search/>
											</IconButton>
										</span>
										</Box>
									</Box>
								</Card>
							</Grid>
						</Grid>

					</section>
				</div>
			</div>
		</div>
	);
};

export default SearchPage;

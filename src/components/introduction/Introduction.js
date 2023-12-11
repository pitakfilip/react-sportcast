import React from 'react';
import {makeStyles} from '@mui/styles';
import {Button} from '@mui/material';
import {translate} from '../../services/LanguageService';
import {useNavigate} from 'react-router-dom';

const useStyles = makeStyles((theme) => {
	return {
		root: {
			height: '100%',
		},
		wrapper: {
			height: '100%',
			width: '100%',
			display: 'flex',
			justifyContent: 'center',
		},
		content: {
			fontFamily: 'Arial, sans-serif',
			fontSize: '0.8vw',
			width: '50%',
			textAlign: 'justify',
			display: 'flex',
			flexDirection: 'column',
			justifyContent: 'center',
		},
		centered: {
			display: 'inline-flex',
			justifyContent: 'center'
		}
	};
});

const Introduction = () => {
	const classes = useStyles();
	
	const navigate = useNavigate();
	const handleClick = () => {
		navigate('/search');
	}	
	
	return (
		<div className={classes.root}>
			<div className={classes.wrapper}>
				<div className={classes.content}>
					<section>
						<p>{translate('introElevate')}</p>
						<p>{translate('introWhether')}</p>
						<p>{translate('introDont')}</p>
					</section>

					<section className={classes.centered}>
						<Button variant="contained" onClick={handleClick}>
							{translate('continue')}
						</Button>
					</section>
				</div>
			</div>
		</div>
	);
};

export default Introduction;

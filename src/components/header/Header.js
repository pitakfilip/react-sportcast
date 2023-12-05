import React from 'react';
import {makeStyles} from '@mui/styles';
import Logo from '../logo/Logo';
import LanguagePicker from './LanguagePicker';
import Account from './Account';
import {useNavigate} from 'react-router-dom';

const useStyles = makeStyles((theme) => {
	return {
		root: {
			display: 'flex',
			justifyContent: 'center'
		},
		content: {
			width: '80vw',
			marginBottom: '0.75em',
			paddingBottom: '0.75em',
			borderBottom: '1px solid black',
			display: 'flex',
			justifyContent: 'space-between',
			alignItems: 'center'
		},
		rightSection: {
			display: 'inline-flex',
			alignItems: 'center',
			gap: '1em',
			height: 'max-content'
		},
	};
});

const Header = () => {
	const classes = useStyles();

	const navigate = useNavigate();
	const goHome = () => {
		navigate('/search');
	}

	return (
		<div className={classes.root}>
			<div className={classes.content}>
				<a onClick={goHome}><Logo scale={1.4}/></a>
				<section className={classes.rightSection}>
					<LanguagePicker/>
					<Account/>
				</section>
			</div>
		</div>
	);
};
export default Header;

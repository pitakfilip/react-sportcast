import React from 'react';
import { makeStyles } from '@mui/styles';
import PropTypes from 'prop-types';


const TranslucentBox = ({component: Component, width, height, ...props}) => {
	const useStyles = makeStyles((theme) => {
		return {
			root: {
				width: (width !== undefined) ? `${width}%` : 'auto',
				height: (height !== undefined) ? `${height}%` : 'auto',
				border: '1px solid #0770DA',
				borderRadius: '1.5em',
				backgroundColor: 'rgba(216,235,255,0.85)',
				padding: '2em',
			},
			inner: {
				// width: 'fit-content',
				height: 'fit-content',
			},
		};
	});
	const classes = useStyles();

	return (
		<div className={classes.root}>
			<div className={classes.inner}>
				<Component {...props}/>
			</div>
		</div>
	);
};

TranslucentBox.propTypes = {
	component: PropTypes.oneOfType([PropTypes.element, PropTypes.func]).isRequired,
	width: PropTypes.number,
	height: PropTypes.number,
};

export default TranslucentBox;

import React from 'react';
import { makeStyles } from '@mui/styles';
import PropTypes from 'prop-types';


const TranslucentBox = ({component: Component, centered, width, height, ...props}) => {
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
			innerCentered: {
				display: 'flex',
				justifyContent: 'center',
				width: '100%'
			}
		};
	});
	const classes = useStyles();

	return (
		<div className={classes.root}>
			<div className={classes.inner + centered? ` ${classes.innerCentered}` : ''}>
				<Component {...props}/>
			</div>
		</div>
	);
};

TranslucentBox.propTypes = {
	component: PropTypes.oneOfType([PropTypes.element, PropTypes.func]).isRequired,
	centered: PropTypes.bool,
	width: PropTypes.number,
	height: PropTypes.number,
};

export default TranslucentBox;

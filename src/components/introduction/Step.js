import React from 'react';
import {makeStyles} from '@mui/styles';

const useStyles = makeStyles((theme) => {
	return {
		root: {},
	};
});


const Step = () => {
	const classes = useStyles();

	return (
		<div className={classes.root}>
			<svg width="450px" height="300px" xmlns="http://www.w3.org/2000/svg">
				<g id="Layer_1">
					<title>Layer 1</title>
					<path stroke="#000" id="svg_3" d="m2.50002,3l333.74983,0l111.25014,146.99968l-111.25014,
                                    147.00033l-333.74983,0l111.25011,-147.00033l-111.25011,-146.99968z" fill="blue"/>
				</g>
			</svg>
		</div>
	);
};

export default Step;

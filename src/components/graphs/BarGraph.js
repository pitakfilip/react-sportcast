import React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';

const BarGraph = ({ data, weatherProperty, label, color }) => {
	const graphData = data.map((entry) => entry[weatherProperty]);
	const graphXLabels = data.map((entry) => `${entry.date.getDate()}.${entry.date.getMonth()}.`);

	const config = {
		series: [{ data: graphData, label, color }],
	};

	const xAxisCommon = {
		data: graphXLabels,
		scaleType: 'band',
	};

	return (
		<div>
			<Box sx={{ width: '100%', maxWidth: '100%', height: 450 }}>
				<BarChart
					xAxis={[
						{
							...xAxisCommon,
						},
					]}
					{...config}
				/>
			</Box>
		</div>
	);
};

BarGraph.propTypes = {
	data: PropTypes.array.isRequired,
	weatherProperty: PropTypes.string.isRequired,
	label: PropTypes.string.isRequired,
	color: PropTypes.string,
};

BarGraph.defaultProps = {
	color: '#4e79a7',
};

export default BarGraph;

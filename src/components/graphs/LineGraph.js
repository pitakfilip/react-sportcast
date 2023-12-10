import React from 'react';
import { LineChart } from '@mui/x-charts/LineChart';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';

const LineGraph = ({ data, weatherProperty, label, color }) => {
	const graphData = data.map((entry) => entry[weatherProperty]);
	const graphXLabels = data.map((entry) => new Date(entry.date.getYear(), entry.date.getMonth(), entry.date.getDate()));

	const curve = weatherProperty === 'wind' ? 'linear' : 'natural';

	const config = {
		series: [{ data: graphData, label, curve, color }],
	};

	const xAxisCommon = {
		data: graphXLabels,
		scaleType: 'time',
		labelOffset: 15,
	};

	return (
		<div>
			<Box sx={{ width: '100%', maxWidth: '100%', height: 400 }}>
				<LineChart
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

LineGraph.propTypes = {
	data: PropTypes.array.isRequired,
	weatherProperty: PropTypes.string.isRequired,
	label: PropTypes.string.isRequired,
	color: PropTypes.string,
};

LineGraph.defaultProps = {
	color: '#4e79a7',
};

export default LineGraph;

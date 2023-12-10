import React from 'react';
import { LineChart } from '@mui/x-charts/LineChart';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import {getLocale} from '../../services/LanguageService';

const LineGraph = ({ data, weatherProperty, label, color }) => {
	const locale = getLocale();
	const getDay = (date) => {
		return date.getDate();
	};
	const getMonth = (date) => {
		return (date.toLocaleString(locale, { month: 'long' })).substring(0, 3);
	};
	
	const graphData = data.map((entry) => entry[weatherProperty]);
	const graphXLabels = data.map((entry) => new Date(entry.date.getYear(), entry.date.getMonth(), entry.date.getDate()));
	const xLabels = data.map((entry) => `${getDay(entry.date)}. ${getMonth(entry.date)}`);

	const maxValue = Math.max.apply(null, data.map(function (o) { return o[weatherProperty]; }));
	const yLabels = Array.from({ length: maxValue + 4 }, (_, index) => index).reverse();
	
	const curve = weatherProperty === 'wind' ? 'linear' : 'natural';
	const config = {
		series: [{ data: graphData, label, color }],
	};

	const xAxisCommon = {
		data: graphXLabels,
		scaleType: 'time',
		labelOffset: 15,
	};

	return (
		<div>
			<Box sx={{ width: '100%', maxWidth: '100%', height: 450 }}>
				<LineChart
					xAxis={[{ scaleType: 'point', data: xLabels }]}
					yAxis={[{ scaleType: 'linear', data: yLabels }]}
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

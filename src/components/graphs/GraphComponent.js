import React from 'react';
import { LineChart } from '@mui/x-charts/LineChart';
import { BarChart } from '@mui/x-charts/BarChart';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';

const GraphComponent = ({ data, activeTab }) => {
	if (!data) {
		// TODO change this?
		return <div>Loading...</div>;
	}

	// TODO does nothing
	let Graph = LineChart; // Default to LineChart

	// // Determine the appropriate graph component based on the activeTab
	// if (activeTab === 1) {
	//   // BarGraph for precipitation
	//   Graph = BarGraph;
	// }

	// Extracting weather values for the selected property (temperature, precipitation, wind)
	const weatherProperty = activeTab === 0 ? 'temperature' : activeTab === 1 ? 'precipitation' : 'wind';
	const graphData = data.map((entry) => entry[weatherProperty]);
	console.log('graph data');
	console.log(graphData);
	const graphXLabels = data.map((entry) => `${entry.date}`);
	console.log('graph labels');
	console.log(graphXLabels);

	const timeData = [
		new Date(2023, 7, 31),
		new Date(2023, 8, 1),
		new Date(2023, 8, 2),
		new Date(2023, 8, 3),
		new Date(2023, 8, 4),
		new Date(2023, 8, 6),
		new Date(2023, 8, 7),
		new Date(2023, 8, 8),
		new Date(2023, 8, 9),
		new Date(2023, 8, 10),
	];

	const config = {
		series: [{ data: graphData }],
		height: 300,
	};

	const xAxisCommon = {
		data: timeData,
		scaleType: 'time',
	};

	return (
		<div>
			<Box sx={{ width: '100%', maxWidth: 800 }}>
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

GraphComponent.propTypes = {
	data: PropTypes.array,
	activeTab: PropTypes.number.isRequired,
};

export default GraphComponent;

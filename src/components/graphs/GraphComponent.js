import React from 'react';
import { LineChart } from '@mui/x-charts/LineChart';
import { BarChart } from '@mui/x-charts/BarChart';
import PropTypes from 'prop-types';

const GraphComponent = ({ data, activeTab }) => {
	if (!data) {
		// TODO change this?
		return <div>Loading...</div>;
	}

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
	const graphXLabels = data.map((entry) => `${entry.date.getDate()}`);
  console.log('graph labels');
  console.log(graphXLabels);

	return (
		<div>
			<Graph
				width={1000}
				height={500}
				series={[
					{
						data: graphData,
					},
				]}
				xAxis={[{ data: graphXLabels }]}
			/>
		</div>
	);
};

GraphComponent.propTypes = {
	data: PropTypes.array,
	activeTab: PropTypes.number.isRequired,
};

export default GraphComponent;

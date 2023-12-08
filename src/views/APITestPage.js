import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSportData } from '../utils/apiUtils';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import GraphComponent from '../components/graphs/GraphComponent';
import { LineChart } from '@mui/x-charts/LineChart';

const dataFetched = (data) => ({
	type: 'DATA_FETCHED',
	payload: data,
});

const APITestPage = () => {
	const searchData = {
		activity: 'football',
		location: 'Praha',
		temperatureFrom: 15,
		temperatureTo: 30,
		precipitation: 5,
		windSpeedFrom: 0,
		windSpeedTo: 10,
	};
	const dispatch = useDispatch();
	const data = useSelector(({ exampleReducer }) => exampleReducer.data);
	const { fetchDataAndProcess } = useSportData(searchData); // Pass the sport type

	useEffect(() => {
		const fetchData = async () => {
			const result = await fetchDataAndProcess();
			dispatch(dataFetched(result));
		};

		fetchData();
	}, []);

	const [activeTab, setActiveTab] = useState(0);

	const handleTabChange = (event, newValue) => {
		setActiveTab(newValue);
	};

	return (
		<div>
			<h1>API Test Page</h1>
			{data && (
				<div>
					<h2>10 day forecast</h2>
					<code>{JSON.stringify(data)}</code>
					<Tabs value={activeTab} onChange={handleTabChange}>
						<Tab label="Temperature" />
						<Tab label="Precipitation" />
						<Tab label="Wind Speed" />
					</Tabs>
					<div>
						<GraphComponent data={data} activeTab={activeTab}/>
					</div>
				</div>
			)}
		</div>
	);
};

export default APITestPage;

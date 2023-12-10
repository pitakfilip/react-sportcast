import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSportData } from '../utils/apiUtils';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import LineGraph from '../components/graphs/LineGraph';
import BarGraph from '../components/graphs/BarGraph';
import { translate } from '../services/LanguageService';

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

	const handleTabChange = (e, newValue) => {
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
						<Tab label={translate('temperature')} />
						<Tab label={translate('precipitation')} />
						<Tab label={translate('windSpeed')} />
					</Tabs>
					{/* <div>
						<LineGraph data={data} weatherProperty={'temperature'} />
					</div> */}

					{activeTab === 0 && <LineGraph data={data} weatherProperty="temperature" label={translate('temperature') + ' °C'} color="#FF8513" />}
					{activeTab === 1 && <BarGraph data={data} weatherProperty="precipitation" label={translate('precipitation') + ' mm'} />}
					{activeTab === 2 && <LineGraph data={data} weatherProperty="wind" label={translate('windSpeed') + ' m/s'} color="#31BD00" />}
				</div>
			)}
		</div>
	);
};

export default APITestPage;

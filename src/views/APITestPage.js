import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSportData } from '../utils/apiUtils';

const dataFetched = (data) => ({
	type: 'DATA_FETCHED',
	payload: data,
});

const APITestPage = () => {
	const dispatch = useDispatch();
	const data = useSelector(({ exampleReducer }) => exampleReducer.data);
	const { fetchDataAndProcess } = useSportData('football'); // Pass the sport type

	useEffect(() => {
		const fetchData = async () => {
			const result = await fetchDataAndProcess();
			dispatch(dataFetched(result));
		};

		fetchData();
	}, []);

	return (
		<div>
			<h1>Results Page</h1>
			{data && (
				<div>
					<h2>Precipitation Data</h2>
					{/* Render Precipitation data */}
					{/* Example: {data.precipitation.map(item => <div key={item.id}>{item.name}</div>)} */}

					<h2>Temperature Data</h2>
					{/* Render temperature data */}
					{/* Example: {data.temperature.map(item => <div key={item.id}>{item.name}</div>)} */}

					<h2>Wind Data</h2>
					{/* Render wind data */}
					{/* Example: {data.wind.map(item => <div key={item.id}>{item.name}</div>)} */}
				</div>
			)}
		</div>
	);
};

export default APITestPage;

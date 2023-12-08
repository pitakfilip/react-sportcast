import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSportData } from '../utils/apiUtils';

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

	return (
		<div>
			<h1>API Test Page</h1>
			{data && (
				<div>
					<h2>10 day forecast</h2>
					<code>{JSON.stringify(data)}</code>
				</div>
			)}
		</div>
	);
};

export default APITestPage;

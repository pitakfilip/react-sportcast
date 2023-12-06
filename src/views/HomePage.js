import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector, useStore } from 'react-redux';
import BasicTable from '../components/Table';
import { useType, useRest, useCustomData } from '../utils/helpers';
import { ResponsiveLine } from '@nivo/line';
import mean from 'lodash/mean';

const queryBuilder = ({ max = 15, skip = 0, filter, month }) => {
	return `q={${filter ? `"year": ${filter}` : ''}${month ? `,"month": ${month}` : ''}}&max=${max}&skip=${skip}`;
};

const typeMapper = {
	'': 'Amount of sun',
	snow: 'Amount of snow',
	precipitation: 'Amount of rain',
	speed: 'Wind speed',
	pressure: 'Air pressure',
	moist: 'Air moisture',
	'temp-avg': 'Average temperture',
	'temp-min': 'Minimal temperture',
	'temp-max': 'Maximum temperture',
	energy: 'Energy prices in EU (Eur/MWhe)',
};

const dataFetched = (data) => {
	return {
		type: 'DATA_FETCHED',
		payload: data,
	};
};

const fetchData = (api, rest, max = 10, skip = 0) => {
	return (dispatch) => {
		if (api) {
			api.get(`/rest/${rest}?${queryBuilder({ max, skip })}`).then((data) => {
				dispatch(dataFetched(data));
			});
		}
	};
};

const chartData = [
	{
		id: 'japan',
		color: 'hsl(239, 70%, 50%)',
		data: [
			{
				x: 'plane',
				y: 200,
			},
			{
				x: 'helicopter',
				y: 188,
			},
			{
				x: 'boat',
				y: 224,
			},
			{
				x: 'train',
				y: 18,
			},
			{
				x: 'subway',
				y: 71,
			},
			{
				x: 'bus',
				y: 238,
			},
			{
				x: 'car',
				y: 194,
			},
			{
				x: 'moto',
				y: 283,
			},
			{
				x: 'bicycle',
				y: 181,
			},
			{
				x: 'horse',
				y: 92,
			},
			{
				x: 'skateboard',
				y: 296,
			},
			{
				x: 'others',
				y: 287,
			},
		],
	},
	{
		id: 'france',
		color: 'hsl(70, 70%, 50%)',
		data: [
			{
				x: 'plane',
				y: 91,
			},
			{
				x: 'helicopter',
				y: 271,
			},
			{
				x: 'boat',
				y: 24,
			},
			{
				x: 'train',
				y: 64,
			},
			{
				x: 'subway',
				y: 297,
			},
			{
				x: 'bus',
				y: 3,
			},
			{
				x: 'car',
				y: 249,
			},
			{
				x: 'moto',
				y: 115,
			},
			{
				x: 'bicycle',
				y: 125,
			},
			{
				x: 'horse',
				y: 128,
			},
			{
				x: 'skateboard',
				y: 183,
			},
			{
				x: 'others',
				y: 40,
			},
		],
	},
	{
		id: 'us',
		color: 'hsl(192, 70%, 50%)',
		data: [
			{
				x: 'plane',
				y: 43,
			},
			{
				x: 'helicopter',
				y: 198,
			},
			{
				x: 'boat',
				y: 189,
			},
			{
				x: 'train',
				y: 152,
			},
			{
				x: 'subway',
				y: 62,
			},
			{
				x: 'bus',
				y: 176,
			},
			{
				x: 'car',
				y: 205,
			},
			{
				x: 'moto',
				y: 244,
			},
			{
				x: 'bicycle',
				y: 292,
			},
			{
				x: 'horse',
				y: 44,
			},
			{
				x: 'skateboard',
				y: 196,
			},
			{
				x: 'others',
				y: 166,
			},
		],
	},
	{
		id: 'germany',
		color: 'hsl(71, 70%, 50%)',
		data: [
			{
				x: 'plane',
				y: 280,
			},
			{
				x: 'helicopter',
				y: 65,
			},
			{
				x: 'boat',
				y: 87,
			},
			{
				x: 'train',
				y: 246,
			},
			{
				x: 'subway',
				y: 125,
			},
			{
				x: 'bus',
				y: 231,
			},
			{
				x: 'car',
				y: 202,
			},
			{
				x: 'moto',
				y: 183,
			},
			{
				x: 'bicycle',
				y: 284,
			},
			{
				x: 'horse',
				y: 137,
			},
			{
				x: 'skateboard',
				y: 67,
			},
			{
				x: 'others',
				y: 255,
			},
		],
	},
	{
		id: 'norway',
		color: 'hsl(352, 70%, 50%)',
		data: [
			{
				x: 'plane',
				y: 128,
			},
			{
				x: 'helicopter',
				y: 257,
			},
			{
				x: 'boat',
				y: 203,
			},
			{
				x: 'train',
				y: 237,
			},
			{
				x: 'subway',
				y: 205,
			},
			{
				x: 'bus',
				y: 10,
			},
			{
				x: 'car',
				y: 242,
			},
			{
				x: 'moto',
				y: 42,
			},
			{
				x: 'bicycle',
				y: 2,
			},
			{
				x: 'horse',
				y: 118,
			},
			{
				x: 'skateboard',
				y: 198,
			},
			{
				x: 'others',
				y: 171,
			},
		],
	},
];

const HomePage = () => {
	const type = useType();
	const [{ resource, rest }] = useRest(type);
	const [{ resource: energy, rest: restEnergy }] = useRest('energy');
	const [getData, updateData] = useCustomData();
	console.log(updateData, getData, 'this is updateData');
	console.log('==========');
	console.log('type ↓');
	console.log(type);
	console.log('==========');
	console.log('resource ↓');
	console.log(resource);
	console.log('==========');
	console.log('rest ↓');
	console.log(rest);
	console.log('==========');
	console.log(restEnergy, 'this is restEnergy');
	console.log(energy, 'this is energy');
	console.log(fetchData);

	const dispatch = useDispatch();
	const data = useSelector(({ exampleReducer }) => exampleReducer.data);
	const [{ max, skip }, setPagination] = useState({
		max: 10,
		skip: 0,
	});

	const store = useStore();
	console.log(store);

	// const [myData, setMyData] = useState({});

	useEffect(() => {
		if (resource) {
			// resource.get(`/rest/sunshine?${queryBuilder({ max: 10, filter: 2000 })}`).then((data) => {
			//   setMyData(data);
			// });
			resource.get(`/rest/${rest}?${queryBuilder({ max: 1000, skip: 2000 })}`).then(console.log);
			dispatch(fetchData(resource, rest, max, skip));
		}
	}, [resource, max, skip, rest]);

	const chartData2 = (data || []).reduce(
		(acc, { _id, year, month, ...item }) => ({
			...acc,
			[year]: {
				id: year,
				color: 'hsl(95, 70%, 50%)',
				data: [...((acc[year] && acc[year].data) || []), { x: month, y: mean(Object.values(item)) }],
			},
		}),
		{}
	);

	console.log(chartData, Object.values(chartData2));

	return (
		<div>
			<h1>{typeMapper[type || '']}</h1>
			<BasicTable
				data={data}
				perPage={max}
				page={skip / max}
				onPageSelect={(_e, page) => {
					setPagination(({ max }) => ({
						max,
						skip: max * page,
					}));
				}}
				onPerPageSelect={(_e, el) => {
					setPagination({
						skip: 0,
						max: el.props.value,
					});
				}}
			/>
			<div style={{ height: '500px' }}>
				{data && (
					<ResponsiveLine
						data={Object.values(chartData2)}
						margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
						xScale={{ type: 'point' }}
						yScale={{
							type: 'linear',
							min: 'auto',
							max: 'auto',
							stacked: true,
							reverse: false,
						}}
						yFormat=" >-.2f"
						axisTop={null}
						axisRight={null}
						axisBottom={{
							orient: 'bottom',
							tickSize: 5,
							tickPadding: 5,
							tickRotation: 0,
							legend: 'transportation',
							legendOffset: 36,
							legendPosition: 'middle',
						}}
						axisLeft={{
							orient: 'left',
							tickSize: 5,
							tickPadding: 5,
							tickRotation: 0,
							legend: 'count',
							legendOffset: -40,
							legendPosition: 'middle',
						}}
						pointSize={10}
						pointColor={{ theme: 'background' }}
						pointBorderWidth={2}
						pointBorderColor={{ from: 'serieColor' }}
						pointLabelYOffset={-12}
						useMesh={true}
						legends={[
							{
								anchor: 'bottom-right',
								direction: 'column',
								justify: false,
								translateX: 100,
								translateY: 0,
								itemsSpacing: 0,
								itemDirection: 'left-to-right',
								itemWidth: 80,
								itemHeight: 20,
								itemOpacity: 0.75,
								symbolSize: 12,
								symbolShape: 'circle',
								symbolBorderColor: 'rgba(0, 0, 0, .5)',
								effects: [
									{
										on: 'hover',
										style: {
											itemBackground: 'rgba(0, 0, 0, .03)',
											itemOpacity: 1,
										},
									},
								],
							},
						]}
					/>
				)}
			</div>
		</div>
	);
};

export default HomePage;

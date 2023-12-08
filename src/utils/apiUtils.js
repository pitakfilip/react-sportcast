import { setDate } from 'date-fns';
import { useAuth0 } from '../react-auth0-spa';
import { useRest } from '../utils/helpers';
// TODO delete import
import { precipitationData, temperatureData, windData } from './fakeData';

export const useSportData = (sportType) => {
	const { apiSun, apiTemp, apiAir, apiEnergy } = useAuth0();
	const [{ resource: precipResource, rest: precipRest }] = useRest('precipitation');
	const [{ resource: tempResource, rest: tempRest }] = useRest('temp-avg');
	const [{ resource: windResource, rest: windRest }] = useRest('speed');

	const fakeYear = 2017;
	const forecastDaysNumber = 10;

	const fetchDataForNextTwoMonths = async () => {
		const currentDate = new Date();
		const currentMonth = currentDate.getMonth() + 1; // Months are 0-indexed, so add 1.

		const isLastMonthOfYear = currentMonth === 12;

		// Construct the $or query for RestDB API
		const orQuery = [
			{
				year: fakeYear,
				month: currentMonth,
			},
		];

		if (isLastMonthOfYear === true) {
			orQuery.push({
				year: fakeYear + 1,
				month: 1,
			});
		} else {
			orQuery.push({
				year: fakeYear,
				month: currentMonth + 1,
			});
		}

		const restQuery = {
			$or: orQuery,
		};

		// Make API requests for precipitation, temperature, and wind
		// TODO use real API requests
		// const precipitationData = precipResource ? await precipResource.get(`/rest/${precipRest}?q=${JSON.stringify(restQuery)}`) : null;
		// const temperatureData = tempResource ? await tempResource.get(`/rest/${tempRest}?q=${JSON.stringify(restQuery)}`) : null;
		// const windData = windResource ? await windResource.get(`/rest/${windRest}?q=${JSON.stringify(restQuery)}`) : null;

		// TODO delete
		console.log('fake request sent, waiting...');
		const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
		await delay(1300);

		return {
			precipitation: precipitationData,
			temperature: temperatureData,
			wind: windData,
		};
	};

	const filterDataForNext10Days = (weatherData) => {
		let currentDate = new Date();
		currentDate.setFullYear(fakeYear);
		const forecast10Days = [];

		// 10 consecutive days starting today
		for (let i = 0; i < forecastDaysNumber; i++) {
			let date = new Date(currentDate);
			date.setDate(date.getDate() + i);
			forecast10Days.push({ date: date, day: date.getDay() });
		}

		// add precipitation, temperature and wind data to 10-day forecast
		forecast10Days.forEach((forecastDay) => {
			const getWeatherValue = (data) => {
				const monthData = data.find((entry) => entry.month === forecastDay.date.getMonth() + 1);
				return monthData ? monthData[forecastDay.date.getDate()] : 0;
			};

			forecastDay.precipitation = getWeatherValue(weatherData.precipitation);
			forecastDay.temperature = getWeatherValue(weatherData.temperature);
			forecastDay.wind = getWeatherValue(weatherData.wind);
		});

		return forecast10Days;
	};

	const rateEachDay = (forecastData, sportType) => {
		return forecastData, sportType;
		// Rating logic based on sport type here
	};

	const fetchDataAndProcess = async () => {
		const weatherData = await fetchDataForNextTwoMonths();
		const forecastData = filterDataForNext10Days(weatherData);
		const ratedForecastData = rateEachDay(forecastData, sportType);
		return ratedForecastData;
	};

	return {
		fetchDataAndProcess,
	};
};

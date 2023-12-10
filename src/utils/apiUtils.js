import { useAuth0 } from '../react-auth0-spa';
import { useRest } from '../utils/helpers';
import { translate } from '../services/LanguageService';
// TODO delete import
import { precipitationData, temperatureData, windData } from './fakeData';

export const useSportData = (searchData) => {
	const { apiSun, apiTemp, apiAir, apiEnergy } = useAuth0();
	const [{ resource: precipResource, rest: precipRest }] = useRest('precipitation');
	const [{ resource: tempResource, rest: tempRest }] = useRest('temp-avg');
	const [{ resource: windResource, rest: windRest }] = useRest('speed');
	const daysOfWeek = [
		translate('sunday'),
		translate('monday'),
		translate('tuesday'),
		translate('wednesday'),
		translate('thursday'),
		translate('friday'),
		translate('saturday'),
	];

	const currentYear = 2017;
	const forecastDaysNumber = 10;
	const currentDate = new Date();
	// change the year to go back in time
	currentDate.setFullYear(currentYear);

	const fetchDataForNextTwoMonths = async () => {
		const currentMonth = currentDate.getMonth() + 1; // Months are 0-indexed

		// determine the next month
		const isLastMonthOfYear = currentMonth === 12;
		const nextMonth = isLastMonthOfYear ? 1 : currentMonth + 1;
		const nextYear = isLastMonthOfYear ? currentYear + 1 : currentYear;

		// Construct the $or query for RestDB API
		const orQuery = [
			{ year: currentYear, month: currentMonth },
			{ year: nextYear, month: nextMonth },
		];

		const restQuery = { $or: orQuery };

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
		const forecastData = [];

		// add 10 consecutive dates starting today
		for (let i = 0; i < forecastDaysNumber; i++) {
			let date = new Date(currentDate);
			date.setDate(date.getDate() + i);
			forecastData.push({ date: date, day: daysOfWeek[date.getDay()] });
		}

		// add precipitation, temperature and wind data to 10-day forecast
		forecastData.forEach((forecastDay) => {
			const getWeatherValue = (dataset) => {
				// find the right month in the dataset
				const monthData = dataset.find((entry) => entry.month === forecastDay.date.getMonth() + 1);
				// get weather value for the given date
				return monthData ? monthData[forecastDay.date.getDate()] : 0;
			};

			forecastDay.precipitation = getWeatherValue(weatherData.precipitation);
			forecastDay.temperature = getWeatherValue(weatherData.temperature);
			forecastDay.wind = getWeatherValue(weatherData.wind);
		});

		return forecastData;
	};

	const rateEachDay = (forecastData, searchData) => {
		// rating scale: 1 - 4
		forecastData.forEach((forecastDay) => {
			let rating = 1;

			// rating: +1 if value within limits, +0 if value outside of limits
			if (forecastDay.temperature >= searchData.temperatureFrom && forecastDay.temperature <= searchData.temperatureTo) {
				rating += 1;
			}

			if (forecastDay.precipitation <= searchData.precipitation) {
				rating += 1;
			}

			if (forecastDay.wind >= searchData.windSpeedFrom && forecastDay.wind <= searchData.windSpeedTo) {
				rating += 1;
			}

			// sum of temp, precip and wind ratings
			forecastDay.rating = rating;
		});

		return forecastData;
	};

	const fetchDataAndProcess = async () => {
		const weatherData = await fetchDataForNextTwoMonths();
		const forecastData = filterDataForNext10Days(weatherData);
		const ratedForecastData = rateEachDay(forecastData, searchData);
		console.log(ratedForecastData);
		return ratedForecastData;
	};

	return {
		fetchDataAndProcess,
	};
};

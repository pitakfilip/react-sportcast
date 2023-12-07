import { useAuth0 } from '../react-auth0-spa';
import { useRest } from '../utils/helpers';

export const useSportData = (sportType) => {
	const { apiSun, apiTemp, apiAir, apiEnergy } = useAuth0();
	const [{ resource: precipResource, rest: precipRest }] = useRest('precipitation');
	const [{ resource: tempResource, rest: tempRest }] = useRest('temp-avg');
	const [{ resource: windResource, rest: windRest }] = useRest('speed');

	const fetchDataForNextTwoMonths = async () => {
		const currentDate = new Date();
		// TODO use global constant for year
		const currentYear = 2021;
		const currentMonth = currentDate.getMonth() + 1; // Months are 0-indexed, so add 1.

		const isLastMonthOfYear = currentMonth === 12;

		// Construct the $or query for RestDB API
		const orQuery = [
			{
				year: currentYear,
				month: currentMonth,
			},
		];

		if (isLastMonthOfYear === true) {
			orQuery.push({
				year: currentYear + 1,
				month: 1,
			});
		} else {
			orQuery.push({
				year: currentYear,
				month: currentMonth + 1,
			});
		}

		const restQuery = {
			$or: orQuery,
		};

		// Make API requests for precipitation, temperature, and wind
		const precipitationData = precipResource ? await precipResource.get(`/rest/${precipRest}?q=${JSON.stringify(restQuery)}`) : null;
		const temperatureData = tempResource ? await tempResource.get(`/rest/${tempRest}?q=${JSON.stringify(restQuery)}`) : null;
		const windData = windResource ? await windResource.get(`/rest/${windRest}?q=${JSON.stringify(restQuery)}`) : null;

		return {
			precipitation: precipitationData,
			temperature: temperatureData,
			wind: windData,
		};
	};

	const filterDataForNext10Days = (data) => {
		return data;
		// Filter data for the next 10 days logic here
		// TODO data format
		// Date
		// Day of the week
		// Temp.
		// Precip.
		// Wind
		// Rating
	};

	const rateEachDay = (data) => {
		return data;
		// TODO Pass sport type as well
		// Rating logic based on sport type here
	};

	const fetchDataAndProcess = async () => {
		const rawData = await fetchDataForNextTwoMonths();
		const filteredData = filterDataForNext10Days(rawData);
		const ratedData = rateEachDay(filteredData);
		return ratedData;
	};

	return {
		fetchDataAndProcess,
	};
};

const fetchDataForNextTwoMonths = async (sunResource, sunRest, tempResource, tempRest, windResource, windRest) => {
	const currentDate = new Date();
	const currentYear = 2021; // You may want to use currentDate.getFullYear() for dynamic current year
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

	// Make API requests for sunshine, temperature, and wind
	const sunshineData = sunResource ? await sunResource.get(`/rest/${sunRest}?q=${JSON.stringify(restQuery)}`) : null;
	const temperatureData = tempResource ? await tempResource.get(`/rest/${tempRest}?q=${JSON.stringify(restQuery)}`) : null;
	const windData = windResource ? await windResource.get(`/rest/${windRest}?q=${JSON.stringify(restQuery)}`) : null;

	return {
		sunshine: sunshineData,
		temperature: temperatureData,
		wind: windData,
	};
};

export default fetchDataForNextTwoMonths;

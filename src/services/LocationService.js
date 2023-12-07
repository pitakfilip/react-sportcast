import json from '../assets/cityStations.json';

export const LocationService = {
	getCitiesMap: () => {
		try {
			const entries = [];
			Object.keys(json).forEach((key) => {
				const station = json[key];
				if (station) {
					entries.push({ name: key, weatherStation: station });
				}
			});

			return entries;
		} catch (error) {
			console.error('Error getting citites:', error);
			throw error;
		}
	},
	getCities: () => {
		try {
			return Object.keys(json);
		} catch (error) {
			console.error('Error getting citites:', error);
			throw error;
		}
	},
	getAutocompleteEntries: () => {
		try {
			return Object.keys(json);
		} catch (error) {
			console.error('Error getting citites:', error);
			throw error;
		}
	},
};

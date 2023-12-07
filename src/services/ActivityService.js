import activities from '../assets/activities.json';
import {getLang} from './LanguageService';

export const ActivityService = {
	getAutocompleteEntries: () => {
		try {
			const entries = [];
			Object.keys(activities).forEach((key) => {
				entries.push(key);

				// const label = activities[key].label[currentLang];
				// if (label) {
				//     entries.push(key);
				// }
			});

			return entries;
		} catch (error) {
			console.error('Error getting activities:', error);
			throw error;
		}
	},
	getLabel: (key) => {
		const currentLang = getLang();
		if (activities[key]) {
			const label = activities[key]?.label[currentLang];
			return label ? label : key;
		}
		return key;
	},
	getActivityPreset: (key) => {
		if (key === null || key === undefined) {
			return null;
		}

		const vals = activities[key];
		return {
			temperatureFrom: vals.temperature.from,
			temperatureTo: vals.temperature.to,
			precipitation: vals.precipitation.to,
			windSpeedFrom: vals.wind.from,
			windSpeedTo: vals.wind.to
		}
	}
};

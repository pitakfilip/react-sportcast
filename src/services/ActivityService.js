import activities from '../assets/activities.json';
import {getLang} from './LanguageService';

export const ActivityService = {
	getAutocompleteEntries: () => {
		try {
			const entries = [];
			Object.keys(activities).forEach(key => {
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
	getLabel: (key: String) => {
		const currentLang = getLang();
		const label = activities[key].label[currentLang];
		return (label) ? label : key;
	}
}


export const storeJson = (key: String, jsonObj: any) => {
	localStorage.setItem(key, JSON.stringify(jsonObj));
}

export const loadJson = (key: String) => {
	const data = localStorage.getItem(key);
	if (data) {
		return JSON.parse(data);
	}
	return null;
}

export const storeValue = (key: String, value: String) => {
	localStorage.setItem(key, value);
}

export const loadValue = (key: String) => {
	localStorage.getItem(key);
}
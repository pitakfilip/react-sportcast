export const storeJson = (key, jsonObj) => {
	localStorage.setItem(key, JSON.stringify(jsonObj));
};

export const loadJson = (key) => {
	const data = localStorage.getItem(key);
	if (data) {
		return JSON.parse(data);
	}
	return null;
};

export const storeValue = (key, value) => {
	localStorage.setItem(key, value);
};

export const loadValue = (key) => {
	localStorage.getItem(key);
};

export const unsetKey = (key) => {
	localStorage.removeItem(key);
}
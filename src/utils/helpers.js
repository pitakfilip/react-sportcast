import { useMemo, useEffect, useState, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import { useAuth0 } from '../react-auth0-spa';

export const useType = () => {
	const { search } = useLocation();
	const type = useMemo(() => {
		return new URLSearchParams(search).get('type');
	}, [search]);
	return type;
};

export const useCustomData = (team) => {
	const { customDataApi, updateData } = useAuth0();
	const getCustomData = async (id) => customDataApi.get(`/rest/${team || 'ucitele'}${id ? `?q={"_id":"${id}"}` : ''}`);
	return [getCustomData, updateData(team)];
};

export const useRest = (type) => {
	const { apiSun, apiTemp, apiAir, apiEnergy } = useAuth0();
	const [{ resource, rest }, setRestApi] = useState({});
	const typeMapper = useCallback(
		(resourceType) => {
			const apiTypes = {
				sunshine: {
					resource: apiSun,
					rest: 'sunshine',
				},
				snow: {
					resource: apiSun,
					rest: 'snow',
				},
				precipitation: {
					resource: apiSun,
					rest: 'precipitation',
				},
				speed: {
					resource: apiAir,
					rest: 'wind-speed',
				},
				pressure: {
					resource: apiAir,
					rest: 'air-pressure',
				},
				moist: {
					resource: apiAir,
					rest: 'air-moist',
				},
				'temp-avg': {
					resource: apiTemp,
					rest: 'temp-avg',
				},
				'temp-min': {
					resource: apiTemp,
					rest: 'temp-min',
				},
				'temp-max': {
					resource: apiTemp,
					rest: 'temp-max',
				},
				energy: {
					resource: apiEnergy,
					rest: 'price-per-country',
				},
			};
			return apiTypes[resourceType] || apiTypes.sunshine;
		},
		[type]
	);

	useEffect(() => {
		setRestApi(typeMapper(type));
	}, [type]);

	return [{ resource, rest }, setRestApi];
};

import React from 'react';
import {
	Autocomplete,
	Button,
	Checkbox,
	FormControlLabel,
	FormHelperText,
	Grid,
	IconButton,
	InputAdornment,
	TextField,
	Tooltip
} from '@mui/material';
import {makeStyles} from '@mui/styles';
import {ActivityService} from '../services/ActivityService';
import {storeJson, loadJson, unsetKey} from '../services/StorageService';
import PropTypes from 'prop-types';
import {Clear, NearMe, Search, Tune} from '@mui/icons-material';
import {LocationService} from '../services/LocationService';
import {translate} from '../services/LanguageService';
import {useNavigate} from 'react-router-dom';

const useStyles = makeStyles((theme) => {
	return {
		root: {
			display: 'block',
			width: '100%',
		},
		title: {
			fontFamily: 'Tahoma, Verdana, Segoe, sans-serif',
			fontStyle: 'normal',
			fontWeight: '500',
			fontSize: '2.5em',
		},
		advancedWrapper: {
			width: '100%',
		},
		advancedRoot: {
			padding: '1.3em 0',
			borderTop: '2px solid #0770DA',
			width: '100%',
		},
		advCriteriumRoot: {
			fontSize: '1.2em',
			display: 'flex',
			alignItems: 'center',
			gap: '1em',
			margin: '0 1em',
		},
		advCriteriumFields: {
			display: 'flex',
			justifyContent: 'flex-end',
			alignItems: 'center',
			width: '50%',
			gap: '0.5em',
			'& input': {
				backgroundColor: 'white',
				// border: '1px solid #0770DA'
			},
		},
		// single field
		advCriteriumField: {
			display: 'flex',
			justifyContent: 'flex-end',
			alignItems: 'center',
			width: '30%',
			gap: '0.5em',
			'& input': {
				backgroundColor: 'white',
				// border: '1px solid #0770DA'
			},
		},
	};
});

const initValues = () => {
	return {
		activity: '',
		location: '',
		temperatureFrom: '',
		temperatureTo: '',
		precipitation: '',
		windSpeedFrom: '',
		windSpeedTo: '',
	};
};
const initErrors = () => {
	return {
		activity: '',
		location: '',
		temperature: '',
		precipitation: '',
		wind: '',
	};
};

const SearchForm = ({simplified, onFormSubmit}) => {
	const navigate = useNavigate();
	const classes = useStyles();
	const activityOptions = ActivityService.getAutocompleteEntries();
	const locationOptions = LocationService.getCities();

	const storageKey = '_search_data';
	const savedValues = loadJson(storageKey);
	const [values, setValues] = React.useState(savedValues ? savedValues : initValues());
	const [errors, setErrors] = React.useState(initErrors());
	const [toggledAdvanced, setToggledAdvanced] = React.useState(false);
	const [lowPrecipitation, setLowPrecipitation] = React.useState(false);

	const handleValueChange = (property, value) => {
		let updatedValues;
		if (property === 'activity') {
			const preset = ActivityService.getActivityPreset(value);
			if (preset !== null) {
				updatedValues = {
					...values,
					activity: value,
					temperatureFrom: preset.temperatureFrom,
					temperatureTo: preset.temperatureTo,
					precipitation: preset.precipitation,
					windSpeedFrom: preset.windSpeedFrom,
					windSpeedTo: preset.windSpeedTo,
				};
			} else {
				updatedValues = {...values, [property]: value};
			}
		} else {
			updatedValues = {...values, [property]: value};
		}
		setValues(updatedValues);
		storeJson(storageKey, updatedValues);
	};
	const handleNumberChange = (e, property) => {
		// eslint-disable-next-line
		const {name, value} = e.target;
		handleValueChange(property, value);
	};
	const toggleAdvanced = (e) => {
		setToggledAdvanced((prevState) => !prevState);
	};
	const toggleLowPrecipitation = (e, value) => {
		setLowPrecipitation((prevState) => !prevState);
		handleValueChange('precipitation', value ? 6 : '');
	};
	const handleClear = () => {
		setValues(initValues());
		unsetKey(storageKey);
	};
	const validateValues = () => {
		const location = values.location !== '' ? '' : translate('locationErr');
		let activity, temperature, precipitation, wind;

		if (!toggledAdvanced) {
			activity = values.activity !== '' && activityOptions.includes(values.activity) ? '' : translate('activityErr');
			temperature = '';
			precipitation = '';
			wind = '';
		} else {
			activity = '';
			temperature = values.temperatureFrom !== '' || values.temperatureTo !== '' ? '' : 'I NEED ATLEAST SMTH';
			precipitation = values.precipitation !== '' ? '' : 'I NEED ATLEAST SMTH';
			wind = values.windSpeedFrom !== '' || values.windSpeedTo !== '' ? '' : 'I NEED ATLEAST SMTH';
		}

		setErrors({
			activity: activity,
			location: location,
			temperature: temperature,
			precipitation: precipitation,
			wind: wind,
		});
		return [activity, location, temperature, precipitation, wind];
	};

	const handleSubmit = (event) => {
		event.preventDefault(); // Prevent default form submission behavior
		const errs = validateValues();
		if (errs.every((val) => val === '')) {
			if (onFormSubmit) {
				onFormSubmit(values); // Use the provided submit handler if available
			} else {
				navigate('/result', {state: {searchValues: values}}); // Default behavior
			}
		}
	};

	return (
		<div className={classes.root}>
			<form onSubmit={handleSubmit}>
				<Grid container spacing={3}>
					{/* Show title 'Discover Your Perfect Activity Day' */}
					{(() => {
						if (!simplified) {
							return (
								<Grid item>
									<div className={classes.title}>
										<span>
											<Search fontSize={'large'}/>
										</span>
										<span>{translate('discoverPerfectDay')}</span>
									</div>
								</Grid>
							);
						}
					})()}

					{/* SIMPLE SEARCH ROW */}
					<Grid item container spacing={10}>
						<Grid item xs={6}>
							<Autocomplete
								value={values.activity}
								onChange={(e, newValue) => handleValueChange('activity', newValue)}
								options={activityOptions}
								getOptionLabel={(option) => ActivityService.getLabel(option)}
								renderInput={(params) => (
									<TextField {...params} error={!!errors.activity} helperText={errors.activity}
														 label={translate('activity')}/>
								)}
							/>
						</Grid>

						<Grid item xs={6}>
							<Autocomplete
								value={values.location}
								onChange={(e, newValue) => handleValueChange('location', newValue)}
								options={locationOptions}
								renderInput={(params) => (
									<TextField
										{...params}
										error={!!errors.location}
										helperText={errors.location}
										label={translate('location')}
										InputProps={{
											...params.InputProps,
											startAdornment: (
												<InputAdornment position="start">
													<IconButton onClick={(e) => handleValueChange('location', 'Brno')}>
														<NearMe/>
													</IconButton>
												</InputAdornment>
											),
										}}
									/>
								)}
							/>
						</Grid>
					</Grid>

					{/* ADVANCED SEARCH SECTION */}
					{(() => {
						if (toggledAdvanced) {
							return (
								<Grid item className={classes.advancedWrapper}>
									<div className={classes.advancedRoot}>
										<Grid container justifyContent="space-between" spacing={4}>
											<Grid item lg={6} xl={4} justifyContent="space-between">
												<section className={classes.advCriteriumRoot} style={{justifyContent: 'center'}}>
													<span>{translate('temperature')}</span>
													<div className={classes.advCriteriumFields}>
														<TextField
															value={values.temperatureFrom}
															onChange={(e) => handleNumberChange(e, 'temperatureFrom')}
															type="number"
															hiddenLabel
															variant="filled"
															size="small"
															style={{width: '35%'}}
															error={!!errors.temperature}
														/>
														<span>{'-'}</span>
														<TextField
															value={values.temperatureTo}
															onChange={(e) => handleNumberChange(e, 'temperatureTo')}
															type="number"
															hiddenLabel
															variant="filled"
															size="small"
															style={{width: '35%'}}
															error={!!errors.temperature}
														/>
													</div>
													<span>{'C°'}</span>
												</section>
											</Grid>

											<Grid item lg={6} xl={4}>
												<section className={classes.advCriteriumRoot} style={{justifyContent: 'center'}}>
													<span>{translate('precipitation')}</span>
													<div className={classes.advCriteriumField}>
														<span>{'<'}</span>
														<TextField
															value={values.precipitation}
															onChange={(e) => handleNumberChange(e, 'precipitation')}
															type="number"
															hiddenLabel
															variant="filled"
															size="small"
															style={{width: '60%'}}
															error={!!errors.precipitation}
														/>
													</div>
													<span>{'mm'}</span>
												</section>
											</Grid>

											<Grid item lg={6} xl={4} justifyContent="space-between">
												<section className={classes.advCriteriumRoot} style={{justifyContent: 'center'}}>
													<span>{translate('windSpeed')}</span>
													<div className={classes.advCriteriumFields}>
														<TextField
															value={values.windSpeedFrom}
															onChange={(e) => handleNumberChange(e, 'windSpeedFrom')}
															type="number"
															hiddenLabel
															variant="filled"
															size="small"
															style={{width: '35%'}}
															error={!!errors.wind}
														/>
														<span>{'-'}</span>
														<TextField
															value={values.windSpeedTo}
															onChange={(e) => handleNumberChange(e, 'windSpeedTo')}
															type="number"
															hiddenLabel
															variant="filled"
															size="small"
															style={{width: '35%'}}
															error={!!errors.wind}
														/>
													</div>
													<span>{'m/s'}</span>
												</section>
											</Grid>
										</Grid>
									</div>
									{(() => {
										if (errors.temperature || errors.precipitation || errors.wind) {
											return (
												<div style={{marginLeft: '1.5em'}}>
													<FormHelperText error style={{fontSize: '1rem'}}>
														{translate('advancedErr')}
													</FormHelperText>
												</div>
											);
										}
									})()}
								</Grid>
							);
						}
					})()}

					{/* BUTTON ROW: TOGGLE ADVANCED, TOGGLE LOW PRECIPITATION, SUBMIT */}
					<Grid item container justifyContent="space-between" alignItems="center">
						<Grid item xs={4}>
							<Button variant="outlined" startIcon={<Tune/>} onClick={toggleAdvanced}>
								{toggledAdvanced ? translate('simpleSearch') : translate('advancedSearch')}
							</Button>
						</Grid>

						<Grid item xs={4}>
							<Grid container justifyContent="flex-end" alignItems="center" spacing={4}>
								<Grid item alignItems="flex-end">
									<Tooltip
										title={translate('lowPrecipitationTooltip')}
										placement="bottom"
									>
										<FormControlLabel
											checked={lowPrecipitation}
											onChange={toggleLowPrecipitation}
											control={<Checkbox/>}
											label={translate('lowPrecipitation')}
										/>
									</Tooltip>
								</Grid>

								<Grid item>
									<Button variant="contained" startIcon={<Clear/>} onClick={handleClear} style={{marginRight: '1em'}}>
										{translate('clear')}
									</Button>
									<Button variant="contained" startIcon={<Search/>} onClick={handleSubmit}>
										{translate('search')}
									</Button>
								</Grid>
							</Grid>
						</Grid>
					</Grid>
				</Grid>
			</form>
		</div>
	);
};

SearchForm.propTypes = {
	simplified: PropTypes.bool,
	onFormSubmit: PropTypes.any,
};

export default SearchForm;

import React from 'react';
import {Autocomplete, Button, Checkbox, Divider, FormControlLabel, Grid, TextField} from '@mui/material';
import {makeStyles} from '@mui/styles';
import {ActivityService} from '../services/ActivityService';
import {loadJson, storeJson} from '../services/LocalStorageService';
import PropTypes from 'prop-types';
import {Search, Tune} from '@mui/icons-material';
import {CityService} from '../services/CityService';
import { translate } from '../services/LanguageService';

const useStyles = makeStyles((theme) => {
	return {
		root: {
			display: 'block', width: '100%'
		}, title: {
			fontSize: '2.5em'
		}, advancedRoot: {
			margin: '1em 0'
		}
	};
});


const SearchForm = ({showTitle}) => {
	const storageKey = '_search';
	const classes = useStyles();

	const emptyState = {
		activity: null, location: null, temperature: {
			from: null, to: null
		}, wind: {
			from: null, to: null
		}, rain: {
			from: null, to: null
		}, lowRain: false
	};
	const savedState = loadJson(storageKey)
	const [value, setValue] = React.useState((savedState ? savedState : emptyState));

	const activityChange = (e, val) => {
		setValue((prevState) => ({...prevState, activity: val}));
		storeJson(storageKey, {...value, activity: val});
	}
	const locationChange = (e, val) => {
		setValue((prevState) => ({...prevState, location: val}));
		storeJson(storageKey, {...value, location: val});
	}

	const lowRainChange = (e, val) => {
		setValue((prevState) => ({...prevState, lowRain: val}));
		storeJson(storageKey, {...value, lowRain: val});
	}

	const [tglAdv, setTglAdv] = React.useState(false);
	const toggleAdvanced = (e) => {
		setTglAdv((prevState) => !prevState);
	}

	const handleSubmit = (e) => {
		console.log('SUBMIT!');
	}

	console.log('show title: ' + showTitle);
	return (<div className={classes.root}>
		<Grid container spacing={3}>
			{/* Show title 'Discover Your Perfect Activity Day' */}
			{(() => {
				if (showTitle || true) {
					return (<Grid item>
						<div className={classes.title}>
							<span><Search fontSize={'large'}/></span>
							<span>{translate('discoverPerfectDay')}</span>
						</div>
					</Grid>)
				}
			})()}

			<Grid item container spacing={10}>
				<Grid item xs={6}>
					{/* ACTIVITY FIELD */}
					<Autocomplete
						value={value.activity}
						onChange={activityChange}
						options={ActivityService.getAutocompleteEntries()}
						getOptionLabel={(option) => ActivityService.getLabel(option)}
						isOptionEqualToValue={(option, value) => option.key === value.key}
						renderInput={(params) => <TextField {...params} label={translate('activity')}/>}
					/>
				</Grid>

				{/* LOCATION FIELD */}
				<Grid item xs={6}>
					<Autocomplete
						value={value.location}
						onChange={locationChange}
						options={CityService.getAutocompleteEntries()}
						renderInput={(params) => <TextField {...params} label="Location"/>}
					/>
				</Grid>
			</Grid>

			{(() => {
				if (tglAdv) {
					return (<Grid container item>
						<Divider/>
						<p>DO PICE TU JOJ</p>
					</Grid>)
				}
			})()}


			<Grid item container justifyContent="space-between" alignItems="center">
				<Grid item xs={4}>
					<Button variant="outlined"
									startIcon={<Tune/>}
									onClick={toggleAdvanced}
					>
						{tglAdv ? 'Simple Search' : 'Advanced Search'}
					</Button>
				</Grid>
				<Grid item xs={4}>
					<Grid container justifyContent="flex-end" alignItems="center" spacing={4}>
						<Grid item alignItems="flex-end">
							<FormControlLabel
								checked={value.lowRain}
								onChange={lowRainChange}
								control={<Checkbox/>}
								label="Low precipitation"
							/>
						</Grid>

						<Grid item>
							<Button variant="contained"
											startIcon={<Search/>}
											onClick={handleSubmit}
							>
								Search
							</Button>
						</Grid>
					</Grid>
				</Grid>
			</Grid>
		</Grid>


	</div>);
};

SearchForm.propTypes = {
	showTitle: PropTypes.bool,
};


export default SearchForm;

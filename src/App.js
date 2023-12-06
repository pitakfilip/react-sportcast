import React from 'react';
import {BrowserRouter, Route, Routes} from 'react-router-dom';

import PrivateRoute from './components/PrivateRoute';
import {applyMiddleware, combineReducers, legacy_createStore as createStore} from 'redux';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';

import LandingPage from './views/LandingPage';
import SearchPage from './views/SearchPage';
import ResultPage from './views/ResultPage';
import {createTheme, CssBaseline, ThemeProvider} from '@mui/material';
import TranslationTestPage from './views/TranslationTestPage';

const exampleReducer = (state = {}, action) => {
	return (
		{
			foo: {
				...state,
				...action.payload,
			},
			DATA_FETCHED: {
				...state,
				data: action.payload,
			},
		}[action.type] || state
	);
};

const store = createStore(combineReducers({exampleReducer}), applyMiddleware(thunk));
const globalTheme = createTheme();

const App = () => {
	// TODO uncomment when we need to enable auth0
	// const { loading } = useAuth0();
	//
	// if (loading) {
	//   return <Loading />;
	// }

	return (
		<div>
			<Provider store={store}>
				<BrowserRouter>
					<ThemeProvider theme={globalTheme}>
						<CssBaseline/>
						<main>
							<Routes>
								<Route index path="/" element={<LandingPage/>}/>
								<Route path="/search" element={<PrivateRoute component={SearchPage}/>}/>
								<Route path="/result" element={<PrivateRoute component={ResultPage}/>}/>
                <Route path="/translation" element={<PrivateRoute component={TranslationTestPage}/>}/>
							</Routes>
						</main>
					</ThemeProvider>
				</BrowserRouter>
			</Provider>
		</div>
	);
};

export default App;

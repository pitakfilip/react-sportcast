import React from 'react';
import {BrowserRouter, Route, Routes} from 'react-router-dom';

import PrivateRoute from './components/PrivateRoute';
// import {useAuth0} from './react-auth0-spa';
import CssBaseline from '@material-ui/core/CssBaseline';
// import Loading from './components/Loading';
import {legacy_createStore as createStore, applyMiddleware, combineReducers} from 'redux';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';

import LandingPage from './views/LandingPage';
import SearchPage from './views/SearchPage';
import ResultPage from './views/ResultPage';

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
                    <CssBaseline/>
                    <main>
                        <Routes>
                            <Route index path="/" element={<LandingPage/>}/>
                            <Route path="/search" element={<PrivateRoute component={SearchPage}/>}/>
                            <Route path="/result" element={<PrivateRoute component={ResultPage}/>}/>
                        </Routes>
                    </main>
                </BrowserRouter>
            </Provider>
        </div>
    );
};

export default App;

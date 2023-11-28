import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import PrivateRoute from './components/PrivateRoute';
import { useAuth0 } from './react-auth0-spa';
import { makeStyles } from '@material-ui/core/styles';
//import CssBaseline from '@material-ui/core/CssBaseline'; //uncomment if you want to use material UI
import Header from './components/Header';
import HomePage from './views/HomePage';
import LoginPage from './views/LoginPage';
import Loading from './components/Loading';

import { legacy_createStore as createStore, applyMiddleware, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

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

const store = createStore(combineReducers({ exampleReducer }), applyMiddleware(thunk));

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    background: theme.palette.background.default,
    ...theme.typography.body1,
  },
  content: {
    display: 'block',
    height: '95vh',
    width: '80vw',
    margin: '2.5vh 0',
    background: 'pink',
    overflow: 'auto',
  },
}));

const App = () => {
  const { loading } = useAuth0();
  const classes = useStyles();

  if (loading) {
    return <Loading />;
  }

  return (
    <div className={classes.root}>
      <Provider store={store}>
        <BrowserRouter>
          {/* <CssBaseline />  */} {/* uncomment if you want to use material UI */}
          <main className={classes.content}>
            <Header/>
            <Routes>
              <Route path="/home-page" element={<PrivateRoute component={HomePage} />} />
              <Route index path="/" element={<LoginPage />} />
            </Routes>
          </main>
        </BrowserRouter>
      </Provider>
    </div>
  );
};

export default App;

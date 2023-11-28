import React, { useState, useEffect, useContext } from 'react';
import createAuth0Client from '@auth0/auth0-spa-js';
import PropTypes from 'prop-types';
import { createInstance } from './utils/api';

import authConfig from './auth_config.json';

const DEFAULT_REDIRECT_CALLBACK = () => window.history.replaceState({}, document.title, window.location.pathname);

export const Auth0Context = React.createContext();
export const useAuth0 = () => useContext(Auth0Context);
export const Auth0Provider = ({ children, onRedirectCallback = DEFAULT_REDIRECT_CALLBACK, ...initOptions }) => {
  const [isAuthenticated, setIsAuthenticated] = useState();
  const [user, setUser] = useState();
  const [auth0Client, setAuth0] = useState();
  const [loading, setLoading] = useState(true);
  const [popupOpen, setPopupOpen] = useState(false);
  const [{ apiSun, apiTemp, apiAir, apiEnergy, grassApi, customDataApi }, setAllApis] = useState({
    apiSun: {},
    apiTemp: {},
    apiAir: {},
    apiEnergy: {},
    grassApi: {},
    customDataApi: {},
  });

  useEffect(() => {
    if (user) {
      const { sun, air, temp, energy, grass, customData } = user;
      setAllApis({
        apiSun: createInstance(sun),
        apiTemp: createInstance(temp),
        apiAir: createInstance(air),
        apiEnergy: createInstance(energy),
        grassApi: createInstance(grass),
        customDataApi: createInstance(customData),
      });
    }
  }, [user]);

  useEffect(() => {
    const initAuth0 = async () => {
      const auth0FromHook = await createAuth0Client(initOptions);
      setAuth0(auth0FromHook);

      if (window.location.search.includes('code=')) {
        const { appState } = await auth0FromHook.handleRedirectCallback();
        onRedirectCallback(appState);
      }

      const isAuthenticated = await auth0FromHook.isAuthenticated();

      setIsAuthenticated(isAuthenticated);

      if (isAuthenticated) {
        const user = await auth0FromHook.getUser();
        setUser(user);
      }

      setLoading(false);
    };
    initAuth0();
    // eslint-disable-next-line
  }, []);

  const loginWithPopup = async (params = {}) => {
    setPopupOpen(true);
    try {
      await auth0Client.loginWithPopup(params);
    } catch (error) {
      console.error(error);
    } finally {
      setPopupOpen(false);
    }
    const user = await auth0Client.getUser();
    auth0Client.crossOriginVerification();
    setUser(user);
    setIsAuthenticated(true);
  };

  const handleRedirectCallback = async () => {
    setLoading(true);
    await auth0Client.handleRedirectCallback();
    const user = await auth0Client.getUser();
    setLoading(false);
    setIsAuthenticated(true);
    setUser(user);
  };

  /**
   * Update user data in Auth0 application.
   * @param {*} userData data to be updated.
   * @example
   *    updateProfile({ user_metadata: { name: 'something' } }) // updates user metadata
   * @see https://auth0.com/docs/api/management/v2#!/Users/patch_users_by_id
   */
  const updateProfile = async (userData) => {
    if (isAuthenticated) {
      const [{ _id, ...body }] = await apiSun.get('/rest/auth');
      const { access_token } = await (
        await fetch(`https://${authConfig.domain}/oauth/token`, {
          method: 'POST',
          headers: { 'content-type': 'application/json' },
          body: JSON.stringify(body),
        })
      ).json();
      return (
        await fetch(`https://${authConfig.domain}/api/v2/users/${user.sub}`, {
          method: 'PATCH',
          headers: { Authorization: `Bearer ${access_token}`, 'Content-Type': 'application/json' },
          body: JSON.stringify(userData),
        })
      ).json();
    }
  };

  const updateData = (team) => async (customData, id) =>
    customDataApi.post(`/rest/${team || 'ucitele'}`, { data: customData, ...(id && { _id: id }) });

  return (
    <Auth0Context.Provider
      value={{
        isAuthenticated,
        user,
        apiSun,
        apiAir,
        apiTemp,
        apiEnergy,
        grassApi,
        customDataApi,
        loading,
        popupOpen,
        loginWithPopup,
        handleRedirectCallback,
        updateProfile,
        setUser,
        updateData,
        getIdTokenClaims: (...p) => auth0Client.getIdTokenClaims(...p),
        loginWithRedirect: (...p) => auth0Client.loginWithRedirect(...p),
        getTokenSilently: (...p) => auth0Client.getTokenSilently(...p),
        getTokenWithPopup: (...p) => auth0Client.getTokenWithPopup(...p),
        logout: (...p) => auth0Client.logout(...p),
      }}
    >
      {children}
    </Auth0Context.Provider>
  );
};

Auth0Provider.propTypes = {
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.arrayOf(PropTypes.node)]).isRequired,
  onRedirectCallback: PropTypes.func.isRequired,
};

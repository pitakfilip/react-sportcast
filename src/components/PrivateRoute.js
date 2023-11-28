import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useLocation } from 'react-router-dom';
import { useAuth0 } from '../react-auth0-spa';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { isAuthenticated, loginWithRedirect } = useAuth0();
  const location = useLocation();

  useEffect(() => {
    const fn = async () => {
      if (!isAuthenticated) {
        await loginWithRedirect({
          appState: { targetUrl: location.pathname },
        });
      }
    };
    fn();
  }, [isAuthenticated, loginWithRedirect, location]);

  return isAuthenticated === true ? <Component {...rest} /> : null;
};

PrivateRoute.propTypes = {
  component: PropTypes.oneOfType([PropTypes.element, PropTypes.func]).isRequired,
};

export default PrivateRoute;

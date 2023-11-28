import React, { useEffect } from 'react';
import { useAuth0 } from '../react-auth0-spa';
import { useNavigate } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => {
  console.log(theme, 'this is theme!');
  return {
    root: {
      display: 'block',
    },
    button: {
      background: theme.palette.info.light,
      borderRadius: theme.shape.borderRadius,
      outline: 0,
      border: 0,
      boxShadow: theme.shadows[1],
      color: theme.palette.common.white,
      fontWeight: theme.typography.fontWeightMedium,
      textDecoration: 'none',
      // ...theme.mixins.button,
    },
    link: {
      color: theme.palette.common.white,
      '&:hover': {
        color: theme.palette.common.white,
        textDecoration: 'none',
      },
    },
  };
});

const LandingPage = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const { user } = useAuth0();
  useEffect(() => {
    if (user) {
      navigate('/home-page');
    }
  }, [user]);

  return (
    <div className={classes.root}>
      <h1>Landing page</h1>
      <button className={classes.button}>
        <a className={classes.link} href="/home-page">
          To home page
        </a>
      </button>
    </div>
  );
};

export default LandingPage;

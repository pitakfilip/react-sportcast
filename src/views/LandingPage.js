import React, { useEffect } from 'react';
import { useAuth0 } from '../react-auth0-spa';
import { useNavigate } from 'react-router-dom';
import { makeStyles } from '@mui/styles';
import background from '../assets/jumping-rope.jpg';
import Introduction from '../components/introduction/Introduction';
import logo from '../components/logo/sportcast-logo.png';
import { translate } from '../services/LanguageService';

const useStyles = makeStyles((theme) => {
  return {
    root: {
      height: '100vh',
      width: '100vw',
      minHeight: 'fit-content',
      display: 'flex',
    },
    logoSection: {
      width: '45%',
      height: '100%',
      flex: '3',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'column',
      backgroundImage: `url(${background})`,
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center center',
    },
    redirectSection: {
      width: '55%',
      height: '100%',
      flex: '4',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
    identity: {
      display: 'flex',
      justifyContent: 'center',
      flexDirection: 'column',
      alignItems: 'center',
      fontFamily: 'Arial, sans-serif',
      fontSize: '1vw',
      flex: '1',
    },
    above: {
      flex: '1',
    },
    under: {
      flex: '4',
    },
  };
});

const LandingPage = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const { user } = useAuth0();

  useEffect(() => {
    if (user) {
      navigate('/search');
    }
  }, [user]);

  return (
    <div className={classes.root}>
      <section className={classes.logoSection} style={{ backgroundColor: 'lightgray' }}>
        <div className={classes.above} />
        <div className={classes.identity}>
          <img src={logo} width={'40%'} height={'auto'} alt={'SportCast Logo'} />
          <p>{translate('whereYourFuture')}</p>
        </div>
        <div className={classes.under} />
      </section>

      <section className={classes.redirectSection}>
        <Introduction />
      </section>
    </div>
  );
};

export default LandingPage;

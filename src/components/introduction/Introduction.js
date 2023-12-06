import React from 'react';
import { makeStyles } from '@mui/styles';
import { Place, Search, Settings, Tune } from '@mui/icons-material';
import { translate } from '../../services/LanguageService';

const useStyles = makeStyles((theme) => {
  return {
    root: {
      height: '100%',
    },
    wrapper: {
      height: '100%',
      width: '100%',
      display: 'flex',
      justifyContent: 'center',
    },
    content: {
      fontFamily: 'Arial, sans-serif',
      fontSize: '0.8vw',
      width: '50%',
      textAlign: 'justify',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
    },
  };
});

const Introduction = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.wrapper}>
        <div className={classes.content}>
          <section>
            <p>{translate('introElevate')}</p>
            <p>{translate('introWhether')}</p>
            <p>{translate('introDont')}</p>
          </section>

          <section>
            {/*<svg width="450px" height="300px" xmlns="http://www.w3.org/2000/svg">*/}
            {/*    <g id="Layer_1">*/}
            {/*        <title>Layer 1</title>*/}
            {/*        <path stroke="#000" id="svg_3" d="m2.50002,3l333.74983,0l111.25014,146.99968l-111.25014,*/}
            {/*            147.00033l-333.74983,0l111.25011,-147.00033l-111.25011,-146.99968z" fill="blue"/>*/}
            {/*    </g>*/}
            {/*</svg>*/}
            <Search />
            <Settings />
            <Tune />
            <Place />
          </section>
        </div>
      </div>
    </div>
  );
};

export default Introduction;

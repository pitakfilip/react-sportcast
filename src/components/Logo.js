import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

const useStyles = makeStyles((theme) => {
    console.log(theme, 'this is theme!');
    return {
        root: {
            display:'inline',
            fontSize: `${1.7 * sizeScale}em`,
            fontFamily: 'Arial Black, sans-serif;',
            paddingTop: `${0.25 * sizeScale}em`,
            paddingBottom: `${0.25 * sizeScale}em`
        },
        sport: {
            display: 'inline',
            color: 'white',
            background: '#0770DA',
            paddingLeft: `${0.2 * sizeScale}em`,
            paddingRight: `${0.2 * sizeScale}em`
        },
    };
});

let sizeScale = 1;
const Logo = ({ scale }) => {

    sizeScale = scale;
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <div className={classes.sport}>SPORT</div>CAST
        </div>
    );
};

Logo.propTypes = {
    scale: PropTypes.number,
};
export default Logo;
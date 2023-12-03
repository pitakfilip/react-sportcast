// TODO REMOVE when done
/* eslint-disable */

import React, { useEffect } from 'react';
import { useAuth0 } from '../react-auth0-spa';
import { useNavigate } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => {
    console.log(theme, 'this is theme!');
    return {
        root: {
            display: 'block',
            background: 'pink'
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
    // TODO uncomment when done
    // useEffect(() => {
    //     if (user) {
    //         navigate('/search');
    //     }
    // }, [user]);

    return (
        <div className={classes.root}>
            
            <p>JOZKO MRKVICKA</p>

        </div>
    );
};

export default LandingPage;

import React from 'react';
// import { useAuth0 } from '../react-auth0-spa';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => {
    console.log(theme, 'this is theme!');
    return {
        root: {
            display: 'block',
            background: 'pink'
        }
    };
});

const ResultPage = () => {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            
            <p>RESULT PAGE</p>

        </div>
    );
};

export default ResultPage;

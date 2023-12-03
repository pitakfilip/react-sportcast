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

const SearchPage = () => {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            
            <p>SEARCH PAGE</p>

        </div>
    );
};

export default SearchPage;

import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Logo from '../logo/Logo';
import LanguagePicker from './LanguagePicker';
import Account from './Account';
import { useNavigate } from 'react-router-dom';

const useStyles = makeStyles((theme) => {
    console.log(theme, 'this is theme!');
    return {
        root: {
            marginBottom: '0.75em',
            paddingBottom: '0.75em',
            borderBottom: '1px solid black',
            width: '100%',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
        },
        rightSection: {
            display: 'inline-flex',
            alignItems: 'center',
            gap: '1em',
            height: 'max-content'
        },
    };
});

const Header = () => {
    const classes = useStyles();

    const navigate = useNavigate();
    const goHome = () => {
        navigate('/search');
    }

    return (
        <div className={classes.root}>
            <a onClick={goHome}><Logo scale={1.4}/></a>
            <section className={classes.rightSection}>
                <LanguagePicker/>
                <Account/>
            </section>
        </div>
        );
};
export default Header;

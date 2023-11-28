import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {Avatar} from '@material-ui/core';
import {Person} from '@material-ui/icons';
import Logo from './Logo';
import LanguagePicker from './LanguagePicker';

const useStyles = makeStyles((theme) => {
    console.log(theme, 'this is theme!');
    return {
        logo: {
            display:'inline',
            fontSize: '1.7em',
            fontFamily: 'Arial Black, sans-serif;',
        },
        sport: {
            display: 'inline',

            padding: '0.25em 0.2em'
        },
        blue: {
            color: 'white',
            background: '#0770DA'
        },
        rightSection: {
            float: 'right',
            display: 'inline-flex',
            alignItems: 'center',
        }
    };
});

const Header = () => {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <Logo scale={1.5}/>

            <div className={classes.rightSection}>
                <LanguagePicker/>
                <Avatar className={classes.blue}>
                    <Person/>
                </Avatar>
            </div>
        </div>
        );
};
export default Header;

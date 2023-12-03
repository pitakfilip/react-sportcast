import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {changeLang, getLang, Languages} from '../../services/LanguageService';
import {Menu, MenuItem} from '@material-ui/core';
import {ExpandMore} from '@material-ui/icons';

const useStyles = makeStyles((theme) => {
    console.log(theme, 'this is theme!');
    return {
        root: {
            fontSize: '1em'
        },
        button: {
            border: 'none',
            background: 'none',
        },
        buttonContent: {
            display: 'inline-flex',
            alignItems: 'center',
        },
        icon: {
            fontSize: '1.2em'
        }
    };
});

const LanguagePicker = () => {
    const classes = useStyles();
    let currLang = getLang();

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const setLang = (lang) => {
        changeLang(lang);
        currLang = lang;
        handleClose();
    }

    return (
        <div className={classes.root}>
            <button
                className={classes.button}
                aria-label='Change Language'
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
            >
                <div className={classes.buttonContent}>
                    <span>{currLang}</span>
                    <span><ExpandMore className={classes.icon}/></span>
                </div>
            </button>
            <Menu
                id='languages-menu'
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
                getContentAnchorEl={null}
            >
                {Languages.map( (option) => (
                    <MenuItem
                        key={option}
                        selected={option === currLang} 
                        onClick={() => setLang(option)}
                    >
                        {option}
                    </MenuItem>
                ))}
            </Menu>
        </div>
    );


};
export default LanguagePicker;

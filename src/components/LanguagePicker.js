import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {changeLang, getLang, Languages} from '../services/LanguageService';
import {Button, Menu, MenuItem} from '@material-ui/core';
import {ExpandMore} from '@material-ui/icons';

const useStyles = makeStyles((theme) => {
    console.log(theme, 'this is theme!');
    return {
        root: {

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

    const renderItems = () => {
        const items = [];
        for (let lang in Languages) {
            items.push(<MenuItem selected={lang === currLang} onClick={() => setLang(lang)}>{lang}</MenuItem>);
        }

        return items;
    };

    return (
        <div className={classes.root}>
            <Button
                id="demo-positioned-button"
                aria-controls={open ? 'demo-positioned-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
            >
                {currLang}<ExpandMore/>
            </Button>
            <Menu
                aria-labelledby="demo-positioned-button"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
            >
                {renderItems()}
            </Menu>
        </div>
    );


};
export default LanguagePicker;

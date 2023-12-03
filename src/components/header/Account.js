

import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import {Person} from '@material-ui/icons';
import {Avatar, Divider, ListItemIcon, ListItemText, Menu, MenuItem} from '@material-ui/core';
import { History, Logout, Settings } from '@mui/icons-material';

const useStyles = makeStyles((theme) => {
    console.log(theme, 'this is theme!');
    return {
        root: {},
        blue: {
            color: 'white',
            background: '#0770DA'
        }
    };
});

const Account = () => {
    const classes = useStyles();

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const openSettings = () => {
        handleClose();
    };
    const openHistory = () => {
        handleClose();
    };
    const logout = () => {
        handleClose();
    };

    return (
        <div className={classes.root}>
            <Avatar className={classes.blue}
                    aria-label="Account Settings"
                    aria-expanded={open ? 'true' : undefined}
                    onClick={handleClick}
            >
                <Person/>
            </Avatar>
            <Menu id='account-menu'
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                  }}
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  getContentAnchorEl={null}
            >
                <MenuItem onClick={openSettings}>
                    <ListItemIcon><Settings/></ListItemIcon>
                    <ListItemText>Settings</ListItemText>
                </MenuItem>
                <MenuItem onClick={openHistory}>
                    <ListItemIcon><History/></ListItemIcon>
                    <ListItemText>History</ListItemText>
                </MenuItem>
                <Divider/>
                <MenuItem onClick={logout}>
                    <ListItemIcon><Logout/></ListItemIcon>
                    <ListItemText>Logout</ListItemText>
                </MenuItem>
            </Menu>
        </div>
    );
}

Account.propTypes = {};

Account.defaultProps = {};

export default Account;

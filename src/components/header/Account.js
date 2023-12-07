import React from 'react';
import { Avatar, Divider, ListItemIcon, ListItemText, Menu, MenuItem } from '@mui/material';
import { History, Logout, Person, Settings } from '@mui/icons-material';

const Account = () => {
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
		<div>
			<Avatar sx={{ bgcolor: '#0770DA' }} aria-label="Account Settings" aria-expanded={open ? 'true' : undefined} onClick={handleClick}>
				<Person />
			</Avatar>
			<Menu
				id="account-menu"
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
			>
				<MenuItem onClick={openSettings}>
					<ListItemIcon>
						<Settings />
					</ListItemIcon>
					<ListItemText>Settings</ListItemText>
				</MenuItem>
				<MenuItem onClick={openHistory}>
					<ListItemIcon>
						<History />
					</ListItemIcon>
					<ListItemText>History</ListItemText>
				</MenuItem>
				<Divider />
				<MenuItem onClick={logout}>
					<ListItemIcon>
						<Logout />
					</ListItemIcon>
					<ListItemText>Logout</ListItemText>
				</MenuItem>
			</Menu>
		</div>
	);
};

Account.propTypes = {};

Account.defaultProps = {};

export default Account;

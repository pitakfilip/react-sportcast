import React from 'react';
import PropTypes from 'prop-types';
import logo from './sportcast-logo.png';

const baseHeight = 45;
const baseWidth = 240;
const Logo = ({ scale }) => {
	return <img src={logo} width={`${baseWidth * scale}em`} height={`${baseHeight * scale}em`} alt={'SportCast Logo'} />;
};

Logo.propTypes = {
	scale: PropTypes.number,
};
export default Logo;

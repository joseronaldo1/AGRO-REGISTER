// components/atoms/Icon/Icon.js
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Icon = ({ icon, className }) => (
 <FontAwesomeIcon icon={icon} className={className} style={{marginRight: "43px", marginTop: "4px"}} />
);

export default Icon;

import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const specialTitle = ({ icon, children, className, user }) => <h2 className={(user ? "h4 " : "") + "mb-2 text-light " + className}><FontAwesomeIcon icon={icon} className="mr-2 text-orange" fixedWidth />{children}</h2>;

export default specialTitle;
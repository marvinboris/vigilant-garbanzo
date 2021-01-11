import React from 'react';
import { Col } from 'reactstrap';

const presentationalContainer = ({ bg = 'white', children, text = 'dark', innerClassName = '', user, style }) => (
    <Col xs={12} className={(!user ? "py-5 " : "py-3 ") + ("bg-" + bg + " ") + ("text-" + text)} style={style}>
        <div className={(user ? 'container-fluid' : 'container') + " " + innerClassName}>{children}</div>
    </Col>
);

export default presentationalContainer;
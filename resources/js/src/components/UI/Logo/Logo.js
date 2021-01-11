import React, { Component } from 'react';
import { connect } from 'react-redux';

import './Logo.css';

class Logo extends Component {
    render() {
        const {
            big, sm, dark,
            content: {
                cms: {
                    global: { logo }
                }
            }
        } = this.props;

        return <div className="Logo mb-0 text-white" >
            <img src={dark ? logo : logo} className="mw-100" style={{ height: big ? 60 : 40, objectFit: 'contain' }} />
        </div>;
    }
}

const mapStateToProps = state => ({ ...state });

export default connect(mapStateToProps)(Logo);
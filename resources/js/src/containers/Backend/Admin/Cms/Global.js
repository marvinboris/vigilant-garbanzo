import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Col, Row } from 'reactstrap';
import { faSignature, faCheckCircle, faWrench } from '@fortawesome/free-solid-svg-icons';
import { faSave } from '@fortawesome/free-regular-svg-icons';

// Components
import Breadcrumb from '../../../../components/Backend/UI/Breadcrumb/Breadcrumb';
import SpecialTitle from '../../../../components/UI/Titles/SpecialTitle/SpecialTitle';
import Subtitle from '../../../../components/UI/Titles/Subtitle/Subtitle';
import Error from '../../../../components/Error/Error';
import CustomSpinner from '../../../../components/UI/CustomSpinner/CustomSpinner';
import Form from '../../../../components/Backend/UI/Form/Form';
import FormInput from '../../../../components/Backend/UI/Input/Input';
import FormButton from '../../../../components/UI/Button/BetweenButton/BetweenButton';
import Feedback from '../../../../components/Feedback/Feedback';

import * as actions from '../../../../store/actions';
import { updateObject } from '../../../../shared/utility';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class Global extends Component {
    state = {
        logo: null,
        app_name: '',
        company_name: '',
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.backend.cms.cms && prevState.app_name === '') {
            const { backend: { cms: { cms: { global } } } } = nextProps;
            return updateObject(prevState, { ...global });
        }
        return prevState;
    }

    async componentDidMount() {
        this.props.reset();
        this.props.get();
    }

    componentWillUnmount() {
        this.props.reset();
    }

    submitHandler = async e => {
        e.preventDefault();
        await this.props.patch(e.target);
    }

    inputChangeHandler = e => {
        const { name, value, files } = e.target;
        this.setState({ [name]: files ? files[0] : value });
    }

    fileUpload = () => document.getElementById('logo').click()

    render() {
        let {
            content: {
                cms: {
                    pages: { components: { form: { save, selected_file } }, backend: { pages: { cms: { title, global, form } } } }
                }
            },
            backend: { cms: { loading, error, message, cms } }
        } = this.props;
        const { logo, app_name, company_name } = this.state;
        let content = null;
        let errors = null;

        if (loading) content = <Col xs={12}>
            <CustomSpinner />
        </Col>;
        else {
            errors = <>
                <Error err={error} />
            </>;
            content = (
                <>
                    <Row>
                        <Form onSubmit={this.submitHandler} icon={faWrench} title={global} link="/admin/cms" innerClassName="row" className="shadow-sm">
                            <Col lg={8}>
                                <Feedback message={message} />
                                <Row>
                                    <input type="hidden" name="_method" defaultValue="PATCH" />

                                    <FormInput type="text" className="col-md-6" icon={faSignature} onChange={this.inputChangeHandler} value={app_name} name="app_name" required placeholder={form.app_name} />
                                    <FormInput type="text" className="col-md-6" icon={faSignature} onChange={this.inputChangeHandler} value={company_name} name="company_name" required placeholder={form.company_name} />

                                    <input type="file" id="logo" name="logo" className="d-none" onChange={this.inputChangeHandler} accept=".png,.jpg,.jpeg" />

                                    <div className="col-12">
                                        <FormButton color="green" icon={faSave}>{save}</FormButton>
                                    </div>
                                </Row>
                            </Col>

                            <Col lg={4}>
                                <div className="embed-responsive embed-responsive-1by1 bg-soft border border-light d-flex justify-content-center align-items-center w-60 mx-auto" style={{ cursor: 'pointer', background: logo && `url("${logo}") no-repeat center`, backgroundSize: 'contain' }} onClick={this.fileUpload}>
                                    {logo && (logo !== cms.global.logo) && <div className="text-center text-green">
                                        <div><FontAwesomeIcon icon={faCheckCircle} fixedWidth size="5x" /></div>
                                        <div className="mt-3">{selected_file}</div>
                                    </div>}
                                </div>
                            </Col>
                        </Form>
                    </Row>
                </>
            );
        }

        return (
            <>
                <div className="bg-soft py-4 pl-5 pr-4 position-relative">
                    <Breadcrumb main={global} icon={faWrench} />
                    <SpecialTitle user icon={faWrench}>{title}</SpecialTitle>
                    <Subtitle user>{global}</Subtitle>
                </div>
                <div className="p-4 pb-0">
                    {errors}
                    {content}
                </div>
            </>
        );
    }
}

const mapStateToProps = state => ({ ...state });

const mapDispatchToProps = dispatch => ({
    get: () => dispatch(actions.getCms()),
    patch: data => dispatch(actions.patchCms('global', data)),
    reset: () => dispatch(actions.resetCms()),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Global));
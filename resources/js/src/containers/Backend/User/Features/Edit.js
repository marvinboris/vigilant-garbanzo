import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect, withRouter } from 'react-router-dom';
import { Col, Row } from 'reactstrap';
import { faTools, faAnchor } from '@fortawesome/free-solid-svg-icons';
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
import TitleWrapper from '../../../../components/Backend/UI/TitleWrapper';
import Feedback from '../../../../components/Feedback/Feedback';

import * as actions from '../../../../store/actions';
import { updateObject } from '../../../../shared/utility';

class Edit extends Component {
    state = {
        name: '',
        prefix: '',
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.backend.features.feature && prevState.name === '') {
            const { backend: { features: { feature } } } = nextProps;
            return updateObject(prevState, { ...feature });
        }
        return prevState;
    }

    async componentDidMount() {
        this.props.reset();
        this.props.get(this.props.match.params.featureId);
    }

    componentWillUnmount() {
        this.props.reset();
    }

    submitHandler = async e => {
        e.preventDefault();
        await this.props.patch(this.props.match.params.featureId, e.target);
    }

    inputChangeHandler = e => {
        const { name, value, files } = e.target;
        this.setState({ [name]: files ? files[0] : value });
    }

    render() {
        let {
            content: {
                cms: {
                    pages: { components: { form: { save } }, backend: { pages: { features: { title, edit, index, form } } } }
                }
            },
            backend: { features: { loading, error, message } },
            auth: { data: { role: { features } } }
        } = this.props;
        let { name, prefix } = this.state;
        let content = null;
        let errors = null;

        const feature = features.find(f => f.prefix === 'features');
        const redirect = !(feature && JSON.parse(feature.permissions).includes('u')) && <Redirect to="/user/dashboard" />;

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
                        <Form onSubmit={this.submitHandler} icon={faTools} title={edit} list={index} link="/user/features" innerClassName="row" className="shadow-sm">
                            <Col lg={8}>
                                <Feedback message={message} />
                                <Row>
                                    <input type="hidden" name="_method" defaultValue="PATCH" />

                                    <FormInput type="text" className="col-md-6" icon={faTools} onChange={this.inputChangeHandler} value={name} name="name" required placeholder={form.name} />
                                    <FormInput type="text" className="col-md-6" icon={faAnchor} onChange={this.inputChangeHandler} value={prefix} name="prefix" required placeholder={form.prefix} />

                                    <div className="col-12">
                                        <FormButton color="green" icon={faSave}>{save}</FormButton>
                                    </div>
                                </Row>
                            </Col>
                        </Form>
                    </Row>
                </>
            );
        }

        return (
            <>
                <TitleWrapper>
                    <Breadcrumb items={[{ to: '/user/features', content: index }]} main={edit} icon={faTools} />
                    <SpecialTitle user icon={faTools}>{title}</SpecialTitle>
                    <Subtitle user>{edit}</Subtitle>
                </TitleWrapper>
                <div className="p-4 pb-0">
                    {redirect}
                    {errors}
                    {content}
                </div>
            </>
        );
    }
}

const mapStateToProps = state => ({ ...state });

const mapDispatchToProps = dispatch => ({
    get: id => dispatch(actions.getFeature(id)),
    patch: (id, data) => dispatch(actions.patchFeatures(id, data)),
    reset: () => dispatch(actions.resetFeatures()),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Edit));
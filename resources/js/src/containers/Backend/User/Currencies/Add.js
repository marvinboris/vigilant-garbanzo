import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect, withRouter } from 'react-router-dom';
import { Col, Row } from 'reactstrap';
import { faDollarSign, faExchangeAlt } from '@fortawesome/free-solid-svg-icons';
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

class Add extends Component {
    state = {
        name: '',
        abbr: '',
        exchange_rate: '',
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.backend.currencies.currency && prevState.name === '') {
            const { backend: { currencies: { currency } } } = nextProps;
            return updateObject(prevState, { ...currency });
        }
        return prevState;
    }

    componentDidMount() {
        this.props.reset();
        if (this.props.edit) this.props.get(this.props.match.params.currencyId);
    }

    componentWillUnmount() {
        this.props.reset();
    }

    submitHandler = e => {
        e.preventDefault();
        if (this.props.edit) this.props.patch(this.props.match.params.currencyId, e.target);
        else this.props.post(e.target);
    }

    inputChangeHandler = e => {
        const { name, value, files } = e.target;
        this.setState({ [name]: files ? files[0] : value });
    }

    render() {
        let {
            content: {
                cms: {
                    pages: { components: { form: { save } }, backend: { pages: { currencies: { title, add, edit, index, form } } } }
                }
            },
            backend: { currencies: { loading, error, message } },
            auth: { data: { role: { features } } }
        } = this.props;
        let { name, abbr, exchange_rate } = this.state;
        let content;
        let errors = null;

        const feature = features.find(f => f.prefix === 'currencies');
        const redirect = !(feature && JSON.parse(feature.permissions).includes(this.props.edit ? 'u' : 'c')) && <Redirect to="/user/dashboard" />;

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
                        <Form onSubmit={this.submitHandler} icon={faDollarSign} title={this.props.edit ? edit : add} list={index} link="/user/currencies" innerClassName="row" className="shadow-sm">
                            <Col lg={8}>
                                <Feedback message={message} />
                                <Row>
                                    {this.props.edit && <input type="hidden" name="_method" defaultValue="PATCH" />}

                                    <FormInput type="text" className="col-md-6" icon={faDollarSign} onChange={this.inputChangeHandler} value={name} name="name" required placeholder={form.name} />
                                    <FormInput type="text" className="col-md-6" icon={faDollarSign} onChange={this.inputChangeHandler} value={abbr} name="abbr" required placeholder={form.abbr} />
                                    <FormInput type="number" className="col-md-6" icon={faExchangeAlt} onChange={this.inputChangeHandler} value={exchange_rate} name="exchange_rate" required placeholder={form.exchange_rate} />

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
                    <Breadcrumb items={this.props.edit && [{ to: '/user/currencies', content: index }]} main={this.props.edit ? edit : add} icon={faDollarSign} />
                    <SpecialTitle user icon={faDollarSign}>{title}</SpecialTitle>
                    <Subtitle user>{this.props.edit ? edit : add}</Subtitle>
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
    get: id => dispatch(actions.getCurrency(id)),
    post: data => dispatch(actions.postCurrencies(data)),
    patch: (id, data) => dispatch(actions.patchCurrencies(id, data)),
    reset: () => dispatch(actions.resetCurrencies()),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Add));
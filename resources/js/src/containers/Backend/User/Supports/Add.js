import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect, withRouter } from 'react-router-dom';
import { Col, Row, FormGroup, CustomInput } from 'reactstrap';
import { faBorderNone, faWallet } from '@fortawesome/free-solid-svg-icons';
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
        currencies: []
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.backend.supports.support && prevState.name === '') {
            const { backend: { supports: { support } } } = nextProps;
            return updateObject(prevState, { ...support });
        }
        return prevState;
    }

    componentDidMount() {
        this.props.reset();
        if (this.props.edit) this.props.get(this.props.match.params.supportId);
        else this.props.info();
    }

    componentWillUnmount() {
        this.props.reset();
    }

    submitHandler = e => {
        e.preventDefault();
        if (this.props.edit) this.props.patch(this.props.match.params.supportId, e.target);
        else this.props.post(e.target);
    }

    inputChangeHandler = e => {
        const { id, name, value, checked, files } = e.target;
        if (name.includes('currencies')) {
            let currencies = [...this.state.currencies];

            if (name.includes('id')) {
                const [, currency_id] = id.split('-');
                const currency = currencies.find(c => +c.id === +currency_id);

                if (checked && !currency) currencies.push({ id: currency_id, balance: '' });
                else currencies = currencies.filter(c => +c.id !== +currency_id);
            } else if (name.includes('balance')) {
                const [, currency_id] = id.split('-');
                const currencyIndex = currencies.findIndex(c => +c.id === +currency_id);
                console.log({ value, currencies, currency_id, currencyIndex })

                currencies[currencyIndex].balance = value;
            }

            return this.setState({ currencies });
        }
        this.setState({ [name]: files ? files[0] : value });
    }

    render() {
        let {
            content: {
                cms: {
                    pages: { components: { form: { save } }, backend: { pages: { supports: { title, add, edit, index, form } } } }
                }
            },
            backend: { supports: { loading, error, message, currencies } },
            auth: { data: { role: { features } } }
        } = this.props;
        let { name, abbr, currencies: c } = this.state;
        let content;
        let errors = null;

        const feature = features.find(f => f.prefix === 'supports');
        const redirect = !(feature && JSON.parse(feature.permissions).includes(this.props.edit ? 'u' : 'c')) && <Redirect to="/user/dashboard" />;

        if (!currencies) currencies = [];

        const currenciesItems = currencies.sort((a, b) => a.name > b.name).map(currency => {
            const element = c.find(i => +i.id === +currency.id);

            const checked = element !== undefined;

            return <div key={JSON.stringify(currency)}>
                <CustomInput type="switch" id={`currency-${currency.id}`} className="col-12 pb-2" checked={checked} name={`currencies[${currency.id}][id]`} onChange={this.inputChangeHandler} label={<span className="text-500">{currency.name}</span>} />

                {checked && <Row>
                    <Col lg={4}>
                        <FormGroup>
                            <FormInput type="number" id={`currency-${currency.id}-balance`} name={`currencies[${currency.id}][balance]`} icon={faWallet} onChange={this.inputChangeHandler} value={element.balance} placeholder={form.balance} />
                        </FormGroup>
                    </Col>
                </Row>}
            </div>
        });

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
                        <Form onSubmit={this.submitHandler} icon={faBorderNone} title={this.props.edit ? edit : add} list={index} link="/user/supports" innerClassName="row" className="shadow-sm">
                            <Col lg={8}>
                                <Feedback message={message} />
                                <Row>
                                    {this.props.edit && <input type="hidden" name="_method" defaultValue="PATCH" />}

                                    <FormInput type="text" className="col-md-6" icon={faBorderNone} onChange={this.inputChangeHandler} value={name} name="name" required placeholder={form.name} />
                                    <FormInput type="text" className="col-md-6" icon={faBorderNone} onChange={this.inputChangeHandler} value={abbr} name="abbr" required placeholder={form.abbr} />

                                    <Col xs={12} className="pb-2 text-large text-700">{form.currencies}</Col>
                                    <FormGroup className="col-12">
                                        {currenciesItems}
                                    </FormGroup>

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
                    <Breadcrumb items={this.props.edit && [{ to: '/user/supports', content: index }]} main={this.props.edit ? edit : add} icon={faBorderNone} />
                    <SpecialTitle user icon={faBorderNone}>{title}</SpecialTitle>
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
    get: id => dispatch(actions.getSupport(id)),
    info: () => dispatch(actions.getSupportsInfo()),
    post: data => dispatch(actions.postSupports(data)),
    patch: (id, data) => dispatch(actions.patchSupports(id, data)),
    reset: () => dispatch(actions.resetSupports()),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Add));
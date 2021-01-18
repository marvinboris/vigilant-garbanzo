import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Col, Row } from 'reactstrap';
import { faWallet, faCalendar, faParagraph, faBorderNone, faDollarSign, faMoneyCheckAlt } from '@fortawesome/free-solid-svg-icons';
import { faSave } from '@fortawesome/free-regular-svg-icons';

// Components
import Breadcrumb from '../../../../components/Backend/UI/Breadcrumb/Breadcrumb';
import TitleWrapper from '../../../../components/Backend/UI/TitleWrapper';
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

class Add extends Component {
    state = {
        date: '',
        amount: '',
        comment: '',
        support_id: '',
        currency_id: '',
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.backend.entries.entry && prevState.date === '') {
            const { backend: { entries: { entry } } } = nextProps;
            return updateObject(prevState, { ...entry });
        }
        return prevState;
    }

    async componentDidMount() {
        this.props.reset();
        if (this.props.edit) this.props.get(this.props.match.params.entryId);
        else this.props.info();
    }

    componentWillUnmount() {
        this.props.reset();
    }

    submitHandler = e => {
        e.preventDefault();
        if (this.props.edit) this.props.patch(this.props.match.params.entryId, e.target);
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
                    pages: { components: { form: { save } }, backend: { pages: { entries: { title, add, edit, index, form } } } }
                }
            },
            backend: { entries: { loading, error, message, supports } },
            auth: { data: { role: { features } } }
        } = this.props;
        let { date, amount, comment, support_id, currency_id } = this.state;
        let content = null;
        let errors = null;

        const feature = features.find(f => f.prefix === 'entries');
        const redirect = !(feature && JSON.parse(feature.permissions).includes(this.props.edit ? 'u' : 'c')) && <Redirect to="/user/dashboard" />;

        if (!supports) supports = [];
        const supportsOptions = supports.sort((a, b) => a.name > b.name).map(item => <option key={JSON.stringify(item)} value={item.id}>{item.name}</option>);

        const support = supports.find(support => +support.id === +support_id);
        const currencies = support ? support.currencies : [];
        const currenciesOptions = currencies.sort((a, b) => a.name > b.name).map(item => <option key={JSON.stringify(item)} value={item.id}>{item.name}</option>);

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
                        <Form onSubmit={this.submitHandler} icon={faMoneyCheckAlt} title={this.props.edit ? edit : add} list={index} link="/user/entries" innerClassName="row" className="shadow-sm">
                            <Col lg={8}>
                                <Feedback message={message} />
                                {this.props.edit && <input type="hidden" name="_method" defaultValue="PATCH" />}
                                <Row>
                                    <FormInput type="date" className="col-md-6" icon={faCalendar} onChange={this.inputChangeHandler} value={date} name="date" required placeholder={form.date} />
                                    <FormInput type="number" className="col-md-6" icon={faWallet} onChange={this.inputChangeHandler} value={amount} name="amount" required placeholder={form.amount} />
                                    <FormInput className="col-lg-6" type="select" name="support_id" placeholder={form.support} onChange={this.inputChangeHandler} icon={faBorderNone} validation={{ required: true }} required value={support_id}>
                                        <option>{form.select_support}</option>
                                        {supportsOptions}
                                    </FormInput>
                                    <FormInput className="col-lg-6" type="select" name="currency_id" placeholder={form.currency} onChange={this.inputChangeHandler} icon={faDollarSign} validation={{ required: true }} required value={currency_id}>
                                        <option>{form.select_currency}</option>
                                        {currenciesOptions}
                                    </FormInput>
                                    <FormInput type="textarea" className="col-md-6" icon={faParagraph} onChange={this.inputChangeHandler} value={comment} name="comment" placeholder={form.comment} />

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
                    <Breadcrumb main={this.props.edit ? edit : add} icon={faMoneyCheckAlt} />
                    <SpecialTitle user icon={faMoneyCheckAlt}>{title}</SpecialTitle>
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
    get: id => dispatch(actions.getEntry(id)),
    info: () => dispatch(actions.getEntriesInfo()),
    post: data => dispatch(actions.postEntries(data)),
    patch: (id, data) => dispatch(actions.patchEntries(id, data)),
    reset: () => dispatch(actions.resetEntries()),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Add));
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect, withRouter } from 'react-router-dom';
import { Col, Form, FormGroup, Row } from 'reactstrap';
import { faCalendar, faClock, faFile } from '@fortawesome/free-solid-svg-icons';

// Components
import Breadcrumb from '../../../../components/Backend/UI/Breadcrumb/Breadcrumb';
import SpecialTitle from '../../../../components/UI/Titles/SpecialTitle/SpecialTitle';
import Subtitle from '../../../../components/UI/Titles/Subtitle/Subtitle';
import CustomSpinner from '../../../../components/UI/CustomSpinner/CustomSpinner';
import FormInput from '../../../../components/Backend/UI/Input/Input';
import FormButton from '../../../../components/UI/Button/BetweenButton/BetweenButton';
import Error from '../../../../components/Error/Error';
import Feedback from '../../../../components/Feedback/Feedback';
import TitleWrapper from '../../../../components/Backend/UI/TitleWrapper';
import FinanceTracker from './FinanceTracker/FinanceTracker';

import * as actions from '../../../../store/actions';

class Index extends Component {
    state = {
        start_date: '',
        end_date: '',
        frequency: '',
    }

    componentDidMount() {
        this.props.reset();
    }

    componentWillUnmount() {
        this.props.reset();
    }

    submitHandler = e => {
        e.preventDefault();
        this.props.post(e.target);
    }

    inputChangeHandler = e => {
        const { name, value, files } = e.target;
        this.setState({ [name]: files ? files[0] : value });
    }

    render() {
        let {
            content: {
                cms: {
                    pages: { components: { }, backend: { pages: { report: { title, subtitle, form } } } }
                }
            },
            backend: { report: { loading, error, message, financeTrackerData, currencies } },
            auth: { data: { role: { features } } }
        } = this.props;
        const { start_date, end_date, frequency } = this.state;

        const feature = features.find(f => f.prefix === 'report');
        const redirect = !feature && <Redirect to="/user/dashboard" />;

        const errors = <>
            <Error err={error} />
        </>;
        const feedback = <Feedback message={message} />;

        const content = <>
            <Form onSubmit={this.submitHandler} className="pt-4 px-4 pb-3 bg-blue-10 mb-5">
                <Row className="align-items-center">
                    <FormInput type="date" className="col-md-6 col-xl-3" icon={faCalendar} onChange={this.inputChangeHandler} value={start_date} name="start_date" required placeholder={form.start_date} />
                    <FormInput type="date" className="col-md-6 col-xl-3" icon={faCalendar} onChange={this.inputChangeHandler} value={end_date} name="end_date" required placeholder={form.end_date} />
                    <FormInput type="select" className="col-md-6 col-xl-3" icon={faClock} onChange={this.inputChangeHandler} value={frequency} name="frequency" required placeholder={form.frequency}>
                        <option>{form.select_frequency}</option>
                        <option value="daily">{form.daily}</option>
                        {/* <option value="weekly">{form.weekly}</option> */}
                        <option value="monthly">{form.monthly}</option>
                        <option value="yearly">{form.yearly}</option>
                    </FormInput>

                    <FormGroup className="col-md-6 col-xl-3">
                        <FormButton color="green" block size="lg" icon={faFile}>{form.generate}</FormButton>
                    </FormGroup>
                </Row>
            </Form>

            {loading ? <Col xs={12}>
                <CustomSpinner />
            </Col> : financeTrackerData && <div className="embed-responsive embed-responsive-16by9 position-relative bg-grayblue">
                <div className="position-absolute w-100 h-100" style={{ top: 0, left: 0 }}>
                    <Row className="p-4 text-light h-100">
                        <Col xs={12}>
                            <FinanceTracker data={financeTrackerData} currencies={currencies || {}} />
                        </Col>
                    </Row>
                </div>
            </div>}
        </>;

        return (
            <>
                <TitleWrapper>
                    <Breadcrumb main={subtitle} icon={faFile} />
                    <SpecialTitle user icon={faFile}>{title}</SpecialTitle>
                    <Subtitle user>{subtitle}</Subtitle>
                </TitleWrapper>
                <div className="p-4 pb-0">
                    {redirect}
                    {errors}
                    {feedback}
                    {content}
                </div>
            </>
        );
    }
}

const mapStateToProps = state => ({ ...state });

const mapDispatchToProps = dispatch => ({
    post: data => dispatch(actions.postReport(data)),
    reset: () => dispatch(actions.resetReport()),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Index));
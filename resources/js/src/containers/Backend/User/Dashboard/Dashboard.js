import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { Col, Row } from 'reactstrap';
import { faTachometerAlt, faEnvelope, faClock, faLandmark, faStopwatch, faArrowsAlt, faTimes, faTasks, faEye, faEdit, faTrash, faMoneyCheck, faMoneyCheckAlt, faMoneyBillWaveAlt, faHandHoldingUsd } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// Components
import Breadcrumb from '../../../../components/Backend/UI/Breadcrumb/Breadcrumb';
import Table from '../../../../components/Backend/UI/Table/Table';
import SpecialTitle from '../../../../components/UI/Titles/SpecialTitle/SpecialTitle';
import Subtitle from '../../../../components/UI/Titles/Subtitle/Subtitle';
import Card from '../../../../components/Backend/Dashboard/Card/Card';
import TitleWrapper from '../../../../components/Backend/UI/TitleWrapper';
import Error from '../../../../components/Error/Error';
import CustomSpinner from '../../../../components/UI/CustomSpinner/CustomSpinner';
import FinanceTracker from './FinanceTracker/FinanceTracker';

import * as actions from '../../../../store/actions';
import { updateObject } from '../../../../shared/utility';


class Dashboard extends Component {
    componentDidMount() {
        this.props.get();
    }

    componentWillUnmount() {
        this.props.reset();
    }

    render() {
        let {
            content: {
                cms: {
                    pages: { backend: { pages: { dashboard: { user: { title, subtitle, blocks: { total_expenses, total_entries, total_debts, total_claims } } } } } }
                }
            },
            backend: { dashboard: { loading, error, blocksData, financeTrackerData, totalExpenses, totalEntries, totalClaims, totalDebts, totalInvestments, currencies } },
        } = this.props;

        let content = null;
        let errors = null;

        if (loading) content = <Col xs={12}>
            <CustomSpinner />
        </Col>;
        else {
            errors = <>
                <Error err={error} />
            </>;
            if (blocksData) {
                const data = [
                    {
                        title: total_expenses.title,
                        children: blocksData.totalExpenses,
                        icon: faMoneyCheck,
                        link: '/user/expenses/',
                        color: 'blue',
                        details: total_expenses.description,
                        titleColor: 'white',
                        circleColor: 'white',
                        circleBorder: 'white'
                    },
                    {
                        title: total_entries.title,
                        children: blocksData.totalEntries,
                        icon: faMoneyCheckAlt,
                        link: '/user/entries/',
                        color: 'orange',
                        details: total_entries.description,
                        titleColor: 'white',
                        circleColor: 'blue',
                        circleBorder: 'white'
                    },
                    {
                        title: total_debts.title,
                        children: blocksData.totalDebts,
                        icon: faMoneyBillWaveAlt,
                        link: '/user/debts/',
                        color: 'gold',
                        details: total_debts.description,
                        titleColor: 'white',
                        circleColor: 'blue',
                        circleBorder: 'white'
                    },
                    {
                        title: total_claims.title,
                        children: blocksData.totalClaims,
                        icon: faHandHoldingUsd,
                        link: '/user/claims/',
                        color: 'green',
                        details: total_claims.description,
                        titleColor: 'white',
                        circleColor: 'white',
                        circleBorder: 'white',
                    }
                ];

                const cards = data.map(({ title, titleColor, icon, link, color, children, details, circleBorder, circleColor, light }, index) => <Card color={color} key={index} title={title} titleColor={titleColor} details={details} circleBorder={circleBorder} circleColor={circleColor} icon={icon} link={link} light={light}>{children}</Card>);

                const expensesData = totalExpenses.map(expense => updateObject(expense, {
                    action: <div className="text-center">
                        <Link className="text-blue mr-2" to={`/user/expenses/${expense.id}`}><FontAwesomeIcon icon={faEye} fixedWidth /></Link>
                        <Link className="text-green mr-2" to={`/user/expenses/${expense.id}/edit`}><FontAwesomeIcon icon={faEdit} fixedWidth /></Link>
                        <a className="text-red" href="#" onClick={() => this.props.deleteExpenses(expense.id)}><FontAwesomeIcon icon={faTrash} fixedWidth /></a>
                    </div>
                }));

                const entriesData = totalEntries.map(entry => updateObject(entry, {
                    action: <div className="text-center">
                        <Link className="text-blue mr-2" to={`/user/entries/${entry.id}`}><FontAwesomeIcon icon={faEye} fixedWidth /></Link>
                        <Link className="text-green mr-2" to={`/user/entries/${entry.id}/edit`}><FontAwesomeIcon icon={faEdit} fixedWidth /></Link>
                        <a className="text-red" href="#" onClick={() => this.props.deleteEntries(entry.id)}><FontAwesomeIcon icon={faTrash} fixedWidth /></a>
                    </div>
                }));

                const investmentsData = totalInvestments.map(investment => updateObject(investment, {
                    action: <div className="text-center">
                        <Link className="text-blue mr-2" to={`/user/investments/${investment.id}`}><FontAwesomeIcon icon={faEye} fixedWidth /></Link>
                        <Link className="text-green mr-2" to={`/user/investments/${investment.id}/edit`}><FontAwesomeIcon icon={faEdit} fixedWidth /></Link>
                        <a className="text-red" href="#" onClick={() => this.props.deleteInvestments(investment.id)}><FontAwesomeIcon icon={faTrash} fixedWidth /></a>
                    </div>
                }));

                const claimsData = totalClaims.map(claim => updateObject(claim, {
                    action: <div className="text-center">
                        <Link className="text-blue mr-2" to={`/user/claims/${claim.id}`}><FontAwesomeIcon icon={faEye} fixedWidth /></Link>
                        <Link className="text-green mr-2" to={`/user/claims/${claim.id}/edit`}><FontAwesomeIcon icon={faEdit} fixedWidth /></Link>
                        <a className="text-red" href="#" onClick={() => this.props.deleteClaims(claim.id)}><FontAwesomeIcon icon={faTrash} fixedWidth /></a>
                    </div>
                }));

                const debtsData = totalDebts.map(debt => updateObject(debt, {
                    action: <div className="text-center">
                        <Link className="text-blue mr-2" to={`/user/debts/${debt.id}`}><FontAwesomeIcon icon={faEye} fixedWidth /></Link>
                        <Link className="text-green mr-2" to={`/user/debts/${debt.id}/edit`}><FontAwesomeIcon icon={faEdit} fixedWidth /></Link>
                        <a className="text-red" href="#" onClick={() => this.props.deleteDebts(debt.id)}><FontAwesomeIcon icon={faTrash} fixedWidth /></a>
                    </div>
                }));

                content = (
                    <>
                        <div className="pt-4 px-4 pb-3 bg-blue-10">
                            <Row>
                                {cards}
                            </Row>
                        </div>

                        <Row className="mt-5">
                            <Table array={expensesData} searchable draggable closable title="Total Expenses" dark icon={faTasks} bordered limit={5} lg={5} innerClassName="bg-darkblue" className="bg-darklight shadow-sm"
                                fields={[
                                    { name: 'Date', key: 'date' },
                                    { name: 'Amount', key: 'amount' },
                                    { name: 'Currency', key: 'currency' },
                                    { name: 'Support', key: 'support' },
                                    { name: 'Comment', key: 'comment', maxWidth: 150 },
                                    { name: 'Action', key: 'action' }
                                ]}>
                                <Link to="/user/expenses" className="text-white">{'View full expense list | >'}</Link>
                            </Table>

                            <Col lg={7} className="pt-3 pt-sm-0 pb-4">
                                <div className="bg-darklight shadow-sm text-white h-100 d-flex flex-column">
                                    <div className="p-3 border-bottom border-border text-orange text-700 position-relative d-flex">
                                        <span className="d-inline-flex align-items-center"><FontAwesomeIcon size="lg" className="mr-2" fixedWidth icon={faTasks} />Finance Tracker</span>

                                        <div className="ml-auto d-none d-lg-flex justify-content-end align-items-center text-white position-absolute" style={{ top: '50%', right: 16, transform: 'translateY(-50%)' }}>
                                            <FontAwesomeIcon icon={faArrowsAlt} size="lg" className="mr-3" />

                                            <FontAwesomeIcon icon={faTimes} size="2x" />
                                        </div>
                                    </div>

                                    <Row className="p-3 flex-fill">
                                        <Col xs={12} lg={11} style={{ minHeight: 300 }}>
                                            <FinanceTracker data={financeTrackerData} currencies={currencies || {}} />
                                        </Col>
                                    </Row>
                                </div>
                            </Col>

                            <Table array={entriesData} searchable draggable closable title="Total Entries" dark icon={faTasks} bordered limit={5} lg={6} innerClassName="bg-darkblue" className="bg-darklight shadow-sm"
                                fields={[
                                    { name: 'Date', key: 'date' },
                                    { name: 'Amount', key: 'amount' },
                                    { name: 'Currency', key: 'currency' },
                                    { name: 'Support', key: 'support' },
                                    { name: 'Comment', key: 'comment', maxWidth: 150 },
                                    { name: 'Action', key: 'action' }
                                ]}>
                                <Link to="/user/entries" className="text-white">{'View full entry list | >'}</Link>
                            </Table>

                            <Table array={investmentsData} searchable draggable closable title="Total Investments" dark icon={faTasks} bordered limit={5} lg={6} innerClassName="bg-darkblue" className="bg-darklight shadow-sm"
                                fields={[
                                    { name: 'Date', key: 'date' },
                                    { name: 'Delay', key: 'delay' },
                                    { name: 'Amount', key: 'amount' },
                                    { name: 'Currency', key: 'currency' },
                                    { name: 'Rate', key: 'rate' },
                                    { name: 'Support', key: 'support' },
                                    { name: 'Comment', key: 'comment', maxWidth: 150 },
                                    { name: 'Action', key: 'action' }
                                ]}>
                                <Link to="/user/investments" className="text-white">{'View full investment list | >'}</Link>
                            </Table>

                            <Table array={claimsData} searchable draggable closable title="Total Claims" dark icon={faTasks} bordered limit={5} lg={6} innerClassName="bg-darkblue" className="bg-darklight shadow-sm"
                                fields={[
                                    { name: 'Start Date', key: 'start_date' },
                                    { name: 'End Date', key: 'end_date' },
                                    { name: 'Amount', key: 'amount' },
                                    { name: 'Currency', key: 'currency' },
                                    { name: 'Support', key: 'support' },
                                    { name: 'Comment', key: 'comment', maxWidth: 150 },
                                    { name: 'Action', key: 'action' }
                                ]}>
                                <Link to="/user/claims" className="text-white">{'View full claim list | >'}</Link>
                            </Table>

                            <Table array={debtsData} searchable draggable closable title="Total Debts" dark icon={faTasks} bordered limit={5} lg={6} innerClassName="bg-darkblue" className="bg-darklight shadow-sm"
                                fields={[
                                    { name: 'Start Date', key: 'start_date' },
                                    { name: 'End Date', key: 'end_date' },
                                    { name: 'Amount', key: 'amount' },
                                    { name: 'Currency', key: 'currency' },
                                    { name: 'Support', key: 'support' },
                                    { name: 'Comment', key: 'comment', maxWidth: 150 },
                                    { name: 'Action', key: 'action' }
                                ]}>
                                <Link to="/user/debts" className="text-white">{'View full debt list | >'}</Link>
                            </Table>
                        </Row>
                    </>
                );
            }
        }

        return (
            <>
                <TitleWrapper>
                    <Breadcrumb main={subtitle} icon={faTachometerAlt} />
                    <SpecialTitle user icon={faTachometerAlt}>{title}</SpecialTitle>
                    <Subtitle user>{subtitle}</Subtitle>
                </TitleWrapper>
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
    get: () => dispatch(actions.getDashboard()),
    reset: () => dispatch(actions.resetDashboard()),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Dashboard));
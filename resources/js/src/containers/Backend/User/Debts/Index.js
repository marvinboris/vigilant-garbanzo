import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { Row } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEdit, faTrash, faWallet, faMoneyBillWaveAlt } from '@fortawesome/free-solid-svg-icons';

// Components
import Breadcrumb from '../../../../components/Backend/UI/Breadcrumb/Breadcrumb';
import TitleWrapper from '../../../../components/Backend/UI/TitleWrapper';
import SpecialTitle from '../../../../components/UI/Titles/SpecialTitle/SpecialTitle';
import Subtitle from '../../../../components/UI/Titles/Subtitle/Subtitle';
import List from '../../../../components/Backend/UI/List/List';
import Error from '../../../../components/Error/Error';
import Feedback from '../../../../components/Feedback/Feedback';
import Delete from '../../../../components/Backend/UI/Delete/Delete';

import * as actions from '../../../../store/actions';
import { updateObject } from '../../../../shared/utility';

class Index extends Component {
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
                    pages: { components: { list: { action } }, backend: { pages: { debts: { title, add, index, form } } } }
                }
            },
            backend: { debts: { loading, error, message, debts, total } },
            auth: { data: { role: { features } } }
        } = this.props;

        const feature = features.find(f => f.prefix === 'debts');
        const redirect = !feature && <Redirect to="/user/dashboard" />;

        const errors = <>
            <Error err={error} />
        </>;
        const feedback = <Feedback message={message} />;

        if (!debts) debts = [];
        const data = debts.map(claim => {
            return updateObject(claim, {
                action: <div className="text-center">
                    <Link to={`/user/debts/${claim.id}`} className="mr-2">
                        <FontAwesomeIcon icon={faEye} className="text-green" fixedWidth />
                    </Link>
                    {JSON.parse(feature.permissions).includes('u') && <Link to={`/user/debts/${claim.id}/edit`} className="mx-1">
                        <FontAwesomeIcon icon={faEdit} className="text-blue" fixedWidth />
                    </Link>}
                    {JSON.parse(feature.permissions).includes('d') && <span className="mx-1"><Delete deleteAction={() => this.props.delete(claim.id)}><FontAwesomeIcon icon={faTrash} className="text-red" fixedWidth /></Delete></span>}
                </div>,
            });
        });

        const content = (
            <>
                <Row>
                    <List array={data} loading={loading} data={JSON.stringify(debts)} get={this.props.get} total={total} bordered add={add} link="/user/debts/add" icon={faMoneyBillWaveAlt} title={index} className="shadow-sm"
                        fields={[
                            { name: form.start_date, key: 'start_date' },
                            { name: form.end_date, key: 'end_date' },
                            { name: form.amount, key: 'amount' },
                            { name: form.comment, key: 'comment' },
                            { name: form.support, key: 'support' },
                            { name: form.currency, key: 'currency' },
                            { name: action, key: 'action', fixed: true }
                        ]} />
                </Row>
            </>
        );

        return (
            <>
                <TitleWrapper>
                    <Breadcrumb main={index} icon={faMoneyBillWaveAlt} />
                    <SpecialTitle user icon={faMoneyBillWaveAlt}>{title}</SpecialTitle>
                    <Subtitle user>{index}</Subtitle>
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
    get: (page, show, search) => dispatch(actions.getDebts(page, show, search)),
    delete: id => dispatch(actions.deleteDebts(id)),
    reset: () => dispatch(actions.resetDebts()),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Index));
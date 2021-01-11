import React, { Component } from 'react';
import { Col, Table, Button, Input, Row } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle, faFileExcel, faFilePdf, faFileCsv, faPrint, faAngleDoubleLeft, faChevronLeft, faChevronRight, faAngleDoubleRight } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

import { updateObject } from '../../../../shared/utility';
import { connect } from 'react-redux';

let timeout;

class List extends Component {
    state = {
        show: 10,
        search: '',
        page: 1,
        pageNumber: 1,
        pageFirst: 1,
        pageSecond: 2,
        pageLast: 3,
    }

    componentDidUpdate(prevProps) {
        const { total, show } = this.props;
        if (prevProps.total !== total || prevProps.show !== show) this.setState({ pageNumber: Math.ceil(total / show) });
    }

    inputChangedHandler = e => {
        const { name, value } = e.target;
        const { page, show, search } = this.state;
        this.firstPageHandler();
        if (name === 'show') {
            this.props.get(page, value, search);
            return this.setState({ show: value });
        }
        if (name === 'search') {
            if (timeout) clearTimeout(timeout);
            timeout = setTimeout(() => {
                this.props.get(page, show, value);
                clearTimeout(timeout);
            }, 1000);
            return this.setState({ search: value });
        }
    }

    previousPageHandler = () => {
        const { page } = this.state;
        if (page <= 1) return;
        this.pageChangeHandler(page - 1);
    }

    nextPageHandler = () => {
        const { page, pageNumber } = this.state;
        const lastPage = pageNumber;
        if (page >= lastPage) return;
        this.pageChangeHandler(page + 1);
    }

    firstPageHandler = () => {
        const { page } = this.state;
        if (page <= 1) return;
        this.pageChangeHandler(1);
    }

    lastPageHandler = () => {
        const { page, pageNumber } = this.state;
        const lastPage = pageNumber;
        if (page >= lastPage) return;
        this.pageChangeHandler(lastPage);
    }

    pageChangeHandler = page => {
        const { show, search, pageNumber } = this.state;
        const lastPage = pageNumber;
        let pageFirst;
        if (page === 1) pageFirst = 1;
        else if (page === lastPage) pageFirst = lastPage - 2;
        else pageFirst = page - 1;
        this.props.get(page, show, search);
        const pageSecond = pageFirst + 1, pageLast = pageFirst + 2;
        this.setState({ page, pageFirst, pageSecond, pageLast });
    }

    onClick = e => {
        e.preventDefault();

        const url = e.target.href;
        this.exportData(url);
    };

    exportData = async url => {
        const { data } = this.props;
        const format = url.split('/')[url.split('/').length - 1];
        const name = title + '.' + format;
        const token = localStorage.getItem('token');

        try {
            const formData = new FormData();

            formData.append('data', data);
            formData.append('name', name);

            const res = await fetch(url, {
                method: 'POST',
                mode: 'cors',
                body: formData,
                headers: {
                    Authorization: token
                }
            });

            const resData = await res.blob();

            const downloadLink = URL.createObjectURL(resData);
            const a = document.createElement('a');
            a.style.display = 'none';
            a.href = downloadLink;
            a.download = name;
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(downloadLink);
        } catch (err) {
            console.log(err)
        }
    }

    render() {
        const {
            fields, array, loading = false, total = 0, limit, bordered, xs = 12, sm = 12, md = 12, lg = 12, xl = 12, icon, title, add, link, className = '', dark, borderless, innerClassName = '', outerClassName = '', p0, select, children, selectHandler, style,
            content: {
                cms: {
                    pages: { components: { list: { all, first, last, loading: loading_, print, pdf, csv, excel, search: search_, show: show_, sl, showing, from, entries: { singular, plural } } } }
                }
            }
        } = this.props;
        const { show, search, page, pageFirst, pageSecond, pageLast, pageNumber } = this.state;

        const titles = fields.map(({ name, fixed }) => <th className="align-middle text-nowrap bg-soft" style={fixed ? { position: 'sticky', right: 0 } : {}} key={name}>{name}</th>);
        titles.unshift(<th className="text-center align-middle" key="#">{sl}</th>);
        if (select) titles.unshift(<th className="align-middle text-center" key="select_all">
            <input type="checkbox" onClick={selectHandler} className="select_all" />
        </th>);

        const filteredArray = array;
        const limitedArray = filteredArray;

        const content = limitedArray.map((item, index) => {
            if (limit && index >= limit) return null;
            let inside = [<th className="text-center align-middle" key={'primary' + index}>{(show === 'All' ? 0 : (page - 1) * show) + index + 1}</th>];
            if (select) inside.unshift(<th className="text-center align-middle" key={'secondary' + index}>
                <input type="checkbox" value={item._id} />
            </th>);
            fields.forEach(({ key, minWidth, fixed }) => {
                inside.push(<td className="align-middle text-nowrap" style={updateObject({ minWidth, borderColor: '#DEE2E6' }, fixed ? { position: 'sticky', right: 0, backgroundColor: '#F4F4F4' } : {})} key={key}>{item[key]}</td>);
            });

            return <tr className="align-middle" key={index + 1}>{inside}</tr>;
        });

        const modulo = total % show;
        const entries = total === 0 ? total : (modulo !== 0 ? modulo : show);

        return (
            <Col xs={xs} sm={sm} md={md} lg={lg} xl={xl} className={outerClassName}>
                <input type="hidden" id="table-show" value={show} />
                <input type="hidden" id="table-page" value={page} />
                <input type="hidden" id="table-search" value={search} />

                <div className={`rounded-4 d-flex justify-content-between align-items-center mb-5 mt-3 py-4 px-4 text-large bg-greenblue-10 ${className}`}>
                    <span className="d-inline-flex align-items-center text-700 text-greenblue">{icon ? <FontAwesomeIcon fixedWidth className="mr-2" icon={icon} size="lg" /> : null}<span className="text-dark">{title}</span></span>

                    {add ? <Link to={link}>
                        <Button color="greenblue" size="lg" className="rounded-2">
                            <FontAwesomeIcon icon={faPlusCircle} fixedWidth className="mr-2" />
                            {add}
                        </Button>
                    </Link> : null}
                </div>

                <div className={`d-flex flex-column ${dark ? "text-light " : " "}${className}`} style={style}>
                    <div className="p-4 border-bottom border-soft text-greenblue text-700 position-relative">
                        <Row className="align-items-center justify-content-between">
                            <div className="col-6 pb-2 pb-lg-0 col-lg-2">
                                <div className="d-flex align-items-center text-secondary rounded-2">
                                    <div className="px-3 py-2 font-weight-bold h-100 border-bottom border-soft bg-soft">{show_}</div>
                                    <Input type="select" name="show" onChange={this.inputChangedHandler} className="px-3 py-2 text-center rounded-0 h-100 d-block text-reset border-top-0 border-right-0 border-bottom-0 border-black-20 bg-soft" style={{ width: '5rem' }}>
                                        <option value="10">10</option>
                                        <option value="25">25</option>
                                        <option value="50">50</option>
                                        <option value="100">100</option>
                                        <option value="All">{all}</option>
                                    </Input>
                                </div>
                            </div>

                            <div className="col-6 d-lg-none pb-2 pb-lg-0">
                                <Input type="search" name="search" onChange={this.inputChangedHandler} className="bg-soft border-0 rounded-2" placeholder="Search..." />
                            </div>

                            <div className="col-lg-4 pb-2 pb-lg-0 rounded-2 overflow-hidden">
                                <div className="bg-soft d-flex text-secondary justify-content-around align-items-center font-weight-bold py-3">
                                    <a href="/api/export/xlsx" onClick={this.onClick} className="px-2 export text-decoration-none text-reset"><FontAwesomeIcon icon={faFileExcel} className="text-darkblue mr-2" />{excel}</a>
                                    <a href="/api/export/pdf" onClick={this.onClick} className="px-2 export text-decoration-none text-reset"><FontAwesomeIcon icon={faFilePdf} className="text-danger mr-2" />{pdf}</a>
                                    <a href="/api/export/csv" onClick={this.onClick} className="px-2 export text-decoration-none text-reset"><FontAwesomeIcon icon={faFileCsv} className="text-green mr-2" />{csv}</a>
                                    <a href="/api/export/pdf" onClick={this.onClick} className="px-2 export text-decoration-none text-reset"><FontAwesomeIcon icon={faPrint} className="text-primary mr-2" />{print}</a>
                                </div>
                            </div>

                            <div className="col-lg-2 d-none d-lg-block">
                                <Input type="search" name="search" onChange={this.inputChangedHandler} className="bg-soft border-0 rounded-2" placeholder={`${search_}...`} />
                            </div>
                        </Row>
                    </div>

                    <div className={"flex-fill d-flex flex-column " + (!p0 ? "p-4" : "p-0")}>
                        <div className="table-responsive flex-fill">
                            <Table dark={dark} bordered={bordered} hover borderless={borderless} className={innerClassName}>
                                <thead className="bg-soft text-secondary"><tr>{titles}</tr></thead>
                                <tbody className="bg-soft-50 text-secondary">{!loading && content}</tbody>
                            </Table>
                        </div>

                        {loading && <Col xs={12} className="text-center">
                            <div className="text-center py-3">{loading_}...</div>
                        </Col>}

                        <div>
                            {children}
                        </div>

                        <div>
                            <div>{showing} {((+page !== pageNumber) && (+page > 1)) ? show : entries} {from} {total} {total > 1 ? plural : singular}.</div>

                            <div className="pt-2 d-flex justify-content-end">
                                {show === 'All' ? null : <ul className="pagination btn-group">
                                    {page === 1 ? null :
                                        <>
                                            <li className="btn btn-yellow" onClick={this.firstPageHandler}><FontAwesomeIcon icon={faAngleDoubleLeft} className="mr-2" />{first}</li>
                                            <li className="btn btn-darkblue text-secondary" onClick={this.previousPageHandler}><FontAwesomeIcon icon={faChevronLeft} /></li>
                                        </>
                                    }
                                    <li className={"btn btn-darkblue " + (page === pageFirst ? 'text-700 active' : 'secondary')} onClick={() => this.pageChangeHandler(pageFirst)}>{pageFirst}</li>
                                    {pageNumber > 1 ?
                                        <>
                                            <li className={"btn btn-darkblue " + (page === pageSecond ? 'text-700 active' : 'secondary')} onClick={() => this.pageChangeHandler(pageSecond)}>{pageSecond}</li>
                                            {pageNumber > 2 ?
                                                <li className={"btn btn-darkblue " + (page === pageLast ? 'text-700 active' : 'secondary')} onClick={() => this.pageChangeHandler(pageLast)}>{pageLast}</li>
                                                : null}
                                            {page === pageNumber ? null :
                                                <>
                                                    <li className="btn btn-darkblue text-secondary" onClick={this.nextPageHandler}><FontAwesomeIcon icon={faChevronRight} /></li>
                                                    <li className="btn btn-myprimary" onClick={this.lastPageHandler}>{last}<FontAwesomeIcon icon={faAngleDoubleRight} className="ml-2" /></li>
                                                </>
                                            }
                                        </>
                                        : null}
                                </ul>}
                            </div>
                        </div>
                    </div>
                </div>
            </Col>
        );

    }
}

const mapStateToProps = state => ({ ...state });

export default connect(mapStateToProps)(List);
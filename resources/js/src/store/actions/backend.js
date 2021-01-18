import * as actionTypes from './actionTypes';

const prefix = '/api/';



export const resetAdmins = () => ({ type: actionTypes.ADMINS_RESET });
const adminsStart = () => ({ type: actionTypes.ADMINS_START });
const adminsSuccess = data => ({ type: actionTypes.ADMINS_SUCCESS, ...data });
const adminsFail = error => ({ type: actionTypes.ADMINS_FAIL, error });
export const getAdmins = (page = 1, show = 10, search = '') => async (dispatch, getState) => {
    dispatch(adminsStart());
    const { role } = getState().auth;

    try {
        const token = localStorage.getItem('token');
        const res = await fetch(`${prefix + role}/admins?page=${page}&show=${show}&search=${search}`, {
            headers: {
                Authorization: token
            }
        });
        const resData = await res.json();
        dispatch(adminsSuccess(resData));
    } catch (error) {
        console.log(error);
        dispatch(adminsFail(error));
    }
};

export const getAdmin = id => async (dispatch, getState) => {
    dispatch(adminsStart());
    const { role } = getState().auth;

    try {
        const token = localStorage.getItem('token');
        const res = await fetch(`${prefix + role}/admins/${id}`, {
            headers: {
                Authorization: token
            }
        });
        const resData = await res.json();
        dispatch(adminsSuccess(resData));
    } catch (error) {
        console.log(error);
        dispatch(adminsFail(error));
    }
};

export const postAdmins = data => async (dispatch, getState) => {
    dispatch(adminsStart());
    const { role } = getState().auth;

    try {
        const token = localStorage.getItem('token');
        const form = new FormData(data);
        const res = await fetch(`${prefix + role}/admins`, {
            method: 'POST',
            body: form,
            headers: {
                Authorization: token
            }
        });
        const resData = await res.json();
        if (res.status === 422) throw new Error(Object.values(resData.errors).join('\n'));
        else if (res.status !== 200 && res.status !== 201) throw new Error(resData.error.message);
        dispatch(adminsSuccess(resData));
    } catch (error) {
        console.log(error);
        dispatch(adminsFail(error));
    }
};

export const patchAdmins = (id, data) => async (dispatch, getState) => {
    dispatch(adminsStart());
    const { role } = getState().auth;

    try {
        const token = localStorage.getItem('token');
        const form = new FormData(data);
        const res = await fetch(`${prefix + role}/admins/${id}`, {
            method: 'POST',
            body: form,
            headers: {
                Authorization: token,
            }
        });
        const resData = await res.json();
        if (res.status === 422) throw new Error(Object.values(resData.errors).join('\n'));
        dispatch(adminsSuccess(resData));
    } catch (error) {
        console.log(error);
        dispatch(adminsFail(error));
    }
};

export const deleteAdmins = id => async (dispatch, getState) => {
    dispatch(adminsStart());
    const { role } = getState().auth;

    try {
        const page = document.getElementById('table-page').value;
        const show = document.getElementById('table-show').value;
        const search = document.getElementById('table-search').value;

        const token = localStorage.getItem('token');
        const res = await fetch(`${prefix + role}/admins/${id}?page=${page}&show=${show}&search=${search}`, {
            method: 'DELETE',
            headers: {
                Authorization: token
            }
        });
        const resData = await res.json();
        if (res.status === 422) throw new Error(Object.values(resData.errors).join('\n'));
        dispatch(adminsSuccess(resData));
    } catch (error) {
        console.log(error);
        dispatch(adminsFail(error));
    }
};



export const resetCms = () => ({ type: actionTypes.CMS_RESET });
const cmsStart = () => ({ type: actionTypes.CMS_START });
const cmsSuccess = data => ({ type: actionTypes.CMS_SUCCESS, ...data });
const cmsFail = error => ({ type: actionTypes.CMS_FAIL, error });
export const getCms = () => async (dispatch, getState) => {
    dispatch(cmsStart());
    const { role } = getState().auth;

    try {
        const token = localStorage.getItem('token');
        const res = await fetch(`${prefix + role}/cms`, {
            headers: {
                Authorization: token
            }
        });
        const resData = await res.json();
        dispatch(cmsSuccess(resData));
    } catch (error) {
        console.log(error);
        dispatch(cmsFail(error));
    }
};

export const postCms = data => async (dispatch, getState) => {
    dispatch(cmsStart());
    const { role } = getState().auth;

    try {
        const token = localStorage.getItem('token');
        const form = new FormData(data);
        const res = await fetch(`${prefix + role}/cms`, {
            method: 'POST',
            body: form,
            headers: {
                Authorization: token
            }
        });
        const resData = await res.json();
        if (res.status === 422) throw new Error(Object.values(resData.errors).join('\n'));
        else if (res.status !== 200 && res.status !== 201) throw new Error(resData.error.message);
        dispatch(cmsSuccess(resData));
    } catch (error) {
        console.log(error);
        dispatch(cmsFail(error));
    }
};

export const patchCms = (id, data) => async (dispatch, getState) => {
    dispatch(cmsStart());
    const { role } = getState().auth;

    try {
        const token = localStorage.getItem('token');
        const form = new FormData(data);
        const res = await fetch(`${prefix + role}/cms/${id}`, {
            method: 'POST',
            body: form,
            headers: {
                Authorization: token,
            }
        });
        const resData = await res.json();
        if (res.status === 422) throw new Error(Object.values(resData.errors).join('\n'));
        dispatch(cmsSuccess(resData));
    } catch (error) {
        console.log(error);
        dispatch(cmsFail(error));
    }
};

export const deleteCms = id => async (dispatch, getState) => {
    dispatch(cmsStart());
    const { role } = getState().auth;

    try {
        const page = document.getElementById('table-page').value;
        const show = document.getElementById('table-show').value;
        const search = document.getElementById('table-search').value;

        const token = localStorage.getItem('token');
        const res = await fetch(`${prefix + role}/cms/${id}?page=${page}&show=${show}&search=${search}`, {
            method: 'DELETE',
            headers: {
                Authorization: token
            }
        });
        const resData = await res.json();
        if (res.status === 422) throw new Error(Object.values(resData.errors).join('\n'));
        dispatch(cmsSuccess(resData));
    } catch (error) {
        console.log(error);
        dispatch(cmsFail(error));
    }
};



export const resetDashboard = () => ({ type: actionTypes.DASHBOARD_RESET });
const dashboardStart = () => ({ type: actionTypes.DASHBOARD_START });
const dashboardSuccess = data => ({ type: actionTypes.DASHBOARD_SUCCESS, ...data });
const dashboardFail = error => ({ type: actionTypes.DASHBOARD_FAIL, error });
export const getDashboard = () => async (dispatch, getState) => {
    dispatch(dashboardStart());
    const { role } = getState().auth;

    try {
        const token = localStorage.getItem('token');
        const res = await fetch(`${prefix + role}/dashboard`, {
            headers: {
                Authorization: token
            }
        });
        const resData = await res.json();
        dispatch(dashboardSuccess(resData));
    } catch (error) {
        console.log(error);
        dispatch(dashboardFail(error));
    }
};



export const resetFeatures = () => ({ type: actionTypes.FEATURES_RESET });
const featuresStart = () => ({ type: actionTypes.FEATURES_START });
const featuresSuccess = data => ({ type: actionTypes.FEATURES_SUCCESS, ...data });
const featuresFail = error => ({ type: actionTypes.FEATURES_FAIL, error });
export const getFeatures = (page = 1, show = 10, search = '') => async (dispatch, getState) => {
    dispatch(featuresStart());
    const { role } = getState().auth;

    try {
        const token = localStorage.getItem('token');
        const res = await fetch(`${prefix + role}/features?page=${page}&show=${show}&search=${search}`, {
            headers: {
                Authorization: token
            }
        });
        const resData = await res.json();
        dispatch(featuresSuccess(resData));
    } catch (error) {
        console.log(error);
        dispatch(featuresFail(error));
    }
};

export const getFeature = id => async (dispatch, getState) => {
    dispatch(featuresStart());
    const { role } = getState().auth;

    try {
        const token = localStorage.getItem('token');
        const res = await fetch(`${prefix + role}/features/${id}`, {
            headers: {
                Authorization: token
            }
        });
        const resData = await res.json();
        dispatch(featuresSuccess(resData));
    } catch (error) {
        console.log(error);
        dispatch(featuresFail(error));
    }
};

export const postFeatures = data => async (dispatch, getState) => {
    dispatch(featuresStart());
    const { role } = getState().auth;

    try {
        const token = localStorage.getItem('token');
        const form = new FormData(data);
        const res = await fetch(`${prefix + role}/features`, {
            method: 'POST',
            body: form,
            headers: {
                Authorization: token
            }
        });
        const resData = await res.json();
        if (res.status === 422) throw new Error(Object.values(resData.errors).join('\n'));
        else if (res.status !== 200 && res.status !== 201) throw new Error(resData.error.message);
        dispatch(featuresSuccess(resData));
    } catch (error) {
        console.log(error);
        dispatch(featuresFail(error));
    }
};

export const patchFeatures = (id, data) => async (dispatch, getState) => {
    dispatch(featuresStart());
    const { role } = getState().auth;

    try {
        const token = localStorage.getItem('token');
        const form = new FormData(data);
        const res = await fetch(`${prefix + role}/features/${id}`, {
            method: 'POST',
            body: form,
            headers: {
                Authorization: token,
            }
        });
        const resData = await res.json();
        if (res.status === 422) throw new Error(Object.values(resData.errors).join('\n'));
        dispatch(featuresSuccess(resData));
    } catch (error) {
        console.log(error);
        dispatch(featuresFail(error));
    }
};

export const deleteFeatures = id => async (dispatch, getState) => {
    dispatch(featuresStart());
    const { role } = getState().auth;

    try {
        const page = document.getElementById('table-page').value;
        const show = document.getElementById('table-show').value;
        const search = document.getElementById('table-search').value;

        const token = localStorage.getItem('token');
        const res = await fetch(`${prefix + role}/features/${id}?page=${page}&show=${show}&search=${search}`, {
            method: 'DELETE',
            headers: {
                Authorization: token
            }
        });
        const resData = await res.json();
        if (res.status === 422) throw new Error(Object.values(resData.errors).join('\n'));
        dispatch(featuresSuccess(resData));
    } catch (error) {
        console.log(error);
        dispatch(featuresFail(error));
    }
};



export const resetClaims = () => ({ type: actionTypes.CLAIMS_RESET });
const claimsStart = () => ({ type: actionTypes.CLAIMS_START });
const claimsSuccess = data => ({ type: actionTypes.CLAIMS_SUCCESS, ...data });
const claimsFail = error => ({ type: actionTypes.CLAIMS_FAIL, error });
export const getClaims = (page = 1, show = 10, search = '') => async (dispatch, getState) => {
    dispatch(claimsStart());
    const { role } = getState().auth;

    try {
        const token = localStorage.getItem('token');
        const res = await fetch(`${prefix + role}/claims?page=${page}&show=${show}&search=${search}`, {
            headers: {
                Authorization: token
            }
        });
        const resData = await res.json();
        dispatch(claimsSuccess(resData));
    } catch (error) {
        console.log(error);
        dispatch(claimsFail(error));
    }
};

export const getClaimsInfo = () => async (dispatch, getState) => {
    dispatch(claimsStart());
    const { role } = getState().auth;

    try {
        const token = localStorage.getItem('token');
        const res = await fetch(`${prefix + role}/claims/info`, {
            headers: {
                Authorization: token
            }
        });
        const resData = await res.json();
        dispatch(claimsSuccess(resData));
    } catch (error) {
        console.log(error);
        dispatch(claimsFail(error));
    }
};

export const getClaim = id => async (dispatch, getState) => {
    dispatch(claimsStart());
    const { role } = getState().auth;

    try {
        const token = localStorage.getItem('token');
        const res = await fetch(`${prefix + role}/claims/${id}`, {
            headers: {
                Authorization: token
            }
        });
        const resData = await res.json();
        dispatch(claimsSuccess(resData));
    } catch (error) {
        console.log(error);
        dispatch(claimsFail(error));
    }
};

export const postClaims = data => async (dispatch, getState) => {
    dispatch(claimsStart());
    const { role } = getState().auth;

    try {
        const token = localStorage.getItem('token');
        const form = new FormData(data);
        const res = await fetch(`${prefix + role}/claims`, {
            method: 'POST',
            body: form,
            headers: {
                Authorization: token
            }
        });
        const resData = await res.json();
        if (res.status === 422) throw new Error(Object.values(resData.errors).join('\n'));
        else if (res.status !== 200 && res.status !== 201) throw new Error(resData.error.message);
        dispatch(claimsSuccess(resData));
    } catch (error) {
        console.log(error);
        dispatch(claimsFail(error));
    }
};

export const patchClaims = (id, data) => async (dispatch, getState) => {
    dispatch(claimsStart());
    const { role } = getState().auth;

    try {
        const token = localStorage.getItem('token');
        const form = new FormData(data);
        const res = await fetch(`${prefix + role}/claims/${id}`, {
            method: 'POST',
            body: form,
            headers: {
                Authorization: token,
            }
        });
        const resData = await res.json();
        if (res.status === 422) throw new Error(Object.values(resData.errors).join('\n'));
        dispatch(claimsSuccess(resData));
    } catch (error) {
        console.log(error);
        dispatch(claimsFail(error));
    }
};

export const deleteClaims = id => async (dispatch, getState) => {
    dispatch(claimsStart());
    const { role } = getState().auth;

    try {
        const page = document.getElementById('table-page').value;
        const show = document.getElementById('table-show').value;
        const search = document.getElementById('table-search').value;

        const token = localStorage.getItem('token');
        const res = await fetch(`${prefix + role}/claims/${id}?page=${page}&show=${show}&search=${search}`, {
            method: 'DELETE',
            headers: {
                Authorization: token
            }
        });
        const resData = await res.json();
        if (res.status === 422) throw new Error(Object.values(resData.errors).join('\n'));
        dispatch(claimsSuccess(resData));
    } catch (error) {
        console.log(error);
        dispatch(claimsFail(error));
    }
};



export const resetDebts = () => ({ type: actionTypes.DEBTS_RESET });
const debtsStart = () => ({ type: actionTypes.DEBTS_START });
const debtsSuccess = data => ({ type: actionTypes.DEBTS_SUCCESS, ...data });
const debtsFail = error => ({ type: actionTypes.DEBTS_FAIL, error });
export const getDebts = (page = 1, show = 10, search = '') => async (dispatch, getState) => {
    dispatch(debtsStart());
    const { role } = getState().auth;

    try {
        const token = localStorage.getItem('token');
        const res = await fetch(`${prefix + role}/debts?page=${page}&show=${show}&search=${search}`, {
            headers: {
                Authorization: token
            }
        });
        const resData = await res.json();
        dispatch(debtsSuccess(resData));
    } catch (error) {
        console.log(error);
        dispatch(debtsFail(error));
    }
};

export const getDebtsInfo = () => async (dispatch, getState) => {
    dispatch(debtsStart());
    const { role } = getState().auth;

    try {
        const token = localStorage.getItem('token');
        const res = await fetch(`${prefix + role}/debts/info`, {
            headers: {
                Authorization: token
            }
        });
        const resData = await res.json();
        dispatch(debtsSuccess(resData));
    } catch (error) {
        console.log(error);
        dispatch(debtsFail(error));
    }
};

export const getDebt = id => async (dispatch, getState) => {
    dispatch(debtsStart());
    const { role } = getState().auth;

    try {
        const token = localStorage.getItem('token');
        const res = await fetch(`${prefix + role}/debts/${id}`, {
            headers: {
                Authorization: token
            }
        });
        const resData = await res.json();
        dispatch(debtsSuccess(resData));
    } catch (error) {
        console.log(error);
        dispatch(debtsFail(error));
    }
};

export const postDebts = data => async (dispatch, getState) => {
    dispatch(debtsStart());
    const { role } = getState().auth;

    try {
        const token = localStorage.getItem('token');
        const form = new FormData(data);
        const res = await fetch(`${prefix + role}/debts`, {
            method: 'POST',
            body: form,
            headers: {
                Authorization: token
            }
        });
        const resData = await res.json();
        if (res.status === 422) throw new Error(Object.values(resData.errors).join('\n'));
        else if (res.status !== 200 && res.status !== 201) throw new Error(resData.error.message);
        dispatch(debtsSuccess(resData));
    } catch (error) {
        console.log(error);
        dispatch(debtsFail(error));
    }
};

export const patchDebts = (id, data) => async (dispatch, getState) => {
    dispatch(debtsStart());
    const { role } = getState().auth;

    try {
        const token = localStorage.getItem('token');
        const form = new FormData(data);
        const res = await fetch(`${prefix + role}/debts/${id}`, {
            method: 'POST',
            body: form,
            headers: {
                Authorization: token,
            }
        });
        const resData = await res.json();
        if (res.status === 422) throw new Error(Object.values(resData.errors).join('\n'));
        dispatch(debtsSuccess(resData));
    } catch (error) {
        console.log(error);
        dispatch(debtsFail(error));
    }
};

export const deleteDebts = id => async (dispatch, getState) => {
    dispatch(debtsStart());
    const { role } = getState().auth;

    try {
        const page = document.getElementById('table-page').value;
        const show = document.getElementById('table-show').value;
        const search = document.getElementById('table-search').value;

        const token = localStorage.getItem('token');
        const res = await fetch(`${prefix + role}/debts/${id}?page=${page}&show=${show}&search=${search}`, {
            method: 'DELETE',
            headers: {
                Authorization: token
            }
        });
        const resData = await res.json();
        if (res.status === 422) throw new Error(Object.values(resData.errors).join('\n'));
        dispatch(debtsSuccess(resData));
    } catch (error) {
        console.log(error);
        dispatch(debtsFail(error));
    }
};



export const resetEntries = () => ({ type: actionTypes.ENTRIES_RESET });
const entriesStart = () => ({ type: actionTypes.ENTRIES_START });
const entriesSuccess = data => ({ type: actionTypes.ENTRIES_SUCCESS, ...data });
const entriesFail = error => ({ type: actionTypes.ENTRIES_FAIL, error });
export const getEntries = (page = 1, show = 10, search = '') => async (dispatch, getState) => {
    dispatch(entriesStart());
    const { role } = getState().auth;

    try {
        const token = localStorage.getItem('token');
        const res = await fetch(`${prefix + role}/entries?page=${page}&show=${show}&search=${search}`, {
            headers: {
                Authorization: token
            }
        });
        const resData = await res.json();
        dispatch(entriesSuccess(resData));
    } catch (error) {
        console.log(error);
        dispatch(entriesFail(error));
    }
};

export const getEntriesInfo = () => async (dispatch, getState) => {
    dispatch(entriesStart());
    const { role } = getState().auth;

    try {
        const token = localStorage.getItem('token');
        const res = await fetch(`${prefix + role}/entries/info`, {
            headers: {
                Authorization: token
            }
        });
        const resData = await res.json();
        dispatch(entriesSuccess(resData));
    } catch (error) {
        console.log(error);
        dispatch(entriesFail(error));
    }
};

export const getEntry = id => async (dispatch, getState) => {
    dispatch(entriesStart());
    const { role } = getState().auth;

    try {
        const token = localStorage.getItem('token');
        const res = await fetch(`${prefix + role}/entries/${id}`, {
            headers: {
                Authorization: token
            }
        });
        const resData = await res.json();
        dispatch(entriesSuccess(resData));
    } catch (error) {
        console.log(error);
        dispatch(entriesFail(error));
    }
};

export const postEntries = data => async (dispatch, getState) => {
    dispatch(entriesStart());
    const { role } = getState().auth;

    try {
        const token = localStorage.getItem('token');
        const form = new FormData(data);
        const res = await fetch(`${prefix + role}/entries`, {
            method: 'POST',
            body: form,
            headers: {
                Authorization: token
            }
        });
        const resData = await res.json();
        if (res.status === 422) throw new Error(Object.values(resData.errors).join('\n'));
        else if (res.status !== 200 && res.status !== 201) throw new Error(resData.error.message);
        dispatch(entriesSuccess(resData));
    } catch (error) {
        console.log(error);
        dispatch(entriesFail(error));
    }
};

export const patchEntries = (id, data) => async (dispatch, getState) => {
    dispatch(entriesStart());
    const { role } = getState().auth;

    try {
        const token = localStorage.getItem('token');
        const form = new FormData(data);
        const res = await fetch(`${prefix + role}/entries/${id}`, {
            method: 'POST',
            body: form,
            headers: {
                Authorization: token,
            }
        });
        const resData = await res.json();
        if (res.status === 422) throw new Error(Object.values(resData.errors).join('\n'));
        dispatch(entriesSuccess(resData));
    } catch (error) {
        console.log(error);
        dispatch(entriesFail(error));
    }
};

export const deleteEntries = id => async (dispatch, getState) => {
    dispatch(entriesStart());
    const { role } = getState().auth;

    try {
        const page = document.getElementById('table-page').value;
        const show = document.getElementById('table-show').value;
        const search = document.getElementById('table-search').value;

        const token = localStorage.getItem('token');
        const res = await fetch(`${prefix + role}/entries/${id}?page=${page}&show=${show}&search=${search}`, {
            method: 'DELETE',
            headers: {
                Authorization: token
            }
        });
        const resData = await res.json();
        if (res.status === 422) throw new Error(Object.values(resData.errors).join('\n'));
        dispatch(entriesSuccess(resData));
    } catch (error) {
        console.log(error);
        dispatch(entriesFail(error));
    }
};



export const resetExpenses = () => ({ type: actionTypes.EXPENSES_RESET });
const expensesStart = () => ({ type: actionTypes.EXPENSES_START });
const expensesSuccess = data => ({ type: actionTypes.EXPENSES_SUCCESS, ...data });
const expensesFail = error => ({ type: actionTypes.EXPENSES_FAIL, error });
export const getExpenses = (page = 1, show = 10, search = '') => async (dispatch, getState) => {
    dispatch(expensesStart());
    const { role } = getState().auth;

    try {
        const token = localStorage.getItem('token');
        const res = await fetch(`${prefix + role}/expenses?page=${page}&show=${show}&search=${search}`, {
            headers: {
                Authorization: token
            }
        });
        const resData = await res.json();
        dispatch(expensesSuccess(resData));
    } catch (error) {
        console.log(error);
        dispatch(expensesFail(error));
    }
};

export const getExpensesInfo = () => async (dispatch, getState) => {
    dispatch(expensesStart());
    const { role } = getState().auth;

    try {
        const token = localStorage.getItem('token');
        const res = await fetch(`${prefix + role}/expenses/info`, {
            headers: {
                Authorization: token
            }
        });
        const resData = await res.json();
        dispatch(expensesSuccess(resData));
    } catch (error) {
        console.log(error);
        dispatch(expensesFail(error));
    }
};

export const getExpense = id => async (dispatch, getState) => {
    dispatch(expensesStart());
    const { role } = getState().auth;

    try {
        const token = localStorage.getItem('token');
        const res = await fetch(`${prefix + role}/expenses/${id}`, {
            headers: {
                Authorization: token
            }
        });
        const resData = await res.json();
        dispatch(expensesSuccess(resData));
    } catch (error) {
        console.log(error);
        dispatch(expensesFail(error));
    }
};

export const postExpenses = data => async (dispatch, getState) => {
    dispatch(expensesStart());
    const { role } = getState().auth;

    try {
        const token = localStorage.getItem('token');
        const form = new FormData(data);
        const res = await fetch(`${prefix + role}/expenses`, {
            method: 'POST',
            body: form,
            headers: {
                Authorization: token
            }
        });
        const resData = await res.json();
        if (res.status === 422) throw new Error(Object.values(resData.errors).join('\n'));
        else if (res.status !== 200 && res.status !== 201) throw new Error(resData.error.message);
        dispatch(expensesSuccess(resData));
    } catch (error) {
        console.log(error);
        dispatch(expensesFail(error));
    }
};

export const patchExpenses = (id, data) => async (dispatch, getState) => {
    dispatch(expensesStart());
    const { role } = getState().auth;

    try {
        const token = localStorage.getItem('token');
        const form = new FormData(data);
        const res = await fetch(`${prefix + role}/expenses/${id}`, {
            method: 'POST',
            body: form,
            headers: {
                Authorization: token,
            }
        });
        const resData = await res.json();
        if (res.status === 422) throw new Error(Object.values(resData.errors).join('\n'));
        dispatch(expensesSuccess(resData));
    } catch (error) {
        console.log(error);
        dispatch(expensesFail(error));
    }
};

export const deleteExpenses = id => async (dispatch, getState) => {
    dispatch(expensesStart());
    const { role } = getState().auth;

    try {
        const page = document.getElementById('table-page').value;
        const show = document.getElementById('table-show').value;
        const search = document.getElementById('table-search').value;

        const token = localStorage.getItem('token');
        const res = await fetch(`${prefix + role}/expenses/${id}?page=${page}&show=${show}&search=${search}`, {
            method: 'DELETE',
            headers: {
                Authorization: token
            }
        });
        const resData = await res.json();
        if (res.status === 422) throw new Error(Object.values(resData.errors).join('\n'));
        dispatch(expensesSuccess(resData));
    } catch (error) {
        console.log(error);
        dispatch(expensesFail(error));
    }
};



export const resetInvestments = () => ({ type: actionTypes.INVESTMENTS_RESET });
const investmentsStart = () => ({ type: actionTypes.INVESTMENTS_START });
const investmentsSuccess = data => ({ type: actionTypes.INVESTMENTS_SUCCESS, ...data });
const investmentsFail = error => ({ type: actionTypes.INVESTMENTS_FAIL, error });
export const getInvestments = (page = 1, show = 10, search = '') => async (dispatch, getState) => {
    dispatch(investmentsStart());
    const { role } = getState().auth;

    try {
        const token = localStorage.getItem('token');
        const res = await fetch(`${prefix + role}/investments?page=${page}&show=${show}&search=${search}`, {
            headers: {
                Authorization: token
            }
        });
        const resData = await res.json();
        dispatch(investmentsSuccess(resData));
    } catch (error) {
        console.log(error);
        dispatch(investmentsFail(error));
    }
};

export const getInvestmentsInfo = () => async (dispatch, getState) => {
    dispatch(investmentsStart());
    const { role } = getState().auth;

    try {
        const token = localStorage.getItem('token');
        const res = await fetch(`${prefix + role}/investments/info`, {
            headers: {
                Authorization: token
            }
        });
        const resData = await res.json();
        dispatch(investmentsSuccess(resData));
    } catch (error) {
        console.log(error);
        dispatch(investmentsFail(error));
    }
};

export const getInvestment = id => async (dispatch, getState) => {
    dispatch(investmentsStart());
    const { role } = getState().auth;

    try {
        const token = localStorage.getItem('token');
        const res = await fetch(`${prefix + role}/investments/${id}`, {
            headers: {
                Authorization: token
            }
        });
        const resData = await res.json();
        dispatch(investmentsSuccess(resData));
    } catch (error) {
        console.log(error);
        dispatch(investmentsFail(error));
    }
};

export const postInvestments = data => async (dispatch, getState) => {
    dispatch(investmentsStart());
    const { role } = getState().auth;

    try {
        const token = localStorage.getItem('token');
        const form = new FormData(data);
        const res = await fetch(`${prefix + role}/investments`, {
            method: 'POST',
            body: form,
            headers: {
                Authorization: token
            }
        });
        const resData = await res.json();
        if (res.status === 422) throw new Error(Object.values(resData.errors).join('\n'));
        else if (res.status !== 200 && res.status !== 201) throw new Error(resData.error.message);
        dispatch(investmentsSuccess(resData));
    } catch (error) {
        console.log(error);
        dispatch(investmentsFail(error));
    }
};

export const patchInvestments = (id, data) => async (dispatch, getState) => {
    dispatch(investmentsStart());
    const { role } = getState().auth;

    try {
        const token = localStorage.getItem('token');
        const form = new FormData(data);
        const res = await fetch(`${prefix + role}/investments/${id}`, {
            method: 'POST',
            body: form,
            headers: {
                Authorization: token,
            }
        });
        const resData = await res.json();
        if (res.status === 422) throw new Error(Object.values(resData.errors).join('\n'));
        dispatch(investmentsSuccess(resData));
    } catch (error) {
        console.log(error);
        dispatch(investmentsFail(error));
    }
};

export const deleteInvestments = id => async (dispatch, getState) => {
    dispatch(investmentsStart());
    const { role } = getState().auth;

    try {
        const page = document.getElementById('table-page').value;
        const show = document.getElementById('table-show').value;
        const search = document.getElementById('table-search').value;

        const token = localStorage.getItem('token');
        const res = await fetch(`${prefix + role}/investments/${id}?page=${page}&show=${show}&search=${search}`, {
            method: 'DELETE',
            headers: {
                Authorization: token
            }
        });
        const resData = await res.json();
        if (res.status === 422) throw new Error(Object.values(resData.errors).join('\n'));
        dispatch(investmentsSuccess(resData));
    } catch (error) {
        console.log(error);
        dispatch(investmentsFail(error));
    }
};



export const resetSupports = () => ({ type: actionTypes.SUPPORTS_RESET });
const supportsStart = () => ({ type: actionTypes.SUPPORTS_START });
const supportsSuccess = data => ({ type: actionTypes.SUPPORTS_SUCCESS, ...data });
const supportsFail = error => ({ type: actionTypes.SUPPORTS_FAIL, error });
export const getSupports = (page = 1, show = 10, search = '') => async (dispatch, getState) => {
    dispatch(supportsStart());
    const { role } = getState().auth;

    try {
        const token = localStorage.getItem('token');
        const res = await fetch(`${prefix + role}/supports?page=${page}&show=${show}&search=${search}`, {
            headers: {
                Authorization: token
            }
        });
        const resData = await res.json();
        dispatch(supportsSuccess(resData));
    } catch (error) {
        console.log(error);
        dispatch(supportsFail(error));
    }
};

export const getSupportsInfo = () => async (dispatch, getState) => {
    dispatch(supportsStart());
    const { role } = getState().auth;

    try {
        const token = localStorage.getItem('token');
        const res = await fetch(`${prefix + role}/supports/info`, {
            headers: {
                Authorization: token
            }
        });
        const resData = await res.json();
        dispatch(supportsSuccess(resData));
    } catch (error) {
        console.log(error);
        dispatch(supportsFail(error));
    }
};

export const getSupport = id => async (dispatch, getState) => {
    dispatch(supportsStart());
    const { role } = getState().auth;

    try {
        const token = localStorage.getItem('token');
        const res = await fetch(`${prefix + role}/supports/${id}`, {
            headers: {
                Authorization: token
            }
        });
        const resData = await res.json();
        dispatch(supportsSuccess(resData));
    } catch (error) {
        console.log(error);
        dispatch(supportsFail(error));
    }
};

export const postSupports = data => async (dispatch, getState) => {
    dispatch(supportsStart());
    const { role } = getState().auth;

    try {
        const token = localStorage.getItem('token');
        const form = new FormData(data);
        const res = await fetch(`${prefix + role}/supports`, {
            method: 'POST',
            body: form,
            headers: {
                Authorization: token
            }
        });
        const resData = await res.json();
        if (res.status === 422) throw new Error(Object.values(resData.errors).join('\n'));
        else if (res.status !== 200 && res.status !== 201) throw new Error(resData.error.message);
        dispatch(supportsSuccess(resData));
    } catch (error) {
        console.log(error);
        dispatch(supportsFail(error));
    }
};

export const patchSupports = (id, data) => async (dispatch, getState) => {
    dispatch(supportsStart());
    const { role } = getState().auth;

    try {
        const token = localStorage.getItem('token');
        const form = new FormData(data);
        const res = await fetch(`${prefix + role}/supports/${id}`, {
            method: 'POST',
            body: form,
            headers: {
                Authorization: token,
            }
        });
        const resData = await res.json();
        if (res.status === 422) throw new Error(Object.values(resData.errors).join('\n'));
        dispatch(supportsSuccess(resData));
    } catch (error) {
        console.log(error);
        dispatch(supportsFail(error));
    }
};

export const deleteSupports = id => async (dispatch, getState) => {
    dispatch(supportsStart());
    const { role } = getState().auth;

    try {
        const page = document.getElementById('table-page').value;
        const show = document.getElementById('table-show').value;
        const search = document.getElementById('table-search').value;

        const token = localStorage.getItem('token');
        const res = await fetch(`${prefix + role}/supports/${id}?page=${page}&show=${show}&search=${search}`, {
            method: 'DELETE',
            headers: {
                Authorization: token
            }
        });
        const resData = await res.json();
        if (res.status === 422) throw new Error(Object.values(resData.errors).join('\n'));
        dispatch(supportsSuccess(resData));
    } catch (error) {
        console.log(error);
        dispatch(supportsFail(error));
    }
};



export const resetCurrencies = () => ({ type: actionTypes.CURRENCIES_RESET });
const currenciesStart = () => ({ type: actionTypes.CURRENCIES_START });
const currenciesSuccess = data => ({ type: actionTypes.CURRENCIES_SUCCESS, ...data });
const currenciesFail = error => ({ type: actionTypes.CURRENCIES_FAIL, error });
export const getCurrencies = (page = 1, show = 10, search = '') => async (dispatch, getState) => {
    dispatch(currenciesStart());
    const { role } = getState().auth;

    try {
        const token = localStorage.getItem('token');
        const res = await fetch(`${prefix + role}/currencies?page=${page}&show=${show}&search=${search}`, {
            headers: {
                Authorization: token
            }
        });
        const resData = await res.json();
        dispatch(currenciesSuccess(resData));
    } catch (error) {
        console.log(error);
        dispatch(currenciesFail(error));
    }
};

export const getCurrency = id => async (dispatch, getState) => {
    dispatch(currenciesStart());
    const { role } = getState().auth;

    try {
        const token = localStorage.getItem('token');
        const res = await fetch(`${prefix + role}/currencies/${id}`, {
            headers: {
                Authorization: token
            }
        });
        const resData = await res.json();
        dispatch(currenciesSuccess(resData));
    } catch (error) {
        console.log(error);
        dispatch(currenciesFail(error));
    }
};

export const postCurrencies = data => async (dispatch, getState) => {
    dispatch(currenciesStart());
    const { role } = getState().auth;

    try {
        const token = localStorage.getItem('token');
        const form = new FormData(data);
        const res = await fetch(`${prefix + role}/currencies`, {
            method: 'POST',
            body: form,
            headers: {
                Authorization: token
            }
        });
        const resData = await res.json();
        if (res.status === 422) throw new Error(Object.values(resData.errors).join('\n'));
        else if (res.status !== 200 && res.status !== 201) throw new Error(resData.error.message);
        dispatch(currenciesSuccess(resData));
    } catch (error) {
        console.log(error);
        dispatch(currenciesFail(error));
    }
};

export const patchCurrencies = (id, data) => async (dispatch, getState) => {
    dispatch(currenciesStart());
    const { role } = getState().auth;

    try {
        const token = localStorage.getItem('token');
        const form = new FormData(data);
        const res = await fetch(`${prefix + role}/currencies/${id}`, {
            method: 'POST',
            body: form,
            headers: {
                Authorization: token,
            }
        });
        const resData = await res.json();
        if (res.status === 422) throw new Error(Object.values(resData.errors).join('\n'));
        dispatch(currenciesSuccess(resData));
    } catch (error) {
        console.log(error);
        dispatch(currenciesFail(error));
    }
};

export const deleteCurrencies = id => async (dispatch, getState) => {
    dispatch(currenciesStart());
    const { role } = getState().auth;

    try {
        const page = document.getElementById('table-page').value;
        const show = document.getElementById('table-show').value;
        const search = document.getElementById('table-search').value;

        const token = localStorage.getItem('token');
        const res = await fetch(`${prefix + role}/currencies/${id}?page=${page}&show=${show}&search=${search}`, {
            method: 'DELETE',
            headers: {
                Authorization: token
            }
        });
        const resData = await res.json();
        if (res.status === 422) throw new Error(Object.values(resData.errors).join('\n'));
        dispatch(currenciesSuccess(resData));
    } catch (error) {
        console.log(error);
        dispatch(currenciesFail(error));
    }
};



export const resetReport = () => ({ type: actionTypes.REPORT_RESET });
const reportStart = () => ({ type: actionTypes.REPORT_START });
const reportSuccess = data => ({ type: actionTypes.REPORT_SUCCESS, ...data });
const reportFail = error => ({ type: actionTypes.REPORT_FAIL, error });

export const postReport = data => async (dispatch, getState) => {
    dispatch(reportStart());
    const { role } = getState().auth;

    try {
        const token = localStorage.getItem('token');
        const form = new FormData(data);
        const res = await fetch(`${prefix + role}/report`, {
            method: 'POST',
            body: form,
            headers: {
                Authorization: token
            }
        });
        const resData = await res.json();
        if (res.status === 422) throw new Error(Object.values(resData.errors).join('\n'));
        else if (res.status !== 200 && res.status !== 201) throw new Error(resData.error.message);
        dispatch(reportSuccess(resData));
    } catch (error) {
        console.log(error);
        dispatch(reportFail(error));
    }
};



export const resetLanguages = () => ({ type: actionTypes.LANGUAGES_RESET });
const languagesStart = () => ({ type: actionTypes.LANGUAGES_START });
const languagesSuccess = data => ({ type: actionTypes.LANGUAGES_SUCCESS, ...data });
const languagesFail = error => ({ type: actionTypes.LANGUAGES_FAIL, error });
export const getLanguages = (page = 1, show = 10, search = '') => async (dispatch, getState) => {
    dispatch(languagesStart());
    const { role } = getState().auth;

    try {
        const token = localStorage.getItem('token');
        const res = await fetch(`${prefix + role}/languages?page=${page}&show=${show}&search=${search}`, {
            headers: {
                Authorization: token
            }
        });
        const resData = await res.json();
        dispatch(languagesSuccess(resData));
    } catch (error) {
        console.log(error);
        dispatch(languagesFail(error));
    }
};

export const getLanguage = id => async (dispatch, getState) => {
    dispatch(languagesStart());
    const { role } = getState().auth;

    try {
        const token = localStorage.getItem('token');
        const res = await fetch(`${prefix + role}/languages/${id}`, {
            headers: {
                Authorization: token
            }
        });
        const resData = await res.json();
        dispatch(languagesSuccess(resData));
    } catch (error) {
        console.log(error);
        dispatch(languagesFail(error));
    }
};

export const postLanguages = data => async (dispatch, getState) => {
    dispatch(languagesStart());
    const { role } = getState().auth;

    try {
        const token = localStorage.getItem('token');
        const form = new FormData(data);
        const res = await fetch(`${prefix + role}/languages`, {
            method: 'POST',
            body: form,
            headers: {
                Authorization: token
            }
        });
        const resData = await res.json();
        if (res.status === 422) throw new Error(Object.values(resData.errors).join('\n'));
        else if (res.status !== 200 && res.status !== 201) throw new Error(resData.error.message);
        dispatch(languagesSuccess(resData));
    } catch (error) {
        console.log(error);
        dispatch(languagesFail(error));
    }
};

export const patchLanguages = (id, data) => async (dispatch, getState) => {
    dispatch(languagesStart());
    const { role } = getState().auth;

    try {
        const token = localStorage.getItem('token');
        const form = new FormData(data);
        const res = await fetch(`${prefix + role}/languages/${id}`, {
            method: 'POST',
            body: form,
            headers: {
                Authorization: token,
            }
        });
        const resData = await res.json();
        if (res.status === 422) throw new Error(Object.values(resData.errors).join('\n'));
        dispatch(languagesSuccess(resData));
    } catch (error) {
        console.log(error);
        dispatch(languagesFail(error));
    }
};

export const deleteLanguages = id => async (dispatch, getState) => {
    dispatch(languagesStart());
    const { role } = getState().auth;

    try {
        const page = document.getElementById('table-page').value;
        const show = document.getElementById('table-show').value;
        const search = document.getElementById('table-search').value;

        const token = localStorage.getItem('token');
        const res = await fetch(`${prefix + role}/languages/${id}?page=${page}&show=${show}&search=${search}`, {
            method: 'DELETE',
            headers: {
                Authorization: token
            }
        });
        const resData = await res.json();
        if (res.status === 422) throw new Error(Object.values(resData.errors).join('\n'));
        dispatch(languagesSuccess(resData));
    } catch (error) {
        console.log(error);
        dispatch(languagesFail(error));
    }
};



export const resetPlatforms = () => ({ type: actionTypes.PLATFORMS_RESET });
const platformsStart = () => ({ type: actionTypes.PLATFORMS_START });
const platformsSuccess = data => ({ type: actionTypes.PLATFORMS_SUCCESS, ...data });
const platformsFail = error => ({ type: actionTypes.PLATFORMS_FAIL, error });
export const getPlatforms = (page = 1, show = 10, search = '') => async (dispatch, getState) => {
    dispatch(platformsStart());
    const { role } = getState().auth;

    try {
        const token = localStorage.getItem('token');
        const res = await fetch(`${prefix + role}/platforms?page=${page}&show=${show}&search=${search}`, {
            headers: {
                Authorization: token
            }
        });
        const resData = await res.json();
        dispatch(platformsSuccess(resData));
    } catch (error) {
        console.log(error);
        dispatch(platformsFail(error));
    }
};

export const getPlatform = id => async (dispatch, getState) => {
    dispatch(platformsStart());
    const { role } = getState().auth;

    try {
        const token = localStorage.getItem('token');
        const res = await fetch(`${prefix + role}/platforms/${id}`, {
            headers: {
                Authorization: token
            }
        });
        const resData = await res.json();
        dispatch(platformsSuccess(resData));
    } catch (error) {
        console.log(error);
        dispatch(platformsFail(error));
    }
};

export const postPlatforms = data => async (dispatch, getState) => {
    dispatch(platformsStart());
    const { role } = getState().auth;

    try {
        const token = localStorage.getItem('token');
        const form = new FormData(data);
        const res = await fetch(`${prefix + role}/platforms`, {
            method: 'POST',
            body: form,
            headers: {
                Authorization: token
            }
        });
        const resData = await res.json();
        if (res.status === 422) throw new Error(Object.values(resData.errors).join('\n'));
        else if (res.status !== 200 && res.status !== 201) throw new Error(resData.error.message);
        dispatch(platformsSuccess(resData));
    } catch (error) {
        console.log(error);
        dispatch(platformsFail(error));
    }
};

export const patchPlatforms = (id, data) => async (dispatch, getState) => {
    dispatch(platformsStart());
    const { role } = getState().auth;

    try {
        const token = localStorage.getItem('token');
        const form = new FormData(data);
        const res = await fetch(`${prefix + role}/platforms/${id}`, {
            method: 'POST',
            body: form,
            headers: {
                Authorization: token,
            }
        });
        const resData = await res.json();
        if (res.status === 422) throw new Error(Object.values(resData.errors).join('\n'));
        dispatch(platformsSuccess(resData));
    } catch (error) {
        console.log(error);
        dispatch(platformsFail(error));
    }
};

export const deletePlatforms = id => async (dispatch, getState) => {
    dispatch(platformsStart());
    const { role } = getState().auth;

    try {
        const page = document.getElementById('table-page').value;
        const show = document.getElementById('table-show').value;
        const search = document.getElementById('table-search').value;

        const token = localStorage.getItem('token');
        const res = await fetch(`${prefix + role}/platforms/${id}?page=${page}&show=${show}&search=${search}`, {
            method: 'DELETE',
            headers: {
                Authorization: token
            }
        });
        const resData = await res.json();
        if (res.status === 422) throw new Error(Object.values(resData.errors).join('\n'));
        dispatch(platformsSuccess(resData));
    } catch (error) {
        console.log(error);
        dispatch(platformsFail(error));
    }
};



export const resetRoles = () => ({ type: actionTypes.ROLES_RESET });
const rolesStart = () => ({ type: actionTypes.ROLES_START });
const rolesSuccess = data => ({ type: actionTypes.ROLES_SUCCESS, ...data });
const rolesFail = error => ({ type: actionTypes.ROLES_FAIL, error });
export const getRoles = (page = 1, show = 10, search = '') => async (dispatch, getState) => {
    dispatch(rolesStart());
    const { role } = getState().auth;

    try {
        const token = localStorage.getItem('token');
        const res = await fetch(`${prefix + role}/roles?page=${page}&show=${show}&search=${search}`, {
            headers: {
                Authorization: token
            }
        });
        const resData = await res.json();
        dispatch(rolesSuccess(resData));
    } catch (error) {
        console.log(error);
        dispatch(rolesFail(error));
    }
};

export const getRole = id => async (dispatch, getState) => {
    dispatch(rolesStart());
    const { role } = getState().auth;

    try {
        const token = localStorage.getItem('token');
        const res = await fetch(`${prefix + role}/roles/${id}`, {
            headers: {
                Authorization: token
            }
        });
        const resData = await res.json();
        dispatch(rolesSuccess(resData));
    } catch (error) {
        console.log(error);
        dispatch(rolesFail(error));
    }
};

export const getRolesInfo = () => async (dispatch, getState) => {
    dispatch(rolesStart());
    const { role } = getState().auth;

    try {
        const token = localStorage.getItem('token');
        const res = await fetch(`${prefix + role}/roles/info`, {
            headers: {
                Authorization: token
            }
        });
        const resData = await res.json();
        dispatch(rolesSuccess(resData));
    } catch (error) {
        console.log(error);
        dispatch(rolesFail(error));
    }
};

export const postRoles = data => async (dispatch, getState) => {
    dispatch(rolesStart());
    const { role } = getState().auth;

    try {
        const token = localStorage.getItem('token');
        const form = new FormData(data);
        const res = await fetch(`${prefix + role}/roles`, {
            method: 'POST',
            body: form,
            headers: {
                Authorization: token
            }
        });
        const resData = await res.json();
        if (res.status === 422) throw new Error(Object.values(resData.errors).join('\n'));
        else if (res.status !== 200 && res.status !== 201) throw new Error(resData.error.message);
        dispatch(rolesSuccess(resData));
    } catch (error) {
        console.log(error);
        dispatch(rolesFail(error));
    }
};

export const patchRoles = (id, data) => async (dispatch, getState) => {
    dispatch(rolesStart());
    const { role } = getState().auth;

    try {
        const token = localStorage.getItem('token');
        const form = new FormData(data);
        const res = await fetch(`${prefix + role}/roles/${id}`, {
            method: 'POST',
            body: form,
            headers: {
                Authorization: token,
            }
        });
        const resData = await res.json();
        if (res.status === 422) throw new Error(Object.values(resData.errors).join('\n'));
        dispatch(rolesSuccess(resData));
    } catch (error) {
        console.log(error);
        dispatch(rolesFail(error));
    }
};

export const deleteRoles = id => async (dispatch, getState) => {
    dispatch(rolesStart());
    const { role } = getState().auth;

    try {
        const page = document.getElementById('table-page').value;
        const show = document.getElementById('table-show').value;
        const search = document.getElementById('table-search').value;

        const token = localStorage.getItem('token');
        const res = await fetch(`${prefix + role}/roles/${id}?page=${page}&show=${show}&search=${search}`, {
            method: 'DELETE',
            headers: {
                Authorization: token
            }
        });
        const resData = await res.json();
        if (res.status === 422) throw new Error(Object.values(resData.errors).join('\n'));
        dispatch(rolesSuccess(resData));
    } catch (error) {
        console.log(error);
        dispatch(rolesFail(error));
    }
};



export const resetUsers = () => ({ type: actionTypes.USERS_RESET });
const usersStart = () => ({ type: actionTypes.USERS_START });
const usersSuccess = data => ({ type: actionTypes.USERS_SUCCESS, ...data });
const usersFail = error => ({ type: actionTypes.USERS_FAIL, error });
export const getUsers = (page = 1, show = 10, search = '') => async (dispatch, getState) => {
    dispatch(usersStart());
    const { role } = getState().auth;

    try {
        const token = localStorage.getItem('token');
        const res = await fetch(`${prefix + role}/users?page=${page}&show=${show}&search=${search}`, {
            headers: {
                Authorization: token
            }
        });
        const resData = await res.json();
        dispatch(usersSuccess(resData));
    } catch (error) {
        console.log(error);
        dispatch(usersFail(error));
    }
};

export const getUser = id => async (dispatch, getState) => {
    dispatch(usersStart());
    const { role } = getState().auth;

    try {
        const token = localStorage.getItem('token');
        const res = await fetch(`${prefix + role}/users/${id}`, {
            headers: {
                Authorization: token
            }
        });
        const resData = await res.json();
        dispatch(usersSuccess(resData));
    } catch (error) {
        console.log(error);
        dispatch(usersFail(error));
    }
};

export const getUsersInfo = () => async (dispatch, getState) => {
    dispatch(usersStart());
    const { role } = getState().auth;

    try {
        const token = localStorage.getItem('token');
        const res = await fetch(`${prefix + role}/users/info`, {
            headers: {
                Authorization: token
            }
        });
        const resData = await res.json();
        dispatch(usersSuccess(resData));
    } catch (error) {
        console.log(error);
        dispatch(usersFail(error));
    }
};

export const postUsers = data => async (dispatch, getState) => {
    dispatch(usersStart());
    const { role } = getState().auth;

    try {
        const token = localStorage.getItem('token');
        const form = new FormData(data);
        const res = await fetch(`${prefix + role}/users`, {
            method: 'POST',
            body: form,
            headers: {
                Authorization: token
            }
        });
        const resData = await res.json();
        if (res.status === 422) throw new Error(Object.values(resData.errors).join('\n'));
        else if (res.status !== 200 && res.status !== 201) throw new Error(resData.error.message);
        dispatch(usersSuccess(resData));
    } catch (error) {
        console.log(error);
        dispatch(usersFail(error));
    }
};

export const patchUsers = (id, data) => async (dispatch, getState) => {
    dispatch(usersStart());
    const { role } = getState().auth;

    try {
        const token = localStorage.getItem('token');
        const form = new FormData(data);
        const res = await fetch(`${prefix + role}/users/${id}`, {
            method: 'POST',
            body: form,
            headers: {
                Authorization: token,
            }
        });
        const resData = await res.json();
        if (res.status === 422) throw new Error(Object.values(resData.errors).join('\n'));
        dispatch(usersSuccess(resData));
    } catch (error) {
        console.log(error);
        dispatch(usersFail(error));
    }
};

export const deleteUsers = id => async (dispatch, getState) => {
    dispatch(usersStart());
    const { role } = getState().auth;

    try {
        const page = document.getElementById('table-page').value;
        const show = document.getElementById('table-show').value;
        const search = document.getElementById('table-search').value;

        const token = localStorage.getItem('token');
        const res = await fetch(`${prefix + role}/users/${id}?page=${page}&show=${show}&search=${search}`, {
            method: 'DELETE',
            headers: {
                Authorization: token
            }
        });
        const resData = await res.json();
        if (res.status === 422) throw new Error(Object.values(resData.errors).join('\n'));
        dispatch(usersSuccess(resData));
    } catch (error) {
        console.log(error);
        dispatch(usersFail(error));
    }
};
import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
    admins: {
        loading: false,
        error: null
    },
    cms: {
        loading: false,
        error: null
    },
    dashboard: {
        loading: false,
        error: null
    },
    features: {
        loading: false,
        error: null
    },
    languages: {
        loading: false,
        error: null
    },
    roles: {
        loading: false,
        error: null
    },
    users: {
        loading: false,
        error: null
    },

    
    claims: {
        loading: false,
        error: null
    },
    debts: {
        loading: false,
        error: null
    },
    entries: {
        loading: false,
        error: null
    },
    expenses: {
        loading: false,
        error: null
    },
    investments: {
        loading: false,
        error: null
    },
    supports: {
        loading: false,
        error: null
    },
    currencies: {
        loading: false,
        error: null
    },
    report: {
        loading: false,
        error: null
    },
};

const adminsReset = (state, action) => updateObject(state, { admins: initialState.admins });
const adminsStart = (state, action) => updateObject(state, { admins: updateObject(state.admins, { loading: true, message: null }) });
const adminsSuccess = (state, action) => updateObject(state, { admins: updateObject(state.admins, { loading: false, error: null, ...action }) });
const adminsFail = (state, action) => updateObject(state, { admins: updateObject(state.admins, { loading: false, ...action }) });

const cmsReset = (state, action) => updateObject(state, { cms: initialState.cms });
const cmsStart = (state, action) => updateObject(state, { cms: updateObject(state.cms, { loading: true, message: null }) });
const cmsSuccess = (state, action) => updateObject(state, { cms: updateObject(state.cms, { loading: false, error: null, ...action }) });
const cmsFail = (state, action) => updateObject(state, { cms: updateObject(state.cms, { loading: false, ...action }) });

const dashboardReset = (state, action) => updateObject(state, { dashboard: initialState.dashboard });
const dashboardStart = (state, action) => updateObject(state, { dashboard: updateObject(state.dashboard, { loading: true, message: null }) });
const dashboardSuccess = (state, action) => updateObject(state, { dashboard: updateObject(state.dashboard, { loading: false, error: null, ...action }) });
const dashboardFail = (state, action) => updateObject(state, { dashboard: updateObject(state.dashboard, { loading: false, ...action }) });

const featuresReset = (state, action) => updateObject(state, { features: initialState.features });
const featuresStart = (state, action) => updateObject(state, { features: updateObject(state.features, { loading: true, message: null }) });
const featuresSuccess = (state, action) => updateObject(state, { features: updateObject(state.features, { loading: false, error: null, ...action }) });
const featuresFail = (state, action) => updateObject(state, { features: updateObject(state.features, { loading: false, ...action }) });

const languagesReset = (state, action) => updateObject(state, { languages: initialState.languages });
const languagesStart = (state, action) => updateObject(state, { languages: updateObject(state.languages, { loading: true, message: null }) });
const languagesSuccess = (state, action) => updateObject(state, { languages: updateObject(state.languages, { loading: false, error: null, ...action }) });
const languagesFail = (state, action) => updateObject(state, { languages: updateObject(state.languages, { loading: false, ...action }) });

const rolesReset = (state, action) => updateObject(state, { roles: initialState.roles });
const rolesStart = (state, action) => updateObject(state, { roles: updateObject(state.roles, { loading: true, message: null }) });
const rolesSuccess = (state, action) => updateObject(state, { roles: updateObject(state.roles, { loading: false, error: null, ...action }) });
const rolesFail = (state, action) => updateObject(state, { roles: updateObject(state.roles, { loading: false, ...action }) });

const usersReset = (state, action) => updateObject(state, { users: initialState.users });
const usersStart = (state, action) => updateObject(state, { users: updateObject(state.users, { loading: true, message: null }) });
const usersSuccess = (state, action) => updateObject(state, { users: updateObject(state.users, { loading: false, error: null, ...action }) });
const usersFail = (state, action) => updateObject(state, { users: updateObject(state.users, { loading: false, ...action }) });



const claimsReset = (state, action) => updateObject(state, { claims: initialState.claims });
const claimsStart = (state, action) => updateObject(state, { claims: updateObject(state.claims, { loading: true, message: null }) });
const claimsSuccess = (state, action) => updateObject(state, { claims: updateObject(state.claims, { loading: false, error: null, ...action }) });
const claimsFail = (state, action) => updateObject(state, { claims: updateObject(state.claims, { loading: false, ...action }) });

const debtsReset = (state, action) => updateObject(state, { debts: initialState.debts });
const debtsStart = (state, action) => updateObject(state, { debts: updateObject(state.debts, { loading: true, message: null }) });
const debtsSuccess = (state, action) => updateObject(state, { debts: updateObject(state.debts, { loading: false, error: null, ...action }) });
const debtsFail = (state, action) => updateObject(state, { debts: updateObject(state.debts, { loading: false, ...action }) });

const entriesReset = (state, action) => updateObject(state, { entries: initialState.entries });
const entriesStart = (state, action) => updateObject(state, { entries: updateObject(state.entries, { loading: true, message: null }) });
const entriesSuccess = (state, action) => updateObject(state, { entries: updateObject(state.entries, { loading: false, error: null, ...action }) });
const entriesFail = (state, action) => updateObject(state, { entries: updateObject(state.entries, { loading: false, ...action }) });

const expensesReset = (state, action) => updateObject(state, { expenses: initialState.expenses });
const expensesStart = (state, action) => updateObject(state, { expenses: updateObject(state.expenses, { loading: true, message: null }) });
const expensesSuccess = (state, action) => updateObject(state, { expenses: updateObject(state.expenses, { loading: false, error: null, ...action }) });
const expensesFail = (state, action) => updateObject(state, { expenses: updateObject(state.expenses, { loading: false, ...action }) });

const investmentsReset = (state, action) => updateObject(state, { investments: initialState.investments });
const investmentsStart = (state, action) => updateObject(state, { investments: updateObject(state.investments, { loading: true, message: null }) });
const investmentsSuccess = (state, action) => updateObject(state, { investments: updateObject(state.investments, { loading: false, error: null, ...action }) });
const investmentsFail = (state, action) => updateObject(state, { investments: updateObject(state.investments, { loading: false, ...action }) });

const supportsReset = (state, action) => updateObject(state, { supports: initialState.supports });
const supportsStart = (state, action) => updateObject(state, { supports: updateObject(state.supports, { loading: true, message: null }) });
const supportsSuccess = (state, action) => updateObject(state, { supports: updateObject(state.supports, { loading: false, error: null, ...action }) });
const supportsFail = (state, action) => updateObject(state, { supports: updateObject(state.supports, { loading: false, ...action }) });

const currenciesReset = (state, action) => updateObject(state, { currencies: initialState.currencies });
const currenciesStart = (state, action) => updateObject(state, { currencies: updateObject(state.currencies, { loading: true, message: null }) });
const currenciesSuccess = (state, action) => updateObject(state, { currencies: updateObject(state.currencies, { loading: false, error: null, ...action }) });
const currenciesFail = (state, action) => updateObject(state, { currencies: updateObject(state.currencies, { loading: false, ...action }) });

const reportReset = (state, action) => updateObject(state, { report: initialState.report });
const reportStart = (state, action) => updateObject(state, { report: updateObject(state.report, { loading: true, message: null }) });
const reportSuccess = (state, action) => updateObject(state, { report: updateObject(state.report, { loading: false, error: null, ...action }) });
const reportFail = (state, action) => updateObject(state, { report: updateObject(state.report, { loading: false, ...action }) });

export default (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADMINS_RESET: return adminsReset(state, action);
        case actionTypes.ADMINS_START: return adminsStart(state, action);
        case actionTypes.ADMINS_SUCCESS: return adminsSuccess(state, action);
        case actionTypes.ADMINS_FAIL: return adminsFail(state, action);

        case actionTypes.CMS_RESET: return cmsReset(state, action);
        case actionTypes.CMS_START: return cmsStart(state, action);
        case actionTypes.CMS_SUCCESS: return cmsSuccess(state, action);
        case actionTypes.CMS_FAIL: return cmsFail(state, action);

        case actionTypes.DASHBOARD_RESET: return dashboardReset(state, action);
        case actionTypes.DASHBOARD_START: return dashboardStart(state, action);
        case actionTypes.DASHBOARD_SUCCESS: return dashboardSuccess(state, action);
        case actionTypes.DASHBOARD_FAIL: return dashboardFail(state, action);

        case actionTypes.FEATURES_RESET: return featuresReset(state, action);
        case actionTypes.FEATURES_START: return featuresStart(state, action);
        case actionTypes.FEATURES_SUCCESS: return featuresSuccess(state, action);
        case actionTypes.FEATURES_FAIL: return featuresFail(state, action);

        case actionTypes.LANGUAGES_RESET: return languagesReset(state, action);
        case actionTypes.LANGUAGES_START: return languagesStart(state, action);
        case actionTypes.LANGUAGES_SUCCESS: return languagesSuccess(state, action);
        case actionTypes.LANGUAGES_FAIL: return languagesFail(state, action);

        case actionTypes.ROLES_RESET: return rolesReset(state, action);
        case actionTypes.ROLES_START: return rolesStart(state, action);
        case actionTypes.ROLES_SUCCESS: return rolesSuccess(state, action);
        case actionTypes.ROLES_FAIL: return rolesFail(state, action);

        case actionTypes.USERS_RESET: return usersReset(state, action);
        case actionTypes.USERS_START: return usersStart(state, action);
        case actionTypes.USERS_SUCCESS: return usersSuccess(state, action);
        case actionTypes.USERS_FAIL: return usersFail(state, action);

        

        case actionTypes.CLAIMS_RESET: return claimsReset(state, action);
        case actionTypes.CLAIMS_START: return claimsStart(state, action);
        case actionTypes.CLAIMS_SUCCESS: return claimsSuccess(state, action);
        case actionTypes.CLAIMS_FAIL: return claimsFail(state, action);

        case actionTypes.DEBTS_RESET: return debtsReset(state, action);
        case actionTypes.DEBTS_START: return debtsStart(state, action);
        case actionTypes.DEBTS_SUCCESS: return debtsSuccess(state, action);
        case actionTypes.DEBTS_FAIL: return debtsFail(state, action);

        case actionTypes.ENTRIES_RESET: return entriesReset(state, action);
        case actionTypes.ENTRIES_START: return entriesStart(state, action);
        case actionTypes.ENTRIES_SUCCESS: return entriesSuccess(state, action);
        case actionTypes.ENTRIES_FAIL: return entriesFail(state, action);

        case actionTypes.EXPENSES_RESET: return expensesReset(state, action);
        case actionTypes.EXPENSES_START: return expensesStart(state, action);
        case actionTypes.EXPENSES_SUCCESS: return expensesSuccess(state, action);
        case actionTypes.EXPENSES_FAIL: return expensesFail(state, action);

        case actionTypes.INVESTMENTS_RESET: return investmentsReset(state, action);
        case actionTypes.INVESTMENTS_START: return investmentsStart(state, action);
        case actionTypes.INVESTMENTS_SUCCESS: return investmentsSuccess(state, action);
        case actionTypes.INVESTMENTS_FAIL: return investmentsFail(state, action);

        case actionTypes.SUPPORTS_RESET: return supportsReset(state, action);
        case actionTypes.SUPPORTS_START: return supportsStart(state, action);
        case actionTypes.SUPPORTS_SUCCESS: return supportsSuccess(state, action);
        case actionTypes.SUPPORTS_FAIL: return supportsFail(state, action);

        case actionTypes.CURRENCIES_RESET: return currenciesReset(state, action);
        case actionTypes.CURRENCIES_START: return currenciesStart(state, action);
        case actionTypes.CURRENCIES_SUCCESS: return currenciesSuccess(state, action);
        case actionTypes.CURRENCIES_FAIL: return currenciesFail(state, action);

        case actionTypes.REPORT_RESET: return reportReset(state, action);
        case actionTypes.REPORT_START: return reportStart(state, action);
        case actionTypes.REPORT_SUCCESS: return reportSuccess(state, action);
        case actionTypes.REPORT_FAIL: return reportFail(state, action);

        default: return state;
    }
};
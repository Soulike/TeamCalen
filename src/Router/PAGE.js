import {View as Index} from '../Pages/Index';
import {View as RootContainer} from '../ComponentContainer/RootContainer';
import Login from '../Pages/Account/Login';

const PAGE_ID = {
    INDEX: Symbol('index'),

    ACCOUNT: {
        INDEX: Symbol('account'),
        LOGIN: Symbol('login'),
        SIGN_UP: Symbol('signUp'),
        RETRIEVE_PASSWORD: Symbol('retrievePassword'),
    },

    CONTROL_PANEL: {
        INDEX: Symbol('controlPanel'),
        NEW_SCHEDULE: Symbol('newSchedule'),
        NEW_PROJECT: Symbol('newProject'),
        MY_PROJECT: Symbol('myProject'),
        PROJECT_DETAIL: Symbol('projectDetail'),
        FRIEND_LIST: Symbol('friendList'),
        ACCOUNT_MANAGEMENT: Symbol('accountManagement'),
    },
};

// 让所有的 INDEX 键值不可枚举
Object.defineProperty(PAGE_ID, 'INDEX', {
    enumerable: false,
});

Object.keys(PAGE_ID).forEach(key =>
{
    if (PAGE_ID[key].INDEX !== undefined)
    {
        Object.defineProperty(PAGE_ID[key], 'INDEX', {
            enumerable: false,
        });
    }
    Object.freeze(PAGE_ID[key]);
});

Object.freeze(PAGE_ID);

const PREFIX = {
    ACCOUNT: '/account',
    CONTROL_PANEL: '/controlPanel',
};

const PAGE_ID_TO_ROUTE = {
    [PAGE_ID.INDEX]: '/',

    [PAGE_ID.ACCOUNT.INDEX]: `${PREFIX.ACCOUNT}`,
    [PAGE_ID.ACCOUNT.LOGIN]: `${PREFIX.ACCOUNT}/login`,
    [PAGE_ID.ACCOUNT.SIGN_UP]: `${PREFIX.ACCOUNT}/signUp`,
    [PAGE_ID.ACCOUNT.RETRIEVE_PASSWORD]: `${PREFIX.ACCOUNT}/retrievePassword`,

    [PAGE_ID.CONTROL_PANEL.INDEX]: `${PREFIX.CONTROL_PANEL}`,
    [PAGE_ID.CONTROL_PANEL.NEW_SCHEDULE]: `${PREFIX.CONTROL_PANEL}/newSchedule`,
    [PAGE_ID.CONTROL_PANEL.NEW_PROJECT]: `${PREFIX.CONTROL_PANEL}/newProject`,
    [PAGE_ID.CONTROL_PANEL.MY_PROJECT]: `${PREFIX.CONTROL_PANEL}/myProject`,
    [PAGE_ID.CONTROL_PANEL.PROJECT_DETAIL]: `${PREFIX.CONTROL_PANEL}/projectDetail`,
    [PAGE_ID.CONTROL_PANEL.FRIEND_LIST]: `${PREFIX.CONTROL_PANEL}/friendList`,
    [PAGE_ID.CONTROL_PANEL.ACCOUNT_MANAGEMENT]: `${PREFIX.CONTROL_PANEL}/accountManagement`,
};

Object.freeze(PAGE_ID_TO_ROUTE);

const PAGE_ID_TO_COMPONENT = {
    [PAGE_ID.INDEX]: Index,

    [PAGE_ID.ACCOUNT.INDEX]: RootContainer,
    [PAGE_ID.ACCOUNT.LOGIN]: Login,
    [PAGE_ID.ACCOUNT.SIGN_UP]: null,
    [PAGE_ID.ACCOUNT.RETRIEVE_PASSWORD]: null,

    [PAGE_ID.CONTROL_PANEL.INDEX]: RootContainer,
    [PAGE_ID.CONTROL_PANEL.NEW_SCHEDULE]: null,
    [PAGE_ID.CONTROL_PANEL.NEW_PROJECT]: null,
    [PAGE_ID.CONTROL_PANEL.MY_PROJECT]: null,
    [PAGE_ID.CONTROL_PANEL.PROJECT_DETAIL]: null,
    [PAGE_ID.CONTROL_PANEL.FRIEND_LIST]: null,
    [PAGE_ID.CONTROL_PANEL.ACCOUNT_MANAGEMENT]: null,
};

Object.freeze(PAGE_ID_TO_COMPONENT);

export {
    PAGE_ID,
    PAGE_ID_TO_ROUTE,
    PAGE_ID_TO_COMPONENT,
};